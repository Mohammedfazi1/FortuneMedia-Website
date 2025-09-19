import React from 'react';
import { VideoHero } from './VideoHero';
import { ImageSlider } from './ImageSlider';
import { LandingPage } from './LandingPage';
import { OurClients } from './OurClients';
import { Testimonials } from './Testimonals';

export function Home() {
  return (
    <div className="w-full">
      {/* Video Background Hero Section */}
      <VideoHero />
      
      {/* Image Slider Section */}
      <ImageSlider />
      
      {/* Landing Page Content */}
      <LandingPage />
      
      {/* Our Clients Section */}
      <OurClients />
      
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}