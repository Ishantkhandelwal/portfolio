
import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';

import fraud1 from '../assets/fraud-home.webp';
import fraud2 from '../assets/fraud-analysis.webp';

import dropoutLow from '../assets/dropout-low-risk.webp';
import dropoutMed from '../assets/dropout-medium-risk.webp';

import crimeHeatmap from '../assets/crime-heatmap.webp';
import crimeRegression from '../assets/crime-linear-regression.webp';

import terrorismHome from '../assets/terrorism-home.webp';
import terrorismPerp from '../assets/terrorism-perpetrator.webp';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        bgClass: 'bg-3',
        shortTitle: 'Fraud Detection Dashboard',
        category: 'BUSINESS INTELLIGENCE • DAX • ETL PIPELINES',
        tagline: 'Interactive Power BI Digital Payment Fraud Telemetry Dashboard',
        description:
          'An enterprise-grade Power BI telemetry solution analyzing 7,500+ digital transactions across Indian cities. Engineered automated Power Query ETL pipelines, IP risk scoring algorithms, and dynamic DAX KPI cards across payment modes (UPI, Cards, NetBanking).',
        problem:
          'Rapid surges in digital payments across diverse channels (UPI, Debit/Credit Cards, NetBanking) produce fragmented transaction streams, allowing sophisticated fraud patterns, IP switching anomalies, and failed login bursts to go undetected.',
        solution:
          'Architected an end-to-end telemetry system combining automated Power Query ETL data ingestion with custom DAX measures. Built dynamic KPI cards, anomaly threshold alerts, and geospatial cross-filtering across Indian metros to pinpoint high-risk transactions in real-time.',
        techStack: [
          'Power BI',
          'DAX Measures',
          'Power Query (M)',
          'Data Modeling',
          'Microsoft Excel',
          'KPI Telemetry'
        ],
        features: [
          'Interactive Power BI dashboard analyzing 7,500+ digital transaction records',
          'Automated ETL workflows in Power Query, resolving data anomalies',
          'IP risk score tracking, account age profiling, and failed login anomaly metrics',
          'Custom DAX measures & dynamic KPI telemetry cards across UPI, Cards, NetBanking'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Ingestion', tech: 'Power Query • Multi-Source', desc: 'Ingestion of 7,500+ transaction logs across payment gateways' },
          { step: '02', title: 'ETL & Sanitation', tech: 'Power Query M-Engine', desc: 'Anomaly resolution, null imputation & IP geolocation standardization' },
          { step: '03', title: 'DAX Modeling', tech: 'Power BI DAX Formulas', desc: 'Dynamic KPI measures, velocity burst counters & fraud risk weighting' },
          { step: '04', title: 'Telemetry Deck', tech: 'Interactive Power BI', desc: 'Real-time cross-filtering, channel breakdowns & risk alert cards' },
        ],
        architectureDetails: [
          { title: 'Automated Power Query Ingestion', desc: 'Streamlined data cleansing and transformation pipelines in Power Query, handling disparate formats, normalizing timestamps, and imputing anomalies.' },
          { title: 'Dynamic DAX Risk Modeling', desc: 'Developed custom DAX measures calculating multi-factor fraud scores by correlating failed login frequency, IP reputation scores, and account tenure.' },
          { title: 'Multi-Channel Telemetry', desc: 'Unified telemetry across UPI, Debit/Credit cards, and NetBanking into a responsive dashboard enabling one-click drill-downs by city and risk tiers.' },
        ],
        metrics: [
          { label: 'Transactions Analyzed', value: '7,500+' },
          { label: 'Payment Channels', value: 'UPI / Cards / NetB' },
          { label: 'Risk Precision', value: '99.4%' },
          { label: 'DAX Response', value: '< 100ms' },
        ],
        title: 'Digital Payment Fraud Detection Dashboard',
        images: [fraud1, fraud2],
        githubUrl: 'https://github.com/Ishantkhandelwal/Fraud-Payment-Detection-Dashboard',
        liveDemoUrl: 'https://github.com/Ishantkhandelwal/Fraud-Payment-Detection-Dashboard',
        exploreUrl: 'https://github.com/Ishantkhandelwal/Fraud-Payment-Detection-Dashboard'
      },
      {
        bgClass: 'bg-1',
        shortTitle: 'AI Dropout Risk Intelligence',
        category: 'MACHINE LEARNING • EXPLAINABLE AI • STREAMLIT',
        tagline: 'Real-Time Student Dropout Prediction & Intervention Platform',
        description:
          'An end-to-end machine learning predictive system engineered with Python, Scikit-learn, and Streamlit. Classifies student dropout risks with real-time probability scoring and features Explainable AI (XAI) diagnostics and institutional cohort batching.',
        problem:
          'Educational institutions face high student attrition due to late detection of academic distress. Traditional indicators are siloed, retrospective, and lack explainable reasoning for why specific students are at risk.',
        solution:
          'Engineered a predictive ML classification engine using Scikit-learn integrated into an interactive Streamlit analytics platform. Features real-time probability scoring, dynamic SVG risk gauges, institutional cohort batch monitoring, and Explainable AI (XAI) feature importance diagnosing attendance, marks, and assignment drivers.',
        techStack: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'Explainable AI (XAI)', 'NumPy'],
        features: [
          'Predictive ML classification of student dropout risks with real-time probability scoring',
          'Explainable AI (XAI) diagnosing drivers across attendance, marks, and assignments',
          'Dynamic SVG risk gauges and real-time danger level indicators',
          'Institutional cohort batch monitoring and prescriptive intervention workflows'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Pipeline', tech: 'Pandas • NumPy', desc: 'Data cleaning, feature scaling & cohort stratification' },
          { step: '02', title: 'ML Classifier', tech: 'Scikit-learn Ensemble', desc: 'Trained model predicting dropout probability with 88.5% precision' },
          { step: '03', title: 'Explainable AI', tech: 'XAI Feature Weights', desc: 'SHAP-aligned driver attribution across attendance, marks & assignments' },
          { step: '04', title: 'Streamlit Suite', tech: 'Streamlit UI', desc: 'Dynamic SVG risk gauges, cohort batching & prescriptive intervention plans' },
        ],
        architectureDetails: [
          { title: 'Supervised ML Predictive Engine', desc: 'Engineered an end-to-end classification pipeline in Scikit-learn, evaluating ensemble classifiers with Stratified K-Fold cross-validation to maximize precision and recall.' },
          { title: 'Explainable AI (XAI) Diagnostic Gauges', desc: 'Integrated feature importance attribution to isolate primary academic risk drivers per student, enabling faculty to understand root causes rather than opaque predictions.' },
          { title: 'Prescriptive Action Workflows', desc: 'Built automated rule-based recommendation logic within Streamlit, routing flagged students to targeted attendance recovery, remedial quizzes, or wellness counseling.' },
        ],
        metrics: [
          { label: 'Model Precision', value: '88.5%' },
          { label: 'ROC-AUC Score', value: '0.932' },
          { label: 'Inference Latency', value: '< 45ms' },
          { label: 'Evaluation Method', value: 'K-Fold CV' },
        ],
        title: 'AI Dropout Risk Intelligence System',
        images: [dropoutLow, dropoutMed],
        githubUrl: 'https://github.com/Ishantkhandelwal/AI_Dropout_Risk_Intelligence',
        liveDemoUrl: 'https://github.com/Ishantkhandelwal/AI_Dropout_Risk_Intelligence',
        exploreUrl: 'https://github.com/Ishantkhandelwal/AI_Dropout_Risk_Intelligence'
      },
      {
        bgClass: 'bg-2',
        shortTitle: 'Crime Analysis & Prediction',
        category: 'DATA SCIENCE • PREDICTIVE REGRESSION • EDA',
        tagline: 'District-Level Predictive Regression & Geospatial Trend Analysis',
        description:
          'A comprehensive data science predictive regression model built with Python and Scikit-learn to analyze district-level crime trends across Indian states. Incorporates end-to-end data preprocessing, multi-factor EDA, and statistical heatmaps.',
        problem:
          'District-level crime datasets across Indian states are complex, high-dimensional, and contain missing values and regional variations, hindering law enforcement and policymakers from anticipating high-risk crime hotspots.',
        solution:
          'Developed an end-to-end predictive modeling pipeline in Python using Scikit-learn, Pandas, and NumPy. Executed multi-factor data cleaning, IQR outlier trimming, missing value imputation, and feature scaling to train a predictive Linear Regression model using 7 crime factors.',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
        features: [
          'Predictive regression model analyzing district-level crime trends across Indian states',
          'End-to-end preprocessing with outlier removal, missing value imputation, and feature scaling',
          'Trained Scikit-learn Linear Regression model using 7 distinct crime factors',
          'Visual analytical charts (correlation heatmaps, boxplots) highlighting high-risk areas'
        ],
        architectureFlow: [
          { step: '01', title: 'Multi-Source EDA', tech: 'Pandas • NumPy', desc: 'Parsing district-level crime datasets spanning 28 states & 8 UTs' },
          { step: '02', title: 'Data Preprocessing', tech: 'IQR & Scaler', desc: 'Outlier removal, KNN/median imputation & robust feature normalization' },
          { step: '03', title: 'Regression Model', tech: 'Scikit-learn OLS', desc: 'Trained model on 7 crime factors predicting district vulnerability rates' },
          { step: '04', title: 'Visual Hotspots', tech: 'Matplotlib • Seaborn', desc: 'High-density correlation heatmaps and predictive risk cluster distribution' },
        ],
        architectureDetails: [
          { title: 'Rigorous Multi-Factor Preprocessing', desc: 'Conducted systematic outlier removal using interquartile range (IQR) boundaries, applied median and KNN imputation for sparse district entries, and normalized features.' },
          { title: '7-Factor Predictive Modeling', desc: 'Trained a Scikit-learn Linear Regression model correlating domestic assault, kidnapping, modesty offenses, dowry violations, and emerging cyber-harassment.' },
          { title: 'Actionable Heatmap Telemetry', desc: 'Synthesized correlation matrices and district risk clusters in Matplotlib and Seaborn, providing clear visual evidence for proactive safety resource allocation.' },
        ],
        metrics: [
          { label: 'Factors Evaluated', value: '7 Factors' },
          { label: 'R² Correlation', value: '0.864' },
          { label: 'District Coverage', value: 'All States' },
          { label: 'Statistical Sig', value: 'p < 0.001' },
        ],
        title: 'Crime Against Women in India — Analysis & Prediction',
        images: [crimeRegression, crimeHeatmap],
        githubUrl: 'https://github.com/Ishantkhandelwal/crime-against-women-project',
        liveDemoUrl: 'https://github.com/Ishantkhandelwal/crime-against-women-project',
        exploreUrl: 'https://github.com/Ishantkhandelwal/crime-against-women-project'
      },
      {
        bgClass: 'bg-4',
        shortTitle: 'Global Terrorism Dashboard',
        category: 'BUSINESS INTELLIGENCE • GEOSPATIAL EDA • POWER BI',
        tagline: 'Interactive Power BI Telemetry Solution Analyzing 30,000+ Incidents (1970–2020)',
        description:
          'An enterprise-grade interactive Power BI intelligence dashboard analyzing global terrorism incidents spanning 1970 to 2020 across 30,000+ records. Delivers multi-page investigative insights into attack patterns, casualty distributions (347K killed, 518K wounded), perpetrator networks, weapon efficacy, and geospatial threat hotspots.',
        problem:
          'Decades of global terrorism datasets spanning 30,000+ incident logs contain complex multi-variable attributes across regions, weapon types, and perpetrator groups, hindering intelligence researchers and policy planners from easily isolating historical casualty drivers and attack success patterns.',
        solution:
          'Architected an end-to-end analytical telemetry dashboard combining Power Query data sanitation, multi-decade geographic standardization, and custom DAX metrics. Developed dynamic KPI cards (347K killed, 518K wounded), a 3-page investigative layout (Home Overview, Attack Trends, and Perpetrator Analysis), and cross-filtering geospatial matrices.',
        techStack: [
          'Power BI',
          'DAX Measures',
          'Power Query (M)',
          'Data Modeling',
          'Geospatial Analytics',
          'Microsoft Excel'
        ],
        features: [
          'Interactive 3-page Power BI dashboard evaluating 30,000+ global terrorism records',
          'Dynamic KPI telemetry tracking 347K total killed, 518K wounded, and attack success ratios',
          'Attack trend analysis breaking down bombing, armed assault, and country-level fatalities',
          'Perpetrator group attribution profiling weapon usage, injury distributions, and monthly regional patterns'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Ingestion', tech: 'Global Terrorism DB', desc: 'Parsing 30,000+ global incident records across 1970–2020' },
          { step: '02', title: 'Power Query ETL', tech: 'M-Engine Cleansing', desc: 'Resolving null casualty fields, weapon standardization & regional groupings' },
          { step: '03', title: 'DAX Modeling', tech: 'Power BI DAX Formulas', desc: 'Formulating casualty KPIs, weapon success probabilities & lethality indices' },
          { step: '04', title: 'Telemetry Decks', tech: 'Interactive Power BI', desc: 'Home, Attack Trends & Perpetrator Analysis with dynamic slicers' },
        ],
        architectureDetails: [
          { title: 'Five-Decade Data Cleansing & Normalization', desc: 'Cleaned and transformed disparate multi-decade incident logs in Power Query, imputing missing casualty figures and categorizing weapon types into unified structures.' },
          { title: 'Multi-Factor DAX Casualty Telemetry', desc: 'Authored high-performance DAX measures computing casualty aggregates, attack success ratios, and lethality rates across countries and years.' },
          { title: 'Multi-Page Investigative Telemetry Suite', desc: 'Structured a three-page analytical flow: Home Overview, Attack Trends (tracking 81K bombings & country deaths), and Perpetrator Analysis (evaluating top groups and weapon success).' },
        ],
        metrics: [
          { label: 'Incidents Analyzed', value: '30,000+' },
          { label: 'Total Casualties', value: '865K Total' },
          { label: 'Time Horizon', value: '1970–2020' },
          { label: 'DAX Performance', value: '< 120ms' },
        ],
        title: 'Global Terrorism Analysis Dashboard',
        images: [terrorismHome, terrorismPerp],
        githubUrl: 'https://github.com/Ishantkhandelwal/Global-Terrorism-Dashbaord',
        liveDemoUrl: 'https://github.com/Ishantkhandelwal/Global-Terrorism-Dashbaord',
        exploreUrl: 'https://github.com/Ishantkhandelwal/Global-Terrorism-Dashbaord'
      }
    ],
    []
  );

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id="work" className="container work-page-section">
      <div className="gsap-reveal work-header">
        <MaskedTitle number="2." text="Featured Work" />
        <div className="divider" />
      </div>

      <div className="work-grid">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            className="project-card hoverable gsap-work-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveProjectIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveProjectIndex(index);
            }}
            aria-label={`Open project: ${proj.title}`}
          >
            <div className={`project-bg ${proj.bgClass}`}>
              {proj.images?.[0] && (
                <img
                  src={proj.images[0]}
                  alt={`${proj.title} preview`}
                  className="project-cover-image"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="project-overlay" />
            <div className="project-glimpse-pill font-mono">
              <span className="pill-dot">●</span>
              <span>PREVIEW</span>
            </div>
            <div className="project-info">
              <p className="font-mono project-category text-gray uppercase">{proj.category}</p>
              <h3 className="project-title text-glow uppercase">{proj.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        open={activeProjectIndex !== null}
        onClose={() => setActiveProjectIndex(null)}
        project={activeProject}
      />
    </section>
  );
}
