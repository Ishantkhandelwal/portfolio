import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Core shell components
import Preloader from './components/Preloader';
import Layout from './components/Layout';
import Hero from './components/Hero';

// Lazy-loaded page components for ultra-fast startup and code-splitting
const About = lazy(() => import('./components/About'));
const Work = lazy(() => import('./components/Work'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('preloaderDone') === 'true'
  );

  return (
    <BrowserRouter>
      {/* High-tech preloader (runs once per session) */}
      <Preloader onLoaded={() => setIsPreloaderDone(true)} />

      <Routes>
        <Route path="/" element={<Layout isPreloaderDone={isPreloaderDone} />}>
          <Route index element={<Hero />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="work"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Work />
              </Suspense>
            }
          />
          <Route
            path="skills"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Skills />
              </Suspense>
            }
          />
          <Route path="timeline" element={<Navigate to="/about" replace />} />
          <Route
            path="contact"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
