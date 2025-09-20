import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: string;
  heroMedia: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  description: string;
  problem: string;
  solution: string;
  deliverables: string[];
  results: string[];
  mockups: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Digital Highway Revolution",
    client: "Airtel",
    category: "LED Display Campaign",
    heroMedia: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1585504303098-9785dc784742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBkaXNwbGF5JTIwZGlnaXRhbCUyMGFkdmVydGlzaW5nfGVufDF8fHx8MTc1ODEwNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    description: "A comprehensive LED display campaign across major highways to boost brand visibility and customer acquisition.",
    problem: "Airtel needed to increase brand awareness in competitive telecommunications market while reaching commuters during peak traffic hours.",
    solution: "Strategic placement of high-resolution LED displays on major highways with dynamic content that changes based on time of day and traffic patterns.",
    deliverables: [
      "15 LED displays across highways",
      "Dynamic content management system",
      "Real-time analytics dashboard",
      "24/7 monitoring and support"
    ],
    results: [
      "300% increase in brand recall",
      "45% boost in new customer acquisition",
      "2.5M daily impressions",
      "ROI of 350%"
    ],
    mockups: [
      'https://images.unsplash.com/photo-1613053745430-553b050dd3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBiaWxsYm9hcmR8ZW58MXx8fHwxNzU4MDAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1669348141071-9eae9ac4224e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzU4MTA1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 2,
    title: "Urban Mobility Marketing",
    client: "TechCorp",
    category: "Rickshaw Advertising",
    heroMedia: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    description: "Mobile advertising campaign using rickshaw autotops to reach tech-savvy urban professionals in their daily commute.",
    problem: "TechCorp struggled to reach young professionals in urban areas through traditional advertising mediums.",
    solution: "Innovative rickshaw autotop advertising with QR codes and interactive elements targeting tech hubs and business districts.",
    deliverables: [
      "200 rickshaw autotop installations",
      "GPS tracking system",
      "QR code integration",
      "Performance analytics"
    ],
    results: [
      "150% increase in app downloads",
      "85% improvement in brand recognition",
      "50K+ QR code scans",
      "ROI of 280%"
    ],
    mockups: [
      'https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU4MDc0NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 3,
    title: "Premium Brand Positioning",
    client: "Furtune Financial",
    category: "Gantry Arch Campaign",
    heroMedia: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1669348141071-9eae9ac4224e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzU4MTA1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    description: "Strategic gantry arch placement to establish premium brand presence for financial services across major business corridors.",
    problem: "Furtune Financial needed to establish trust and premium positioning in the competitive financial services market.",
    solution: "Premium gantry arch installations on business expressways with sophisticated design elements that convey trust and reliability.",
    deliverables: [
      "8 premium gantry arch installations",
      "Custom illumination design",
      "Weather-resistant materials",
      "Brand consistency guidelines"
    ],
    results: [
      "400% increase in brand inquiries",
      "60% boost in premium service uptake",
      "95% positive brand perception",
      "ROI of 450%"
    ],
    mockups: [
      'https://images.unsplash.com/photo-1585504303098-9785dc784742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBkaXNwbGF5JTIwZGlnaXRhbCUyMGFkdmVydGlzaW5nfGVufDF8fHx8MTc1ODEwNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1613053745430-553b050dd3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBiaWxsYm9hcmR8ZW58MXx8fHwxNzU4MDAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 4,
    title: "Retail Revolution Campaign",
    client: "GlobalRetail",
    category: "Center Median Advertising",
    heroMedia: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU4MDc0NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    description: "Strategic center median advertising campaign to drive footfall to retail locations during peak shopping seasons.",
    problem: "GlobalRetail faced declining footfall in physical stores due to increased online shopping trends.",
    solution: "Eye-catching center median displays with directional messaging and limited-time offers to drive immediate store visits.",
    deliverables: [
      "25 center median installations",
      "Seasonal campaign designs",
      "Traffic flow analysis",
      "Store visit tracking"
    ],
    results: [
      "200% increase in store footfall",
      "75% boost in weekend sales",
      "1.8M customer impressions",
      "ROI of 320%"
    ],
    mockups: [
      'https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];

export function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { scrollY } = useScroll({
    container: containerRef
  });

  const resetAutoPlay = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setUserInteracted(true);
    setIsAutoPlaying(false);
    
    timeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
      setIsAutoPlaying(true);
    }, 5000);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || userInteracted) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, userInteracted]);

  // Handle scroll/swipe navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      resetAutoPlay();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSlide < portfolioItems.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else if (deltaY < 0 && currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      resetAutoPlay();
      
      isScrolling = true;
      setTimeout(() => { isScrolling = false; }, 100);
      
      if (e.deltaY > 0 && currentSlide < portfolioItems.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      resetAutoPlay();
      
      if (e.key === 'ArrowDown' && currentSlide < portfolioItems.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, resetAutoPlay]);

  const currentItem = portfolioItems[currentSlide];

  return (
    <section 
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-gray-900 relative"
    >
      {/* Slide indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetAutoPlay();
            }}
            className={`block w-2 h-8 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="h-full w-full relative"
        >
          {/* Hero media background */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={currentItem.heroMedia.src}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white"
                >
                  <div className="mb-4">
                    <span className="inline-block bg-primary px-3 py-1 rounded-full text-sm font-medium">
                      {currentItem.category}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
                    {currentItem.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-6">
                    {currentItem.client}
                  </p>
                  
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    {currentItem.description}
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white group"
                  >
                    View Details
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                {/* Right content - Project details */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  {/* Problem */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Problem</h3>
                      <p className="text-white/80">{currentItem.problem}</p>
                    </CardContent>
                  </Card>

                  {/* Solution */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Solution</h3>
                      <p className="text-white/80">{currentItem.solution}</p>
                    </CardContent>
                  </Card>

                  {/* Results */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Results</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {currentItem.results.map((result, index) => (
                          <div key={index} className="text-white/80 text-sm">
                            • {result}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
            {isAutoPlaying && !userInteracted && (
              <motion.div
                key={`progress-${currentSlide}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-full bg-primary"
              />
            )}
          </div>

          {/* Slide counter */}
          <div className="absolute bottom-8 left-8 z-20 text-white">
            <span className="text-2xl font-bold">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="text-white/60"> / {String(portfolioItems.length).padStart(2, '0')}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation hints */}
      <div className="fixed bottom-8 right-1/2 transform translate-x-1/2 z-50 text-white/60 text-sm text-center">
        <div className="space-y-1">
          <div>Scroll or swipe to navigate</div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/30 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}