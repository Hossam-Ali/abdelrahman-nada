import React from 'react';
import { Icons } from './Icons';

export const Header = React.memo(({ cvData }) => (
  <header className="header">
    <div className="container nav-container">
      <div className="logo">
        <span className="logo-icon"><Icons.Logo /></span>
        {cvData.name}
      </div>
    </div>
  </header>
));

export const Hero = React.memo(({ cvData }) => (
  <section className="hero" id="home">
    <div className="container hero-container">
      <div className="hero-image">
        <div className="image-wrapper">
          <img src="/gallery1.jpg" alt={cvData.name} decoding="async" />
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
));

export const Philosophy = React.memo(({ cvData }) => (
  <section className="philosophy-section">
    <div className="container">
      <div className="philosophy-quote">
        {cvData.philosophy}
      </div>
    </div>
  </section>
));

export const Expertise = React.memo(({ cvData }) => {
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
});

export const ExperienceTimeline = React.memo(({ cvData }) => (
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
              <li key={idx} className="experience-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
));

export const ProjectsAndInitiatives = React.memo(({ cvData }) => (
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
));

export const Collaboration = React.memo(({ cvData }) => (
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
));

export const CelebrationHistory = React.memo(({ cvData }) => (
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
));

export const Footer = React.memo(({ cvData }) => (
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
));
