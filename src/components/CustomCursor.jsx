import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only mount on desktop/laptop devices with fine pointing hardware
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initial setup with GPU acceleration
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      opacity: 0,
    });

    // Dot snaps immediately (pinpoint precision)
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'none' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'none' });

    // Outer ring follows with fluid damping
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power3.out' });

    let isVisible = false;
    let lastSparkleTime = 0;

    // Spawn subtle cosmic stardust particle trail on cursor movement
    const createStardust = (x, y) => {
      const now = performance.now();
      if (now - lastSparkleTime < 55) return; // Throttled to ~18 fps for particle spawn
      lastSparkleTime = now;

      const particle = document.createElement('div');
      particle.className = 'cursor-stardust';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 16 + 6;
      const targetX = x + Math.cos(angle) * dist;
      const targetY = y + Math.sin(angle) * dist;

      gsap.to(particle, {
        x: targetX - x,
        y: targetY - y,
        scale: Math.random() * 0.5 + 0.3,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
    };

    const handleMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
        isVisible = true;
      }

      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);

      // Check if hovering clickable or interactive elements
      const target = e.target;
      if (
        target &&
        (target.classList.contains('hoverable') ||
          target.closest('.hoverable') ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.project-card') ||
          target.closest('.skill-orbital-card'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      // Create subtle trailing stardust
      createStardust(e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);

      // Quantum shockwave ping ripple
      const ripple = document.createElement('div');
      ripple.className = 'cursor-quantum-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0.5, opacity: 0.8 },
        {
          scale: 2.2,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          },
        }
      );
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div id="cursor-system" aria-hidden="true">
      {/* Precision Micro Dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className={`${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      {/* Quantum Halo / Telemetry Reticle */}
      <div
        ref={ringRef}
        id="cursor-ring"
        className={`${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <span className="reticle-orbit-node" />
        <span className="reticle-tick tick-top" />
        <span className="reticle-tick tick-bottom" />
        <span className="reticle-tick tick-left" />
        <span className="reticle-tick tick-right" />
      </div>
    </div>
  );
}
