import { useAudio } from '../hooks/useAudio';
import ishantAvatar from '../assets/avatar.webp';

export default function EngineeringTelemetry() {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <div className="telemetry-command-deck gsap-reveal font-mono">
      {/* Top Header Bar - Clean and Professional */}
      <div className="telemetry-header">
        <div className="telemetry-header-left">
          <span className="telemetry-live-dot" />
          <span className="telemetry-hud-tag">Current Activity &amp; Profiles</span>
        </div>
        <span className="telemetry-hud-status">Active in 2026 • Open for Opportunities</span>
      </div>

      {/* 3-Column Profile & Activity Grid */}
      <div className="telemetry-grid">
        {/* Card 1: What I'm Working On */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">CURRENT FOCUS</span>
            <span className="card-indicator">Active</span>
          </div>
          <h3 className="telemetry-card-title">Data Analytics &amp; Predictive ML</h3>
          <p className="telemetry-card-text text-gray">
            Developing end-to-end predictive ML pipelines, Explainable AI (XAI) risk engines, and dynamic Power BI / Streamlit telemetry dashboards.
          </p>
          <div className="telemetry-meta-row text-gray">
            <span>CORE STACK:</span>
            <span className="meta-highlight">Python, Power BI, Scikit-learn, SQL, Pandas, Streamlit</span>
          </div>
        </div>

        {/* Card 2: GitHub Projects */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">GITHUB CODE</span>
            <span className="card-indicator">Verified Projects</span>
          </div>
          <h3 className="telemetry-card-title">Data &amp; ML Repositories</h3>
          <p className="telemetry-card-text text-gray">
            Explore end-to-end data analytics pipelines, multi-factor district crime rate forecasting, student dropout risk engines, and Power Query ETL workflows.
          </p>
          <div className="telemetry-actions-list">
            <a
              href="https://github.com/Ishantkhandelwal"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>View GitHub Repositories</span>
              <span className="telemetry-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Card 3: LinkedIn Profile & Quick Contact */}
        <div className="telemetry-card telemetry-card-comms hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">PROFESSIONAL PROFILE</span>
            <span className="card-indicator">Open to Roles</span>
          </div>

          {/* Clean LinkedIn Identity Preview */}
          <div className="linkedin-profile-preview">
            <img
              src={ishantAvatar}
              alt="Ishant Khandelwal"
              className="linkedin-preview-avatar"
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
            />
            <div className="linkedin-preview-info">
              <div className="linkedin-preview-name">
                <span>Ishant Khandelwal</span>
                <span className="linkedin-check" title="Verified Profile">✓</span>
              </div>
              <div className="linkedin-preview-role text-gray">
                Data Analyst • B.Tech CSE (LPU)
              </div>
            </div>
          </div>

          <p className="telemetry-card-text text-gray" style={{ marginBottom: '1rem' }}>
            Open for Data Analyst, Machine Learning Engineer, Business Intelligence, and Data Science opportunities.
          </p>

          <div className="telemetry-actions-list">
            <a
              href="https://www.linkedin.com/in/ishantkhandelwal"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>Connect on LinkedIn</span>
              <span className="telemetry-arrow">↗</span>
            </a>

            <a
              href="https://wa.me/917850071684?text=Hi%20Ishant,%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn telemetry-btn-ping hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>Chat on WhatsApp</span>
              <span className="telemetry-arrow">💬</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
