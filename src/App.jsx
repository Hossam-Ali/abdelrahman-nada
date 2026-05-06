import React, { Suspense, lazy } from 'react';
import { cvData } from './data';
import './index.css';
import { Header, Hero, Philosophy, Expertise, ExperienceTimeline, CelebrationHistory, Collaboration, ProjectsAndInitiatives, Footer } from './components/PortfolioSections';

// Lazy load heavy media components for better initial load performance
const MediaGallery = lazy(() => import('./components/MediaGallery'));
const VideoGallery = lazy(() => import('./components/VideoGallery'));

const Loading = () => (
  <div className="section-padding flex-center" style={{ minHeight: '200px' }}>
    <div style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>جاري التحميل...</div>
  </div>
);

function App() {
  return (
    <div className="app">
      <Header cvData={cvData} />
      <Hero cvData={cvData} />
      <Philosophy cvData={cvData} />
      <Expertise cvData={cvData} />
      <ExperienceTimeline cvData={cvData} />
      <CelebrationHistory cvData={cvData} />
      
      <Suspense fallback={<Loading />}>
        <MediaGallery />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <VideoGallery cvData={cvData} />
      </Suspense>
      
      <Collaboration cvData={cvData} />
      <ProjectsAndInitiatives cvData={cvData} />
      <Footer cvData={cvData} />
    </div>
  );
}

export default App;
