import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: TrendingUp,
    title: "Growth-Driven Marketing",
    description: "Data-driven strategies that deliver measurable results and accelerate business growth."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Seasoned professionals with deep industry knowledge and creative expertise."
  },
  {
    icon: Award,
    title: "Award-Winning Campaigns",
    description: "Recognized excellence in creating impactful marketing campaigns that resonate."
  }
];

const benefits = [
  "360° Marketing Solutions",
  "ROI-Focused Strategies",
  "Creative Excellence",
  "Data-Driven Insights",
  "24/7 Support",
  "Scalable Solutions"
];

const LandingPageComponent = React.memo(() => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Marketing That <span className="text-primary">Delivers Results</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We combine creativity with strategy to build powerful marketing campaigns 
              that connect with your audience and drive meaningful business outcomes.
            </p>

            {/* Benefits checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fortune Media Team"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border"
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

LandingPageComponent.displayName = 'LandingPage';

export const LandingPage = LandingPageComponent;