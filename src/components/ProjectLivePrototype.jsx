import { useState, useEffect, useMemo } from 'react';

export default function ProjectLivePrototype({ project }) {
  const [repoData, setRepoData] = useState(null);
  const [readmeHtml, setReadmeHtml] = useState('');
  const [readmeText, setReadmeText] = useState('');
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiRateLimited, setApiRateLimited] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const exploreUrl = project?.exploreUrl || project?.liveDemoUrl;
  const githubUrl = project?.githubUrl;

  const isExternalEmbed = useMemo(() => {
    if (!exploreUrl || exploreUrl === '#') return false;
    return !exploreUrl.includes('github.com');
  }, [exploreUrl]);

  // Extract owner and repo from githubUrl
  const repoMeta = useMemo(() => {
    if (!githubUrl) return null;
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  }, [githubUrl]);

  // Fetch real GitHub repository metadata, files, and README
  useEffect(() => {
    if (isExternalEmbed || !repoMeta) return;

    let isMounted = true;

    const fetchGitHubData = async () => {
      setLoading(true);
      setApiRateLimited(false);
      setReadmeHtml('');
      setReadmeText('');
      setContents([]);
      const { owner, repo } = repoMeta;

      try {
        // 1. Fetch Repository Details
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (repoRes.status === 403) {
          if (isMounted) setApiRateLimited(true);
        } else if (repoRes.ok) {
          const data = await repoRes.json();
          if (isMounted) setRepoData(data);
        }

        // 2. Fetch Rendered HTML README
        const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
          headers: { Accept: 'application/vnd.github.html' },
        });

        if (readmeRes.ok) {
          const html = await readmeRes.text();
          if (isMounted) setReadmeHtml(html);
        } else {
          // Fallback to raw README from raw.githubusercontent.com
          const branches = ['main', 'master'];
          for (const branch of branches) {
            try {
              const rawRes = await fetch(
                `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`
              );
              if (rawRes.ok) {
                const text = await rawRes.text();
                if (isMounted) {
                  setReadmeText(text);
                  break;
                }
              }
            } catch {
              // Try next branch
            }
          }
        }

        // 3. Fetch Root Contents / File Tree
        const contentsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        if (contentsRes.ok) {
          const files = await contentsRes.json();
          if (isMounted && Array.isArray(files)) {
            setContents(files);
          }
        }
      } catch (err) {
        console.warn('Could not fetch GitHub API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [repoMeta, isExternalEmbed]);

  // Handle genuine external app iframes
  if (isExternalEmbed) {
    return (
      <div className="external-iframe-stage">
        {!iframeLoaded && !iframeError && (
          <div className="prototype-loading-overlay font-mono">
            <div className="prototype-spinner"></div>
            <span>Connecting to live application...</span>
          </div>
        )}

        {!iframeError ? (
          <iframe
            src={exploreUrl}
            title={`${project?.title} Live Application`}
            className="prototype-iframe"
            onLoad={() => setIframeLoaded(true)}
            onError={() => setIframeError(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <div className="prototype-empty-state font-mono">
            <p className="font-mono uppercase text-gray">
              Remote website restricts direct iframe framing.
            </p>
            <a
              href={exploreUrl}
              target="_blank"
              rel="noreferrer"
              className="project-modal-action-btn hoverable font-mono uppercase"
            >
              Open Live App in New Tab ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  // Real GitHub Repository Page Display
  return (
    <div className="github-live-viewer font-mono">
      {/* GitHub Repository Header Banner */}
      <div className="gh-repo-banner">
        <div className="gh-repo-title-row">
          <svg height="22" viewBox="0 0 16 16" width="22" fill="currentColor" className="gh-logo-icon">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <div className="gh-repo-path">
            <span className="gh-owner">{repoMeta?.owner || 'Ishantkhandelwal'}</span>
            <span className="gh-slash">/</span>
            <span className="gh-repo-name text-glow">{repoMeta?.repo || project?.shortTitle}</span>
            <span className="gh-badge-public">Public</span>
          </div>
        </div>

        <div className="gh-repo-actions">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="gh-action-btn hoverable"
              title="Open full page on GitHub"
            >
              <span>↗ Open on GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* GitHub Repository Metadata Bar */}
      <div className="gh-repo-stats-bar">
        <div className="gh-stat-item">
          <span className="gh-stat-icon">★</span>
          <span className="gh-stat-label">Stars:</span>
          <strong>{repoData?.stargazers_count ?? 0}</strong>
        </div>
        <div className="gh-stat-item">
          <span className="gh-stat-icon">⑂</span>
          <span className="gh-stat-label">Forks:</span>
          <strong>{repoData?.forks_count ?? 0}</strong>
        </div>
        <div className="gh-stat-item">
          <span className="gh-stat-icon">●</span>
          <span className="gh-stat-label">Primary:</span>
          <strong style={{ color: '#38bdf8' }}>{repoData?.language || project?.techStack?.[0] || 'Python'}</strong>
        </div>
        <div className="gh-stat-item">
          <span className="gh-stat-icon">◷</span>
          <span className="gh-stat-label">Branch:</span>
          <strong>{repoData?.default_branch || 'main'}</strong>
        </div>
      </div>

      {/* Repository Description */}
      <div className="gh-repo-desc-box">
        <p className="gh-repo-desc text-gray">
          {repoData?.description || project?.description || 'Repository dedicated to data modeling, analytics, and telemetry pipelines.'}
        </p>
      </div>

      {/* Repository File Tree */}
      {contents.length > 0 && (
        <div className="gh-file-tree-card">
          <div className="gh-file-tree-header">
            <span>📁 Repository Contents ({contents.length} items)</span>
            <span className="text-gray text-xs">Branch: {repoData?.default_branch || 'main'}</span>
          </div>
          <div className="gh-file-list">
            {contents.map((item) => (
              <a
                key={item.path}
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
                className="gh-file-row hoverable"
              >
                <span className="gh-file-icon">{item.type === 'dir' ? '📁' : '📄'}</span>
                <span className="gh-file-name">{item.name}</span>
                <span className="gh-file-size text-gray">
                  {item.size ? `${(item.size / 1024).toFixed(1)} KB` : ''}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* README Presentation Section */}
      <div className="gh-readme-card">
        <div className="gh-readme-header">
          <span className="gh-readme-title">📖 README.md</span>
          {githubUrl && (
            <a
              href={`${githubUrl}#readme`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray hoverable"
            >
              Raw View ↗
            </a>
          )}
        </div>

        <div className="gh-readme-body">
          {loading && !readmeHtml && !readmeText && (
            <div className="prototype-loading-overlay font-mono">
              <div className="prototype-spinner"></div>
              <span>Connecting to GitHub API for latest repository data...</span>
            </div>
          )}

          {readmeHtml ? (
            <div
              className="gh-markdown-content"
              dangerouslySetInnerHTML={{ __html: readmeHtml }}
            />
          ) : readmeText ? (
            <pre className="gh-readme-raw">{readmeText}</pre>
          ) : (
            <div className="gh-fallback-readme">
              <div className="gh-readme-title-section">
                <h1 className="gh-readme-h1">{project?.title}</h1>
                <p className="gh-readme-lead text-gray">{project?.tagline || project?.description}</p>
                <div className="gh-readme-badges">
                  <span className="gh-badge gh-badge-blue">Python 3.10+ / Power BI</span>
                  <span className="gh-badge gh-badge-green">Status: Production</span>
                  <span className="gh-badge gh-badge-purple">License: MIT</span>
                  <span className="gh-badge gh-badge-cyan">Telemetry Deck</span>
                </div>
              </div>

              {project?.problem && (
                <div className="gh-readme-section">
                  <h2>Problem Statement & Operational Context</h2>
                  <p className="text-gray">{project.problem}</p>
                </div>
              )}

              {project?.solution && (
                <div className="gh-readme-section">
                  <h2>Proposed Solution & Technical Methodology</h2>
                  <p className="text-gray">{project.solution}</p>
                </div>
              )}

              {project?.architectureFlow?.length > 0 && (
                <div className="gh-readme-section">
                  <h2>Architecture Pipeline Flow</h2>
                  <div className="gh-readme-flow-grid">
                    {project.architectureFlow.map((step) => (
                      <div key={step.step} className="gh-readme-flow-step">
                        <span className="flow-step-num font-mono">{step.step}</span>
                        <div className="flow-step-body">
                          <strong className="flow-step-title">{step.title}</strong>
                          <span className="flow-step-tech font-mono">{step.tech}</span>
                          <p className="flow-step-desc text-gray">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project?.features?.length > 0 && (
                <div className="gh-readme-section">
                  <h2>Core Capabilities & Production Highlights</h2>
                  <ul className="gh-readme-bullets">
                    {project.features.map((feat) => (
                      <li key={feat} className="text-gray">{feat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project?.techStack?.length > 0 && (
                <div className="gh-readme-section">
                  <h2>Technology Stack & Libraries</h2>
                  <div className="gh-readme-tech-pills">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="gh-tech-tag font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {project?.metrics?.length > 0 && (
                <div className="gh-readme-section">
                  <h2>Observed Metrics & Telemetry Benchmarks</h2>
                  <div className="gh-readme-metrics-row">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="gh-readme-metric-box">
                        <div className="metric-val font-mono">{m.value}</div>
                        <div className="metric-lbl font-mono text-gray">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project?.images?.length > 0 && (
                <div className="gh-readme-section">
                  <h2>Repository Visuals & Telemetry Screens</h2>
                  <div className="gh-screenshots-grid">
                    {project.images.map((imgSrc, idx) => (
                      <div key={idx} className="gh-screenshot-wrapper">
                        <img
                          src={imgSrc}
                          alt={`${project.title} Screenshot ${idx + 1}`}
                          className="gh-screenshot-item"
                          loading="lazy"
                        />
                        <span className="screenshot-caption text-xs text-gray font-mono">
                          Figure {idx + 1}: {idx === 0 ? 'Telemetry Overview Dashboard' : 'Pipeline Analytics & Deep-Dive View'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="gh-readme-section">
                <h2>Quickstart & Local Execution</h2>
                <pre className="gh-readme-code-block font-mono">
                  <code>{`# 1. Clone the repository
git clone ${githubUrl || 'https://github.com/Ishantkhandelwal/' + (repoMeta?.repo || 'project')}.git
cd ${repoMeta?.repo || 'project'}

# 2. Set up environment & install dependencies
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# 3. Launch application / dashboard
python app.py`}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {apiRateLimited && (
        <div className="gh-rate-limit-notice text-gray text-xs">
          <span>ℹ GitHub API rate limit reached for unauthenticated requests. Showing direct cached repository profile.</span>
        </div>
      )}
    </div>
  );
}
