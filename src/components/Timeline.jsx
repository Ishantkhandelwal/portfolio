import { useState, useEffect, useCallback, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  WebArchitectureCanvas,
  ChatUpSocketStreamCanvas,
  RoastingAITokenStreamCanvas,
  EdgeResumeATSParserCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';

export default function Timeline() {
  const { playHoverSound, playClickSound } = useAudio();
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const epochs = [
    {
      epoch: '01',
      date: 'AUG 2024 – PRESENT',
      stageLabel: 'STAGE 01',
      category: 'ACADEMIC FOUNDATION',
      dockLabel: 'B.TECH CSE',
      title: 'Computer Science & Engineering Foundations',
      headline: 'Lovely Professional University (Phagwara)',
      summary:
        'Pursuing B.Tech Computer Science and Engineering at Lovely Professional University. Building deep competencies in Object-Oriented Programming (Java, C++), Data Structures, Relational Database Management Systems (DBMS), and statistical computation.',
      metrics: [
        { label: 'Institution', value: 'LPU, Phagwara' },
        { label: 'Degree', value: 'B.Tech CSE' },
        { label: 'Core Focus', value: 'OOP, DBMS & Data' }
      ],
      techStack: ['Python', 'Java (OOP)', 'C++', 'SQL', 'DBMS', 'Data Structures'],
      Visualizer: WebArchitectureCanvas
    },
    {
      epoch: '02',
      date: '2026 • MAY',
      stageLabel: 'STAGE 02',
      category: 'PREDICTIVE EDA',
      dockLabel: 'CRIME FORECAST',
      title: 'Crime Against Women in India: Analysis & Prediction',
      headline: 'District-Level Predictive Regression Model',
      summary:
        'Engineered a predictive regression model in Python and Scikit-learn analyzing district-level crime trends across Indian states. Executed rigorous multi-factor data cleaning with Pandas and NumPy, outlier removal, missing value imputation, and correlation heatmap synthesis.',
      metrics: [
        { label: 'Factors', value: '7 Core Predictors' },
        { label: 'R² Correlation', value: '0.864' },
        { label: 'Coverage', value: 'All States & UTs' }
      ],
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      Visualizer: ChatUpSocketStreamCanvas
    },
    {
      epoch: '03',
      date: '2026 • JUNE',
      stageLabel: 'STAGE 03',
      category: 'PREDICTIVE ML & XAI',
      dockLabel: 'DROPOUT AI',
      title: 'AI Dropout Risk Intelligence System',
      headline: 'Real-Time Dropout Risk Classification & XAI',
      summary:
        'Engineered an end-to-end machine learning predictive system using Python, Scikit-learn, and Streamlit to classify student dropout risks with real-time probability scoring. Integrated Explainable AI (XAI) feature importance and dynamic SVG risk gauges diagnosing attendance, marks, and assignments.',
      metrics: [
        { label: 'Precision', value: '88.5% Accuracy' },
        { label: 'Interface', value: 'Interactive Streamlit' },
        { label: 'Explainability', value: 'XAI Risk Drivers' }
      ],
      techStack: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'XAI', 'NumPy'],
      Visualizer: RoastingAITokenStreamCanvas
    },
    {
      epoch: '04',
      date: '2026 • JULY',
      stageLabel: 'STAGE 04',
      category: 'BI & TELEMETRY',
      dockLabel: 'FRAUD BI',
      title: 'Digital Payment Fraud Detection Dashboard',
      headline: 'Power BI, DAX & Power Query ETL Pipelines',
      summary:
        'Designed an interactive Power BI telemetry dashboard analyzing 7,500+ digital transactions across Indian cities to detect suspicious fraud patterns. Built automated ETL workflows in Power Query, custom DAX measures, IP risk scoring, and real-time KPI alerts across UPI, Cards, and NetBanking.',
      metrics: [
        { label: 'Dataset', value: '7,500+ Transactions' },
        { label: 'Dataflow', value: 'Automated Power Query' },
        { label: 'Telemetry', value: 'UPI / Cards / NetB' }
      ],
      techStack: ['Power BI', 'DAX Measures', 'Power Query (M)', 'Data Modeling', 'Excel'],
      Visualizer: EdgeResumeATSParserCanvas
    }
  ];

  // Auto-running loop across 4 stages (pauses on hover so user can read)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, epochs.length]);

  // Move button controls (loops infinitely in both directions)
  const handleNext = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
  }, [epochs.length, playClickSound]);

  const handlePrev = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev - 1 + epochs.length) % epochs.length);
  }, [epochs.length, playClickSound]);

  const goToEpoch = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= epochs.length) return;
    playClickSound();
    setActiveEpochIndex(targetIndex);
  }, [epochs.length, playClickSound]);

  // Keyboard Arrow navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) + 15 && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section className="container timeline-section" id="experience">
      {/* Aligned Section Header matching #about, #work, #skills */}
      <div className="timeline-header">
        <div className="gsap-reveal">
          <MaskedTitle text="Engineering Journey" />
          <div className="divider" />
        </div>
        <div className="timeline-header-meta font-mono">
          <div className="timeline-meta-pill">
            <span className={`meta-pulse-dot ${isPaused ? 'is-paused' : ''}`} />
            <span className="meta-pill-text">
              STAGE 0{activeEpochIndex + 1}/04 • {isPaused ? 'INTERACTIVE' : 'AUTO-RUNNING'}
            </span>
          </div>
          <div className="timeline-jump-strip">
            {epochs.map((ep, i) => (
              <button
                key={ep.epoch}
                type="button"
                onClick={() => goToEpoch(i)}
                onMouseEnter={playHoverSound}
                className={`timeline-jump-pill hoverable ${activeEpochIndex === i ? 'is-active' : ''}`}
                aria-label={`Jump to stage 0${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Stage Slider with Side Navigation Arrows & Auto-running Loop */}
      <div
        className="timeline-stage-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-prev hoverable font-mono"
          onClick={handlePrev}
          onMouseEnter={playHoverSound}
          aria-label="Previous phase"
          title="Previous stage"
        >
          ‹
        </button>

        <div className="timeline-carousel-shell">
          <div
            className="timeline-cards-track"
            style={{ transform: `translateX(-${activeEpochIndex * 100}%)` }}
          >
            {epochs.map((item, idx) => {
              const Visualizer = item.Visualizer;
              const isActive = activeEpochIndex === idx;

              return (
                <div
                  key={item.epoch}
                  className={`timeline-card-slide ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    if (!isActive) playHoverSound();
                  }}
                >
                  {/* Stage Container Card */}
                  <div className="timeline-stage-card hoverable">
                    {/* Left Pane: Narrative & Technical Telemetry */}
                    <div className="timeline-narrative-pane">
                      <div className="stage-topbar font-mono">
                        <div className="stage-topbar-left">
                          <span className="stage-badge uppercase">{item.category}</span>
                          <span className="stage-date uppercase">{item.date}</span>
                        </div>
                        <span className="stage-step-tag text-gray">{item.stageLabel}</span>
                      </div>

                      <div className="stage-title-wrap">
                        <h3 className="stage-title uppercase text-glow">{item.title}</h3>
                        <div className="stage-headline font-mono text-gray uppercase">{item.headline}</div>
                      </div>

                      <p className="stage-summary text-gray">{item.summary}</p>

                      {/* Telemetry Metrics Grid */}
                      <div className="stage-metrics-grid font-mono">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="stage-metric-box">
                            <span className="metric-lbl text-gray">{m.label}</span>
                            <span className="metric-val">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills matching .skill-pill */}
                      <div className="stage-tech-pills font-mono">
                        {item.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="stage-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Pane: 2D Live Visualizer Canvas */}
                    <div className="timeline-simulation-pane">
                      <div className="terminal-canvas-wrapper">
                        <Visualizer isActive={isActive} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-next hoverable font-mono"
          onClick={handleNext}
          onMouseEnter={playHoverSound}
          aria-label="Next phase"
          title="Next stage"
        >
          ›
        </button>
      </div>
    </section>
  );
}
