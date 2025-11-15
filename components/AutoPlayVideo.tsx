'use client'
import { useRef, useEffect, useState } from 'react';

interface AutoPlayVideoProps {
  src: string;
  muted?: boolean;
  loop?: boolean;
}

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ src, muted, loop }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(videoRef.current!);

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        videoRef.current.requestFullscreen().then(() => setIsFullScreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullScreen(false));
      }
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop={loop}
        autoPlay
        className="w-full"
      />
      <button onClick={toggleFullScreen} className="absolute top-[10px] right-[10px] bg-green-1300 rounded-2xl font-medium p-[10px] cursor-pointer">
        {isFullScreen ? 'Sair Tela Cheia' : 'Tela Cheia'}
      </button>
    </div>
  );
};

export default AutoPlayVideo;
