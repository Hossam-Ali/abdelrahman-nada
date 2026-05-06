import React, { useState } from 'react';

const VideoGallery = ({ cvData }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const toArabicNumerals = (num) => {
    return num.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
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
                    <video src={link} preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="video-play-btn">▶</div>
                  </div>
                  <div className="video-info-box">
                    مشاهدة الفيديو المسجل {toArabicNumerals(idx + 1)}
                  </div>
                </div>
              );
            }

            return (
              <a href={link} target="_blank" rel="noreferrer" key={idx} className="video-card">
                <div className="video-thumbnail">
                  {thumbUrl && <img src={thumbUrl} alt="Thumbnail" loading="lazy" decoding="async" />}
                  <div className="video-play-btn">▶</div>
                </div>
                <div className="video-info-box">
                  مشاهدة التغطية المرئية {toArabicNumerals(idx + 1)}
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

export default React.memo(VideoGallery);
