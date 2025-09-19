import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sliderImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1613053745430-553b050dd3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBiaWxsYm9hcmR8ZW58MXx8fHwxNzU4MDAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Outdoor Advertising Billboard",
    title: "Outdoor Advertising Excellence",
    description: "Captivating billboard campaigns that reach your target audience"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1585504303098-9785dc784742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBkaXNwbGF5JTIwZGlnaXRhbCUyMGFkdmVydGlzaW5nfGVufDF8fHx8MTc1ODEwNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "LED Display Digital Advertising",
    title: "Digital Display Innovation",
    description: "State-of-the-art LED displays for maximum impact"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU4MDc0NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Business Meeting Presentation",
    title: "Strategic Marketing Solutions",
    description: "Comprehensive marketing strategies that drive results"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1669348141071-9eae9ac4224e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzU4MTA1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "City Skyline Business District",
    title: "Urban Marketing Presence",
    description: "Dominating the urban landscape with strategic placement"
  }
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Main slider */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={sliderImages[currentIndex].src}
              alt={sliderImages[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.h2
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4"
            >
              {sliderImages[currentIndex].title}
            </motion.h2>
            
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            >
              {sliderImages[currentIndex].description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          key={`progress-${currentIndex}`}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-white"
        />
      </div>
    </section>
  );
}