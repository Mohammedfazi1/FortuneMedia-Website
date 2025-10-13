import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import Montserrat font
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

interface VideoHeroProps {
  onNavigate: (page: string) => void;
}


const VideoHeroComponent = React.memo(({ onNavigate }: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [showPoster, setShowPoster] = React.useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      
      const handleCanPlay = () => {
        setShowPoster(false);
        video.play().catch(() => {
          setShowPoster(true);
        });
      };
      
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {showPoster ? (
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Marketing Agency Team"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            muted
            loop
            playsInline
          >
            {/* Fallback for browsers that don't support video */}
            <source src="data:video/mp4;base64," type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
        >
          Fortune Media
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Transforming brands through innovative marketing solutions and creative excellence
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('contact')}
            className=" text-white bg-black hover:bg-white hover:text-black px-8 py-3 text-lg"
          >
            Get in Touch
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('portfolio')}
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
          >
            About us
          </Button>
        </motion.div>
       </div> 

      {/* Video Controls */}
      {!showPoster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 z-20"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

VideoHeroComponent.displayName = 'VideoHero';

export const VideoHero = VideoHeroComponent;