import React, { useState } from 'react';

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
              <img src={img} alt={`Gallery ${idx + 1}`} loading="lazy" decoding="async" />
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

export default React.memo(MediaGallery);
