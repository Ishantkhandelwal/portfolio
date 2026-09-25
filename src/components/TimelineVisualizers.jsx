import { useEffect, useRef } from 'react';

// ============================================================================
// STAGE 01: Aug 2024 – Present: Computer Science & Data Modeling Foundations
// Relational Schema Hierarchy & SQL Query Execution Telemetry
// ============================================================================
export function WebArchitectureCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Schema Tables
    const schemaNodes = [
      { id: 'dbms', label: 'DATABASE_ENGINE', x: 0.5, y: 0.20, children: ['students', 'analytics'] },
      { id: 'students', label: 'STUDENT_RECORDS', x: 0.26, y: 0.46, children: ['queries', 'indexes'] },
      { id: 'analytics', label: 'ANALYTICS_DATA', x: 0.74, y: 0.46, children: ['models'] },
      { id: 'queries', label: 'OPTIMIZED_SQL', x: 0.18, y: 0.72, children: [] },
      { id: 'indexes', label: 'B-TREE_INDEX', x: 0.45, y: 0.72, children: [] },
      { id: 'models', label: 'RELATIONAL_SCHEMA', x: 0.78, y: 0.72, children: [] }
    ];

    const sqlQueries = [
      'SELECT id, risk_score FROM cohorts WHERE risk_tier = "CRITICAL";',
      'EXPLAIN ANALYZE SELECT * FROM transactions WHERE ip_risk > 80;',
      'CREATE INDEX idx_student_perf ON academics(attendance, gpa);',
      'INNER JOIN district_stats ON state.code = district_stats.code;'
    ];

    let frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isActiveRef.current) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw Connection Lines
      ctx.lineWidth = 1;
      schemaNodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;

        node.children.forEach((cid) => {
          const child = schemaNodes.find((n) => n.id === cid);
          if (child) {
            const cx = child.x * width;
            const cy = child.y * height;

            ctx.beginPath();
            ctx.moveTo(nx, ny + 13);
            ctx.lineTo(cx, cy - 13);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.stroke();
          }
        });
      });

      // Draw Schema Boxes
      schemaNodes.forEach((node, idx) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isRoot = idx === 0;

        const boxW = Math.min(108, width * 0.27);
        const boxH = 26;

        ctx.fillStyle = isRoot ? 'rgba(28, 30, 44, 0.95)' : 'rgba(14, 15, 22, 0.9)';
        ctx.strokeStyle = isRoot ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(nx - boxW / 2, ny - boxH / 2, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = '8.5px "Space Mono", monospace';
        ctx.fillStyle = isRoot ? '#38bdf8' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      });

      // Status Footer
      const footerY = height - 16;
      ctx.font = '8.5px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      const query = sqlQueries[Math.floor(frame / 150) % sqlQueries.length];
      ctx.fillText(`SQL: ${query}`, 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('DBMS & OOP FOUNDATIONS • VERIFIED', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 02: May 2026: Crime Against Women Predictive Regression & Trend Modeling
// Scatter Points, Fitted Regression Curve & Correlation Bounds
// ============================================================================
export function ChatUpSocketStreamCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const scatterPoints = [
      { x: 0.12, y: 0.78, color: '#38bdf8' },
      { x: 0.18, y: 0.72, color: '#818cf8' },
      { x: 0.28, y: 0.65, color: '#38bdf8' },
      { x: 0.35, y: 0.58, color: '#fb7185' },
      { x: 0.44, y: 0.52, color: '#38bdf8' },
      { x: 0.52, y: 0.45, color: '#fb7185' },
      { x: 0.62, y: 0.38, color: '#f43f5e' },
      { x: 0.70, y: 0.34, color: '#fb7185' },
      { x: 0.79, y: 0.26, color: '#f43f5e' },
      { x: 0.88, y: 0.20, color: '#e11d48' }
    ];

    let frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isActiveRef.current) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Header Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(18, 16, 26, 0.85)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('MODEL: SCIKIT-LEARN OLS REGRESSION', 28, headerY + 18);

      ctx.fillStyle = '#fb7185';
      ctx.textAlign = 'right';
      ctx.fillText('R²: 0.864 • 7 FACTORS', width - 28, headerY + 18);

      // Chart Area
      const chartX = 36;
      const chartY = 56;
      const chartW = width - 72;
      const chartH = height - 96;

      ctx.fillStyle = 'rgba(10, 10, 16, 0.85)';
      ctx.fillRect(chartX, chartY, chartW, chartH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(chartX, chartY, chartW, chartH);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.setLineDash([4, 4]);
      for (let i = 1; i <= 3; i++) {
        const gy = chartY + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Regression Line
      ctx.beginPath();
      ctx.moveTo(chartX + 10, chartY + chartH - 15);
      ctx.lineTo(chartX + chartW - 10, chartY + 15);
      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Confidence Band
      ctx.fillStyle = 'rgba(251, 113, 133, 0.12)';
      ctx.beginPath();
      ctx.moveTo(chartX + 10, chartY + chartH);
      ctx.lineTo(chartX + chartW - 10, chartY + 30);
      ctx.lineTo(chartX + chartW - 10, chartY);
      ctx.lineTo(chartX + 10, chartY + chartH - 30);
      ctx.closePath();
      ctx.fill();

      // Scatter Points
      scatterPoints.forEach((p, idx) => {
        const px = chartX + p.x * chartW;
        const py = chartY + p.y * chartH + Math.sin((frame + idx * 25) * 0.04) * 2;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Footer
      const footerY = height - 16;
      ctx.font = '8px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.fillText('DISTRICT DATASETS • 28 STATES & 8 UTs', 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#fb7185';
      ctx.fillText('PREDICTIVE TREND ENGINE', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 03: Jun 2026: AI Dropout Risk Intelligence System
// Real-Time Probability Scoring Dial & Explainable AI (XAI) Feature Drivers
// ============================================================================
export function RoastingAITokenStreamCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isActiveRef.current) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Header Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(16, 16, 26, 0.85)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('AI INFERENCE: DROPOUT RISK ENGINE', 28, headerY + 18);

      ctx.fillStyle = '#f43f5e';
      ctx.textAlign = 'right';
      ctx.fillText('CRITICAL DANGER • 78.4%', width - 28, headerY + 18);

      // Left: Circular Risk Dial
      const dialCenterX = 75;
      const dialCenterY = 135;
      const dialRadius = Math.min(48, height * 0.18);

      // Background circle
      ctx.beginPath();
      ctx.arc(dialCenterX, dialCenterY, dialRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Filled active arc
      ctx.beginPath();
      const progress = 0.784 + Math.sin(frame * 0.05) * 0.015;
      ctx.arc(dialCenterX, dialCenterY, dialRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${(progress * 100).toFixed(1)}%`, dialCenterX, dialCenterY - 4);
      ctx.font = '7.5px "Space Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('DROPOUT RISK', dialCenterX, dialCenterY + 12);

      // Right: Explainable AI (XAI) Feature Importance Bars
      const xaiStartX = 150;
      const xaiW = width - xaiStartX - 28;
      const drivers = [
        { label: 'Attendance Deficit', impact: '+42.8%', ratio: 0.85, color: '#f43f5e' },
        { label: 'Internal Exam Scores', impact: '+28.5%', ratio: 0.62, color: '#a855f7' },
        { label: 'Assignment Overdue', impact: '+18.2%', ratio: 0.44, color: '#38bdf8' }
      ];

      drivers.forEach((drv, i) => {
        const dy = 78 + i * 44;
        ctx.font = '8px "Space Mono", monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.textAlign = 'left';
        ctx.fillText(drv.label, xaiStartX, dy);

        ctx.fillStyle = drv.color;
        ctx.textAlign = 'right';
        ctx.fillText(drv.impact, xaiStartX + xaiW, dy);

        // Bar track
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.roundRect(xaiStartX, dy + 6, xaiW, 8, 4);
        ctx.fill();

        // Active Bar
        ctx.fillStyle = drv.color;
        ctx.beginPath();
        ctx.roundRect(xaiStartX, dy + 6, xaiW * drv.ratio, 8, 4);
        ctx.fill();
      });

      // Footer
      const footerY = height - 16;
      ctx.font = '8.5px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.fillText('STREAMLIT SUITE • REAL-TIME XAI DIAGNOSTICS', 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#10b981';
      ctx.fillText('PRESCRIPTIVE PLANS ACTIVE', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 04: Jul 2026: Power BI Digital Payment Fraud Telemetry
// Dynamic DAX Telemetry Cards & Live Anomaly Ticker
// ============================================================================
export function EdgeResumeATSParserCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const transactions = [
      { id: '#TX-7412', mode: 'UPI_GATEWAY', city: 'Mumbai', risk: '92.4', alert: true },
      { id: '#TX-7413', mode: 'VISA_DEBIT', city: 'Delhi NCR', risk: '14.1', alert: false },
      { id: '#TX-7414', mode: 'NET_BANKING', city: 'Bengaluru', risk: '88.0', alert: true },
      { id: '#TX-7415', mode: 'UPI_QR_CODE', city: 'Jaipur', risk: '21.3', alert: false }
    ];

    let _frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isActiveRef.current) return;
      _frame++;
      ctx.clearRect(0, 0, width, height);

      // Header Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(16, 18, 28, 0.9)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('POWER BI // TELEMETRY STREAM', 28, headerY + 18);

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.fillText('7,500+ TRANSACTIONS • DAX KPI', width - 28, headerY + 18);

      // Ticker Rows
      const rowBaseY = 56;
      const rowHeight = Math.min(38, (height - 96) / 4);

      transactions.forEach((tx, idx) => {
        const ry = rowBaseY + idx * rowHeight;
        ctx.fillStyle = tx.alert ? 'rgba(244, 63, 94, 0.1)' : 'rgba(12, 14, 20, 0.8)';
        ctx.strokeStyle = tx.alert ? 'rgba(244, 63, 94, 0.35)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(16, ry, width - 32, rowHeight - 6, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = '8.5px "Space Mono", monospace';
        ctx.fillStyle = tx.alert ? '#f43f5e' : '#38bdf8';
        ctx.textAlign = 'left';
        ctx.fillText(tx.id, 26, ry + (rowHeight - 6) / 2 + 3);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(tx.mode, 95, ry + (rowHeight - 6) / 2 + 3);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText(tx.city, Math.min(210, width * 0.55), ry + (rowHeight - 6) / 2 + 3);

        ctx.textAlign = 'right';
        ctx.fillStyle = tx.alert ? '#f43f5e' : '#10b981';
        ctx.fillText(`RISK: ${tx.risk}`, width - 26, ry + (rowHeight - 6) / 2 + 3);
      });

      // Footer
      const footerY = height - 16;
      ctx.font = '8px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.fillText('POWER QUERY ETL • AUTOMATED INGESTION', 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#10b981';
      ctx.fillText('ANOMALY TELEMETRY ACTIVE', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}
