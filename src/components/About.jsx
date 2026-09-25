import ishantPhoto from '../assets/Myself.webp';
import EngineeringTelemetry from './EngineeringTelemetry';
import Timeline from './Timeline';
import MaskedTitle from './MaskedTitle';

export default function About() {
  return (
    <div className="about-page-wrapper">
      {/* 1. Core Background & Engineering Philosophy */}
      <section id="about" className="container about-intro-section">
        <div className="about-grid">
          <div className="gsap-reveal">
            <MaskedTitle number="1." text="About Me" />
            <div className="divider" />
            <p className="text-gray about-text">
              I’m Ishant Khandelwal, a Computer Science &amp; Engineering student at Lovely Professional University specializing in Data Analytics, Machine Learning, and Business Intelligence. I transform complex relational and unstructured datasets into high-impact visual intelligence and predictive systems. From engineering end-to-end ML classification pipelines with Scikit-learn and Explainable AI (XAI) to building dynamic Power BI &amp; Tableau dashboards with automated Power Query ETL workflows, I focus on turning raw data into strategic, actionable outcomes.
            </p>
            <div className="font-mono text-gray skill-list text-sm">
              <p><span style={{ color: '#fff' }}></span> Predictive Machine Learning &amp; Scikit-learn Pipelines</p>
              <p><span style={{ color: '#fff' }}></span> Exploratory Data Analysis (EDA) &amp; Data Preprocessing</p>
              <p><span style={{ color: '#fff' }}></span> BI Dashboards &amp; Visual Telemetry (Power BI, Tableau, Streamlit)</p>
              <p><span style={{ color: '#fff' }}></span> Relational Database Modeling &amp; Complex SQL Optimization</p>
            </div>
          </div>

          <div className="abstract-box hoverable gsap-reveal">
            <div className="about-photo-wrapper">
              <img
                src={ishantPhoto}
                alt="Ishant Khandelwal - Data Analyst & ML Engineer"
                className="about-photo-img"
                loading="lazy"
                decoding="async"
                width="420"
                height="480"
              />
            </div>
          </div>
        </div>

        {/* Real-Time Engineering Telemetry & Verified Command Channels */}
        <EngineeringTelemetry />
      </section>

      {/* 2. Interactive Evolution Roadmap (Auto-looping + Move Buttons) */}
      <Timeline />
    </div>
  );
}


