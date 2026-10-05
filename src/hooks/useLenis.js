import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

export function stopLenis() {
  if (globalLenis) {
    globalLenis.stop();
  }
}

export function startLenis() {
  if (globalLenis) {
    globalLenis.start();
  }
}

export function resetLenis() {
  if (globalLenis) {
    globalLenis.stop();
    globalLenis.scrollTo(0, { immediate: true, force: true });
    globalLenis.start();
  }
}

export function useLenis() {
  useEffect(() => {
    // Only run Lenis on desktop fine pointer devices
    // Touchscreen phones perform far smoother with native browser momentum scrolling
    const isTouchOrMobile =
      (typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(max-width: 768px)').matches ||
          'ontouchstart' in window));

    if (isTouchOrMobile) {
      // Let native momentum scrolling run smoothly and update ScrollTrigger
      const handleNativeScroll = () => {
        ScrollTrigger.update();
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    globalLenis = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    // Keep healthy lag smoothing so frame hiccups on low-power devices recover gracefully
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      if (globalLenis === lenis) {
        globalLenis = null;
        window.__lenis = null;
      }
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);
}
