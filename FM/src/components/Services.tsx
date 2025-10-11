import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Gift, 
  Monitor, 
  Workflow, 
  MapPin, 
  Building, 
  Shield, 
  Square,
  ChevronDown,
  Check,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const services = [
  {
    id: 'rickshaw-ads',
    title: 'Rickshaw Autotop Ads',
    icon: Car,
    description: 'Mobile advertising solutions that move with your audience',
    image: 'https://images.unsplash.com/photo-1613053745430-553b050dd3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBiaWxsYm9hcmR8ZW58MXx8fHwxNzU4MDAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'High visibility in urban areas',
      'Mobile advertising reach',
      'Cost-effective solution',
      'Targeted route planning'
    ],
    benefits: [
      'Maximum exposure during peak hours',
      'Reaches diverse demographics',
      'Flexible campaign duration',
      'Real-time location tracking'
    ],
    pricing: 'Starting from ₹5,000/month'
  },
  {
    id: 'gift-articles',
    title: 'Gift Articles',
    icon: Gift,
    description: 'Branded promotional items that create lasting impressions',
    image: 'https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZ2VuY3klMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODEwNTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Custom branded merchandise',
      'Quality promotional products',
      'Corporate gift solutions',
      'Event marketing materials'
    ],
    benefits: [
      'Long-term brand recall',
      'Tangible brand connection',
      'Customer loyalty building',
      'Word-of-mouth marketing'
    ],
    pricing: 'Starting from ₹100/piece'
  },
  {
    id: 'led-displays',
    title: 'LED Displays',
    icon: Monitor,
    description: 'Dynamic digital displays for maximum visual impact',
    image: 'https://images.unsplash.com/photo-1585504303098-9785dc784742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBkaXNwbGF5JTIwZGlnaXRhbCUyMGFkdmVydGlzaW5nfGVufDF8fHx8MTc1ODEwNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'High-resolution displays',
      'Dynamic content capability',
      'Weather-resistant design',
      'Remote content management'
    ],
    benefits: [
      'Eye-catching visual appeal',
      'Real-time content updates',
      'Multiple campaign flexibility',
      '24/7 advertising presence'
    ],
    pricing: 'Starting from ₹50,000/month'
  },
  {
    id: 'gantry-arches',
    title: 'Gantry Arches',
    icon: Workflow,
    description: 'Prominent overhead advertising structures on highways',
    image: 'https://images.unsplash.com/photo-1669348141071-9eae9ac4224e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzU4MTA1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Strategic highway placement',
      'Large format visibility',
      'High-traffic exposure',
      'Professional installation'
    ],
    benefits: [
      'Massive audience reach',
      'Premium brand positioning',
      'Long-distance visibility',
      'Memorable brand presence'
    ],
    pricing: 'Starting from ₹1,00,000/month'
  },
  {
    id: 'center-medians',
    title: 'Center Medians',
    icon: MapPin,
    description: 'Strategic roadside advertising on traffic medians',
    image: 'https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU4MDc0NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Prime location positioning',
      'Dual-side visibility',
      'Traffic light advantage',
      'Illuminated options available'
    ],
    benefits: [
      'Captive audience attention',
      'High dwell time exposure',
      'Cost-effective placement',
      'Urban market penetration'
    ],
    pricing: 'Starting from ₹25,000/month'
  },
  {
    id: 'ac-traffic-booth',
    title: 'AC Traffic Booth',
    icon: Building,
    description: 'Climate-controlled advertising booths at traffic points',
    image: 'https://images.unsplash.com/photo-1613053745430-553b050dd3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBiaWxsYm9hcmR8ZW58MXx8fHwxNzU4MDAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Climate-controlled environment',
      'Interactive displays',
      'Multi-media capabilities',
      'Strategic traffic locations'
    ],
    benefits: [
      'Premium brand association',
      'Extended viewing time',
      'Interactive engagement',
      'Weather-independent display'
    ],
    pricing: 'Starting from ₹75,000/month'
  },
  {
    id: 'barricades',
    title: 'Barricades',
    icon: Shield,
    description: 'Temporary advertising solutions for events and construction',
    image: 'https://images.unsplash.com/photo-1585504303098-9785dc784742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBkaXNwbGF5JTIwZGlnaXRhbCUyMGFkdmVydGlzaW5nfGVufDF8fHx8MTc1ODEwNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Portable advertising units',
      'Event-specific placement',
      'Customizable designs',
      'Quick deployment'
    ],
    benefits: [
      'Flexible advertising solution',
      'Event-targeted marketing',
      'Cost-effective short-term ads',
      'High visibility placement'
    ],
    pricing: 'Starting from ₹2,000/day'
  },
  {
    id: 'hoarding',
    title: 'Hoarding',
    icon: Square,
    description: 'Traditional large-format outdoor advertising billboards',
    image: 'https://images.unsplash.com/photo-1669348141071-9eae9ac4224e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzU4MTA1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Large format displays',
      'Strategic location placement',
      'High-quality printing',
      'Illumination options'
    ],
    benefits: [
      'Maximum brand visibility',
      'Long-term brand exposure',
      'Wide audience reach',
      'Established advertising medium'
    ],
    pricing: 'Starting from ₹30,000/month'
  }
];

const ServicesComponent = React.memo(() => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = React.useCallback((serviceId: string) => {
    setExpandedService((prev: string | null) => prev === serviceId ? null : serviceId);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive outdoor advertising solutions tailored to maximize your brand's 
            visibility and impact across diverse urban landscapes.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <Card className={`cursor-pointer border-2 transition-all duration-300 h-full ${
                  isExpanded 
                    ? 'border-primary shadow-2xl' 
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-lg'
                }`}>
                  <CardContent className="p-0">
                    {/* Service header */}
                    <div 
                      className="p-6 flex items-center justify-between"
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </div>
                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t border-gray-200">
                            <div className="grid lg:grid-cols-2 gap-8 p-6">
                              {/* Image */}
                              <div className="order-2 lg:order-1">
                                <ImageWithFallback
                                  src={service.image}
                                  alt={service.title}
                                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                                  loading="lazy"
                                />
                              </div>

                              {/* Details */}
                              <div className="order-1 lg:order-2 space-y-6">
                                {/* Features */}
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                    Key Features
                                  </h4>
                                  <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center space-x-2">
                                        <Check className="h-4 w-4 text-primary" />
                                        <span className="text-gray-600">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Benefits */}
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                    Benefits
                                  </h4>
                                  <ul className="space-y-2">
                                    {service.benefits.map((benefit, idx) => (
                                      <li key={idx} className="flex items-center space-x-2">
                                        <Check className="h-4 w-4 text-primary" />
                                        <span className="text-gray-600">{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Pricing */}
                                <div className="bg-primary/10 rounded-lg p-4">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Pricing
                                  </h4>
                                  <p className="text-primary text-xl font-bold">
                                    {service.pricing}
                                  </p>
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <Button className="bg-primary hover:bg-primary/90 text-white group">
                                    Get Quote
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                  <Button variant="outline">
                                    Learn More
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your advertising goals and create a customized solution 
            that delivers maximum impact for your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Start Your Campaign
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ServicesComponent.displayName = 'Services';

export const Services = ServicesComponent;