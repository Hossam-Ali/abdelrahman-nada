import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const BOOK_URL = '/book.pdf';

const Page = forwardRef(({ src, number }, ref) => (
  <div className="book-page" ref={ref}>
    <img src={src} alt={`صفحة ${number}`} draggable={false} />
    <span className="book-page-number">{number}</span>
  </div>
));
Page.displayName = 'BookPage';

const BookFlip = () => {
  const [pages, setPages] = useState([]);
  const [aspect, setAspect] = useState(0.707);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const audioCtxRef = useRef(null);
  const bookRef = useRef(null);
  const [centerCover, setCenterCover] = useState(false);

  const flipNext = useCallback(
    () => bookRef.current?.pageFlip()?.flipNext(),
    [],
  );
  const flipPrev = useCallback(
    () => bookRef.current?.pageFlip()?.flipPrev(),
    [],
  );

  const updateCentering = useCallback(() => {
    const pf = bookRef.current?.pageFlip?.();
    if (!pf) return;
    const landscape = pf.getOrientation?.() === 'landscape';
    const page = pf.getCurrentPageIndex?.() ?? 0;
    setCenterCover(landscape && page === 0);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url: BOOK_URL }).promise;
        const rendered = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const base = page.getViewport({ scale: 1 });
          if (i === 1) setAspect(base.width / base.height);

          const scale = Math.min(2, 1400 / base.width);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const ctx = canvas.getContext('2d');
          await page.render({
            canvasContext: ctx,
            viewport,
            transform: [-1, 0, 0, 1, canvas.width, 0],
          }).promise;

          rendered.push(canvas.toDataURL('image/jpeg', 0.85));
          if (!cancelled) setProgress(Math.round((i / pdf.numPages) * 100));
        }

        if (!cancelled) setPages(rendered);
      } catch (err) {
        console.error('Failed to load book PDF:', err);
        if (!cancelled) setError('تعذّر تحميل الكتاب. حاول مرة أخرى لاحقًا.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const playFlipSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || (audioCtxRef.current = new AudioCtx());
      if (ctx.state === 'suspended') ctx.resume();

      const duration = 0.28;
      const buffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * duration),
        ctx.sampleRate,
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / data.length;
        const env = Math.pow(1 - t, 2) * Math.min(1, t * 12);
        data[i] = (Math.random() * 2 - 1) * env;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 2200;
      bandpass.Q.value = 0.7;

      const gain = ctx.createGain();
      gain.gain.value = 0.35;

      noise.connect(bandpass).connect(gain).connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch {
      /* ignore */
    }
  }, []);

  const handleState = useCallback(
    (e) => {
      if (e?.data === 'flipping' || e?.data === 'user_fold') {
        playFlipSound();
        setCenterCover(false);
      }
      if (e?.data === 'read') updateCentering();
    },
    [playFlipSound, updateCentering],
  );

  useEffect(() => {
    if (pages.length === 0) return;
    const id = setTimeout(updateCentering, 150);
    return () => clearTimeout(id);
  }, [pages.length, updateCentering]);

  if (error) {
    return (
      <section className="section-padding" id="book">
        <div className="container">
          <h2
            className="section-title text-center"
            style={{ display: 'block', marginBottom: '2rem' }}
          >
            الكتاب
          </h2>
          <p className="text-center" style={{ color: 'var(--text-muted)' }}>
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-alternate" id="book">
      <div className="container">
        <h2
          className="section-title text-center"
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          الكتاب
        </h2>
        <p className="text-center book-hint">انقر على الأسهم لتصفّح الكتاب</p>

        {pages.length === 0 ? (
          <div className="book-loading">
            <div className="book-loading-bar">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p>جاري تجهيز الكتاب… {progress}%</p>
          </div>
        ) : (
          <div className="book-stage">
            <button
              className="book-nav book-nav-prev"
              onClick={flipPrev}
              aria-label="الصفحة السابقة"
            >
              ‹
            </button>
            <div
              className="book-rtl"
              style={{
                width: `min(96vw, ${(2 * aspect * 84).toFixed(2)}vh)`,
                transform: centerCover
                  ? 'scaleX(-1) translateX(-25%)'
                  : 'scaleX(-1)',
              }}
            >
              <HTMLFlipBook
                ref={bookRef}
                width={550}
                height={Math.round(550 / aspect)}
                size="stretch"
                minWidth={330}
                maxWidth={1200}
                minHeight={400}
                maxHeight={1800}
                drawShadow
                maxShadowOpacity={0.5}
                showCover
                useMouseEvents={false}
                mobileScrollSupport
                flippingTime={700}
                className="flip-book"
                onChangeState={handleState}
                onChangeOrientation={updateCentering}
              >
                {pages.map((src, idx) => (
                  <Page key={idx} src={src} number={idx + 1} />
                ))}
              </HTMLFlipBook>
            </div>
            <button
              className="book-nav book-nav-next"
              onClick={flipNext}
              aria-label="الصفحة التالية"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(BookFlip);
