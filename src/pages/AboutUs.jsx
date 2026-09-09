import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { assetUrl, siteConfig } from '../config';

export default function AboutUs() {
  const videoRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);

  const playVideo = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) return undefined;

    const video = videoRef.current;
    const source = assetUrl(siteConfig.aboutVideo);
    let player;

    if (!video) return undefined;

    if (/\.m3u8(?:$|\?)/i.test(source)) {
      if (Hls.isSupported()) {
        player = new Hls();
        player.loadSource(source);
        player.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
      }
    } else {
      video.src = source;
    }

    const playWhenReady = () => {
      void video.play();
    };
    video.addEventListener('loadedmetadata', playWhenReady, { once: true });
    if (video.readyState >= 1) {
      playWhenReady();
    }

    return () => {
      video.removeEventListener('loadedmetadata', playWhenReady);
      if (player) {
        player.destroy();
      }
      video.removeAttribute('src');
      video.load();
    };
  }, [isStarted]);

  return (
    <section className="about-page section-shell">
      <div className="about-intro">
        <p className="eyebrow">The RH standard</p>
        <h1>Premium sandals<br /><em>start close to the source.</em></h1>
        <p>We are a Guangzhou footwear factory built around an uncomplicated idea: make premium sandals better, then make them dependable at scale.</p>
      </div>
      <div className="about-grid">
        <div className="about-image">
          {!isStarted && (
            <button
              className="about-video-cover"
              type="button"
              onClick={playVideo}
              aria-label="Play RH footwear production video"
            >
              <img src={assetUrl(siteConfig.aboutVideoPoster)} alt="" />
              <span className="about-video-play" aria-hidden="true">&#9654;</span>
            </button>
          )}
          <video
            ref={videoRef}
            onClick={playVideo}
            controls
            loop
            playsInline
            preload="metadata"
            aria-label="RH footwear production"
          />
        </div>
        <div className="about-facts">
          <div><strong>20</strong><span>years of China factory<br />manufacturing</span></div>
          <div><strong>AF</strong><span>proven demand<br />across African markets</span></div>
          <div><strong>100%</strong><span>direct factory<br />communication</span></div>
        </div>
      </div>
    </section>
  );
}
