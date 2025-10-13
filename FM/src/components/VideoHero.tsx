import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import Montserrat & Poppins fonts dynamically
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Poppins:wght@700;800&display=swap';
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
        video.play().catch(() => setShowPoster(true));
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
    <section className="relative h-screen w-full overflow-hidden font-[Montserrat]">
      {/* Desktop Background */}
      <div className="hidden sm:block absolute inset-0 w-full h-full">
        {showPoster ? (
          <ImageWithFallback
            src="/assets/Hero-Section.png"
            alt="Fortune Media Hero"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/assets/Hero-Section.png"
            muted
            loop
            playsInline
          >
            <source src="data:video/mp4;base64," type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col h-full">
        <div className="h-1/2 w-full">
          <ImageWithFallback
            src="/assets/Hero-Section.png"
            alt="Fortune Media Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-1/2 bg-black flex flex-col justify-center px-4 relative">
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="/assets/emptyspace.png"
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
              className="relative leading-none mb-4"
              style={{
                fontFamily: `'Poppins', sans-serif`,
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))'
              }}
            >
              <div className="text-6xl font-extrabold text-white">
                Fortune
              </div>
              <div className="text-6xl font-black text-blue-500-400 -mt-1">
                Media
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs text-white/80 mb-6 px-2"
              style={{ fontFamily: `'Poppins', sans-serif` }}
            >
              Transforming brands through innovative marketing solutions
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-3 px-4"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  size="sm"
                  onClick={() => onNavigate('contact')}
                  className="relative text-white bg-black hover:bg-white hover:text-black px-6 py-2 text-sm font-semibold border-2 border-blue-500 hover:border-green-400 transition-colors duration-300 rounded-sm"
                >
                  Get in Touch
                </Button>
              </motion.div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('portfolio')}
                className="border-white text-white hover:bg-white hover:text-black px-4 py-2 text-sm font-semibold w-auto"
              >
                About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden sm:flex absolute inset-0 items-center justify-center z-10">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
            className="relative flex flex-col items-center leading-none"
            style={{
              fontFamily: `'Poppins', sans-serif`
            }}
          >
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold text-white">
              Fortune
            </div>
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-green-400 -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8">
              Media
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: `'Poppins', sans-serif`,
              fontWeight: 600,
            }}
          >
            Transforming brands through innovative marketing solutions and creative excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="relative text-white bg-black hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold shadow-none border-2 border-transparent hover:border-yellow-400 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 border-2 border-yellow-400 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="absolute top-0 left-0 w-full h-0.5 bg-yellow-400 animate-pulse"></span>
                <span className="absolute bottom-0 right-0 w-full h-0.5 bg-yellow-400 animate-pulse" style={{animationDelay: '0.5s'}}></span>
                <span className="absolute left-0 top-0 w-0.5 h-full bg-yellow-400 animate-pulse" style={{animationDelay: '1s'}}></span>
                <span className="absolute right-0 bottom-0 w-0.5 h-full bg-yellow-400 animate-pulse" style={{animationDelay: '1.5s'}}></span>
              </span>
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('portfolio')}
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold shadow-none w-auto"
            >
              About Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Play / Pause Button */}
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

      {/* Scroll Indicator */}
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