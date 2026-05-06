import React, { useState } from 'react';
import { cvData } from './data';
import './index.css';

// SVG Icons
const Icons = {
  Star: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  BookOpen: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  Award: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  Briefcase: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  Mail: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  Phone: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.554 4.197 1.606 6.046L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.632 0 12.028-5.391 12.03-12.027a11.85 11.85 0 00-3.517-8.487" />
    </svg>
  ),
  Logo: () => (
    <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
      <line x1="12" y1="22" x2="12" y2="12"></line>
      <line x1="22" y1="8.5" x2="12" y2="12"></line>
      <line x1="2" y1="8.5" x2="12" y2="12"></line>
    </svg>
  )
};

const Header = () => (
  <header className="header">
    <div className="container nav-container">
      <div className="logo">
        <span className="logo-icon"><Icons.Logo /></span>
        {cvData.name}
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="hero" id="home">
    <div className="container hero-container">
      <div className="hero-image">
        <div className="image-wrapper">
          <img src="/gallery1.jpg" alt={cvData.name} />
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{cvData.name}</h1>
        <h2 className="hero-subtitle">{cvData.subtitle}</h2>
        <div className="hero-about">
          {cvData.about.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{p}</p>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#expertise" className="btn btn-primary">اكتشف خبراتي</a>
          <a href="#contact" className="btn btn-secondary">تواصل معي</a>
        </div>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="philosophy-section">
    <div className="container">
      <div className="philosophy-quote">
        {cvData.philosophy}
      </div>
    </div>
  </section>
);

const Expertise = () => {
  const iconMap = [Icons.BookOpen, Icons.Award, Icons.Star];
  
  return (
    <section className="section-padding bg-alternate" id="expertise">
      <div className="container">
        <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '4rem' }}>مجالات العمل والخبرة</h2>
        <div className="grid grid-cols-3">
          {cvData.areasOfWork.map((area, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div className="card" key={index}>
                <div className="card-icon"><Icon /></div>
                <h3 className="card-title">{area.title}</h3>
                <ul className="card-list">
                  {area.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => (
  <section className="section-padding" id="about">
    <div className="container">
      <div className="grid grid-cols-2">
        <div>
          <h2 className="section-title">مقدمة شخصية</h2>
          <div className="timeline">
            {cvData.personalIntro.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-content">
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-title">خبرات عملية</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>إصدار ومتابعه وإشراف وتنفيذ وإدارة للأعمال الأتية:</p>
          <ul className="card-list">
            {cvData.practicalExperience.map((item, idx) => (
              <li key={idx} style={{ background: 'var(--bg-card)', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsAndInitiatives = () => (
  <section className="section-padding bg-alternate" id="projects">
    <div className="container">
      <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '4rem' }}>المبادرات والمشاريع النوعية</h2>
      <div className="grid grid-cols-2">
        {cvData.qualitativeProjects.map((project, index) => (
          <div className="card" key={index}>
            <div className="card-icon"><Icons.Briefcase /></div>
            <h3 className="card-title text-gold">{project.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '5rem' }}>
        <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '3rem' }}>القيمة المقدمة للشركاء والمؤسسات</h2>
        <div className="grid grid-cols-2">
          {cvData.valueProvided.slice(1).map((val, idx) => (
            <div key={idx} style={{ background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>✓</div>
              <h4 style={{ fontSize: '1.2rem' }}>{val}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Collaboration = () => (
  <section className="section-padding">
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="card">
          <h3 className="card-title text-gold" style={{ fontSize: '2rem', marginBottom: '2rem' }}>أرحب بالتعاون مع</h3>
          <ul className="card-list" style={{ fontSize: '1.2rem' }}>
            {cvData.collaboration.with.map((item, idx) => (
              <li key={idx} style={{ padding: '0.5rem 2rem 0.5rem 0' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="card-title text-gold" style={{ fontSize: '2rem', marginBottom: '2rem' }}>في مجالات</h3>
          <ul className="card-list" style={{ fontSize: '1.2rem' }}>
            {cvData.collaboration.in.map((item, idx) => (
              <li key={idx} style={{ padding: '0.5rem 2rem 0.5rem 0' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <h2 className="section-title text-center footer-title" style={{ display: 'block', marginBottom: '3rem' }}>
        تواصل <br className="mobile-only" /> معي
      </h2>
      <div className="contact-info">
        <a href={`https://wa.me/${cvData.contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="contact-item">
          <div className="contact-icon" style={{ color: '#25D366' }}><Icons.WhatsApp /></div>
          <span dir="ltr">{cvData.contact.whatsapp}</span>
        </a>
        <a href={`mailto:${cvData.contact.email}`} className="contact-item">
          <div className="contact-icon"><Icons.Mail /></div>
          <span>{cvData.contact.email}</span>
        </a>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} {cvData.name}. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>
);

const CelebrationHistory = () => (
  <section className="section-padding" id="history">
    <div className="container">
      <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '4rem' }}>تاريخ الاحتفاليات</h2>
      <div className="history-grid">
        {cvData.celebrationHistory.map((item, idx) => (
          <div className="history-card" key={idx}>
            <div className="history-year">{item.year}</div>
            <div className="history-info">
              <h4 className="history-title-card">{item.title}</h4>
              <p className="history-date">{item.date}</p>
              <p className="history-sponsor"><span className="text-gold">برعاية:</span> {item.sponsor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MediaGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const images = Array.from({ length: 29 }, (_, i) => `/gallery${i + 2}.jpg`);
  
  return (
    <section className="section-padding bg-alternate" id="gallery">
      <div className="container">
        <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '4rem' }}>معرض الصور</h2>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div 
              className="gallery-item" 
              key={idx}
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} alt={`Gallery ${idx + 1}`} loading="lazy" />
              <div className="gallery-overlay">تكبير الصورة</div>
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="modal-content">
            <span className="modal-close">&times;</span>
            <img src={selectedImg} alt="Enlarged" />
          </div>
        </div>
      )}
    </section>
  );
};

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section className="section-padding" id="videos">
      <div className="container">
        <h2 className="section-title text-center" style={{ display: 'block', marginBottom: '4rem' }}>المحتوى المرئي</h2>
        <div className="grid grid-cols-3">
          {cvData.videoLinks.map((link, idx) => {
            const isLocal = link.endsWith('.mp4');
            const videoId = isLocal ? null : getYoutubeId(link);
            const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
            
            if (isLocal) {
              return (
                <div key={idx} className="video-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedVideo(link)}>
                  <div className="video-thumbnail">
                    <video src={link} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="video-play-btn">▶</div>
                  </div>
                  <div className="video-info-box">
                    مشاهدة الفيديو المسجل {idx + 1}
                  </div>
                </div>
              );
            }

            return (
              <a href={link} target="_blank" rel="noreferrer" key={idx} className="video-card">
                <div className="video-thumbnail">
                  {thumbUrl && <img src={thumbUrl} alt="Thumbnail" />}
                  <div className="video-play-btn">▶</div>
                </div>
                <div className="video-info-box">
                  مشاهدة التغطية المرئية {idx + 1}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setSelectedVideo(null)}>&times;</span>
            <video src={selectedVideo} controls autoPlay style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </section>
  );
};

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Philosophy />
      <Expertise />
      <ExperienceTimeline />
      <CelebrationHistory />
      <MediaGallery />
      <VideoGallery />
      <Collaboration />
      <ProjectsAndInitiatives />
      <Footer />
    </div>
  );
}

export default App;
