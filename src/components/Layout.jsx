import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import usePageTransitions from '../hooks/usePageTransitions';
import { useLenis, resetLenis } from '../hooks/useLenis';

import ThreeStarfield from './ThreeStarfield';

export default function Layout({ isPreloaderDone }) {
  useLenis();
  const navigate = useNavigate();
  const location = useLocation();
  const isHeroPage = location.pathname === '/';
  
  const { hasNext, nextRoute, transitionTo } = usePageTransitions({ isActive: isPreloaderDone });

  // Scroll to top and reset Lenis virtual scroll on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    resetLenis();
  }, [location.pathname]);

  // Page entry animation and ScrollTrigger re-initialization when route changes
  useEffect(() => {
    if (!isPreloaderDone) return;
    
    // Smooth page content fade-in
    gsap.fromTo('.page-transition-wrapper',
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    );

    // Initialize reveals synchronously and schedule a settling refresh
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);

    let refreshTimer = null;

    const animFrameId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      // Hero Elements (only run if on Hero page and elements exist)
      if (isHeroPage) {
        gsap.fromTo('.hero-elem',
          { y: isMobile ? 30 : 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.8 : 1.1,
            stagger: isMobile ? 0.12 : 0.2,
            ease: 'power3.out',
            delay: 0.15,
            clearProps: 'transform,opacity,scale'
          }
        );
      }

      // Staggered Scroll Reveal sections (About, Work, Skills, Timeline, Contact)
      const reveals = gsap.utils.toArray('.gsap-reveal');
      reveals.forEach((elem) => {
        const words = elem.querySelectorAll('.word-inner');
        const divider = elem.querySelector('.divider');

        if (words.length > 0 || divider) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: elem,
              start: isMobile ? 'top 96%' : 'top 92%',
              once: true
            }
          });

          // 1. Masked Word Slide-Up with silky responsive ease
          if (words.length > 0) {
            tl.fromTo(words,
              { yPercent: isMobile ? 80 : 105, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: isMobile ? 0.65 : 0.8,
                stagger: isMobile ? 0.05 : 0.07,
                ease: 'power3.out',
                clearProps: 'all'
              }
            );
          }

          // 2. Laser Underline Wipe
          if (divider) {
            const isCentered = divider.classList.contains('centered');
            tl.fromTo(divider,
              {
                scaleX: 0,
                opacity: 0,
                transformOrigin: isCentered ? 'center center' : 'left center'
              },
              {
                scaleX: 1,
                opacity: 1,
                duration: isMobile ? 0.6 : 0.75,
                ease: 'power2.out',
                clearProps: 'all'
              },
              words.length > 0 ? '-=0.35' : 0
            );
          }

          // 3. Trailing subtitle/lead text inside the header
          const trailingText = elem.querySelectorAll('.about-text, .skill-list, .contact-lead, .beacon-eyebrow');
          if (trailingText.length > 0) {
            tl.fromTo(trailingText,
              { y: isMobile ? 18 : 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.6 : 0.75,
                stagger: 0.06,
                ease: 'power3.out',
                clearProps: 'all'
              },
              '-=0.3'
            );
          }
        } else {
          // General Card Containers (Telemetry Deck, Monolith, Abstract Box, etc.)
          gsap.fromTo(elem,
            { y: isMobile ? 24 : 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.7 : 0.9,
              ease: 'power3.out',
              clearProps: 'all',
              scrollTrigger: {
                trigger: elem,
                start: isMobile ? 'top 94%' : 'top 90%',
                once: true
              }
            }
          );
        }
      });

      // Staggered Work Card Reveals specifically for the Work page
      if (document.querySelector('#work')) {
        gsap.fromTo('.gsap-work-card',
          { y: isMobile ? 50 : 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.7 : 0.9,
            stagger: isMobile ? 0.12 : 0.18,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: '#work',
              start: isMobile ? 'top 92%' : 'top 80%',
              once: true
            }
          }
        );
      }

      // Settling refresh after images and webfonts render
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      if (refreshTimer) clearTimeout(refreshTimer);
      // Clean up only reveal triggers created here; child components manage their own triggers
      ScrollTrigger.getAll().forEach(t => {
        if (
          t.vars &&
          t.vars.trigger &&
          t.vars.trigger !== '.quantum-rail-section' &&
          !String(t.vars.trigger).includes('quantum') &&
          !String(t.vars.trigger).includes('timeline') &&
          !String(t.vars.trigger).includes('experience')
        ) {
          t.kill();
        }
      });
    };
  }, [location.pathname, isPreloaderDone, isHeroPage]);

  return (
    <>
      <CustomCursor />
      <ThreeStarfield />

      <Navbar isHeroPage={isHeroPage} />
      
      <main className="page-transition-wrapper">
        <Outlet />
        
        {hasNext && nextRoute && (
          <button
            type="button"
            onClick={() => (transitionTo ? transitionTo('next') : navigate(nextRoute))}
            className="scroll-hint scroll-hint-bottom font-mono text-gray hoverable"
            style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
          >
            Scroll down or click for next section ({nextRoute.slice(1)}) <span className="scroll-arrow">↓</span>
          </button>
        )}
      </main>
    </>
  );
}
