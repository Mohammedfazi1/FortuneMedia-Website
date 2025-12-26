import React, { lazy, Suspense } from 'react';
import { VideoHero } from './VideoHero';

// Lazy load non-critical components
const ImageSlider = lazy(() => import('./ImageSlider').then(module => ({ default: module.ImageSlider })));
const LandingPage = lazy(() => import('./LandingPage').then(module => ({ default: module.LandingPage })));
const OurClients = lazy(() => import('./OurClients').then(module => ({ default: module.OurClients })));
const Testimonials = lazy(() => import('./Testimonials').then(module => ({ default: module.Testimonials })));


const HomeComponent = React.memo(() => {
  const LoadingSkeleton = () => (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mx-4 my-8"></div>
  );

  return (
    <div className="w-full overflow-x-hidden">
      {/* Video Background Hero Section - Critical, load immediately */}
      <VideoHero />
      
      {/* Image Slider Section - Lazy loaded */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ImageSlider />
      </Suspense>
      
      {/* Landing Page Content - Lazy loaded */}
      <Suspense fallback={<LoadingSkeleton />}>
        <LandingPage />
      </Suspense>
      
      {/* Our Clients Section - Lazy loaded */}
      <Suspense fallback={<LoadingSkeleton />}>
        <OurClients />
      </Suspense>
      
      {/* Testimonials Section - Lazy loaded */}
      <Suspense fallback={<LoadingSkeleton />}>
        <Testimonials />
      </Suspense>
    </div>
  );
});

HomeComponent.displayName = 'Home';

export const Home = HomeComponent;