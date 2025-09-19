import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Marketing Director",
    company: "Airtel",
    content: "Furtune Media transformed our brand presence with their innovative outdoor advertising campaigns. The ROI exceeded our expectations by 300%.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "CEO",
    company: "TechCorp",
    content: "The team's creative approach and strategic thinking helped us reach new audiences. Their LED display campaigns generated unprecedented engagement.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3c0?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Brand Manager",
    company: "GlobalRetail",
    content: "Working with Furtune Media was a game-changer. Their comprehensive approach to outdoor advertising delivered results beyond our wildest dreams.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    position: "Marketing Head",
    company: "UrbanDev",
    content: "The creativity and professionalism of the Furtune Media team is unmatched. They turned our vision into reality with stunning visual campaigns.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToTestimonial(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    goToTestimonial(newIndex);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say 
            about their experience working with Furtune Media.
          </p>
        </motion.div>

        {/* Main testimonial display */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    {/* Quote icon */}
                    <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-20" />
                    
                    {/* Rating */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    {/* Testimonial content */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    
                    {/* Author info */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <span className="text-xl font-semibold text-primary">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonials[currentIndex].position}
                        </p>
                        <p className="text-primary font-medium">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl border p-3 rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl border p-3 rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All testimonials grid (mobile) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => goToTestimonial(index)}
            >
              <Card className={`h-full border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-primary shadow-lg' 
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </h5>
                      <p className="text-gray-600 text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}