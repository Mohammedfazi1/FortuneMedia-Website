import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Monitor, 
  Workflow, 
  MapPin, 
  Building, 
  Shield, 
  Square,
  ChevronDown,
  Check,
  Zap,
  Home,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const services = [
  {
    id: 'traffic-sunshade-barricade',
    title: 'Traffic Sunshade Barricade Advertisement',
    icon: Shield,
    description: 'Strategic advertising on traffic sunshade barricades for maximum visibility',
    image: '/assets/Traffic_SunshadeBarricade.png',
    features: [
      'High visibility at traffic points',
      'Weather-resistant materials',
      'Strategic placement locations',
      'Cost-effective advertising'
    ],
    benefits: [
      'Maximum exposure during traffic stops',
      'Reaches commuters daily',
      'Long viewing duration',
      'Urban market penetration'
    ],
    pricing: 'Starting from ₹8,000/month'
  },
  {
    id: 'billboard-hoardings',
    title: 'Billboard / Hoardings Advertisement',
    icon: Square,
    description: 'Traditional large-format outdoor advertising billboards',
    image: '/assets/Hero-Section.png',
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
  },
  {
    id: 'auto-rickshaw',
    title: 'Auto Rickshaw Advertisement',
    icon: Car,
    description: 'Mobile advertising solutions that move with your audience',
    image: '/assets/Auto_Rickshaw.jpeg',
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
    id: 'traffic-police-booth',
    title: 'Traffic Police Booth Advertisement',
    icon: Building,
    description: 'Strategic advertising on traffic police booths at key intersections',
    image: '/assets/Traffic_PoliceBooth.png',
    features: [
      'Prime intersection locations',
      'High traffic visibility',
      'Authority association',
      'Professional appearance'
    ],
    benefits: [
      'Captive audience attention',
      'Trust and credibility boost',
      'Extended viewing time',
      'Strategic urban placement'
    ],
    pricing: 'Starting from ₹15,000/month'
  },
  {
    id: 'pole-kiosk',
    title: 'Pole Kiosk Advertisement',
    icon: MapPin,
    description: 'Vertical advertising displays on street poles and kiosks',
    image: '/assets/Pole_Kiosk.png',
    features: [
      'Vertical display format',
      'Street-level visibility',
      'Multiple location options',
      'Weather-resistant design'
    ],
    benefits: [
      'Pedestrian-focused advertising',
      'Cost-effective placement',
      'High frequency exposure',
      'Urban landscape integration'
    ],
    pricing: 'Starting from ₹12,000/month'
  },
  {
    id: 'center-median-barricade',
    title: 'Center Median Barricade Advertisement',
    icon: Shield,
    description: 'Strategic roadside advertising on traffic median barricades',
    image: '/assets/Center_MedianBarricade.png',
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
    id: 'center-median-barricade-2',
    title: 'Center Median Barricade Advertisement',
    icon: Shield,
    description: 'Additional strategic roadside advertising on traffic median barricades',
    image: '/assets/Center_MedianBarricade.png',
    features: [
      'Extended coverage areas',
      'Multiple format options',
      'High-impact positioning',
      'Professional installation'
    ],
    benefits: [
      'Increased brand frequency',
      'Comprehensive market coverage',
      'Enhanced visibility',
      'Strategic campaign support'
    ],
    pricing: 'Starting from ₹25,000/month'
  },
  {
    id: 'led-display',
    title: 'LED Display Advertisement',
    icon: Monitor,
    description: 'Dynamic digital displays for maximum visual impact',
    image: '/assets/LED_Display.png',
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
    id: 'bus-shelter',
    title: 'Bus Shelter Advertisement',
    icon: Home,
    description: 'Strategic advertising at bus stops and transit shelters',
    image: '/assets/Bus_Shelter.png',
    features: [
      'High-traffic transit locations',
      'Extended viewing time',
      'Weather protection',
      'Illuminated display options'
    ],
    benefits: [
      'Captive commuter audience',
      'Daily repeat exposure',
      'Demographic targeting',
      'Cost-effective reach'
    ],
    pricing: 'Starting from ₹20,000/month'
  },
  {
    id: 'unipole-cantilever',
    title: 'UniPole & Cantilever Advertisement',
    icon: Zap,
    description: 'High-impact vertical advertising structures for maximum visibility',
    image: '/assets/UniPole.png',
    features: [
      'Towering height advantage',
      'Long-distance visibility',
      'Premium positioning',
      'Landmark status potential'
    ],
    benefits: [
      'Massive audience reach',
      'Brand dominance display',
      'Highway and city visibility',
      'Premium brand association'
    ],
    pricing: 'Starting from ₹80,000/month'
  },
  {
    id: 'gantry-arch',
    title: 'Gantry Arch Advertisement',
    icon: Workflow,
    description: 'Prominent overhead advertising structures on highways',
    image: '/assets/Gantry_Arch.png',
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
    id: 'fob-advertisement',
    title: 'FOB (Foot Over Bridge) Advertisement',
    icon: Building2,
    description: 'Strategic advertising on foot over bridges for pedestrian visibility',
    image: '/assets/FOB.png',
    features: [
      'Elevated positioning',
      'Pedestrian-focused visibility',
      'High-traffic crossing points',
      'Multiple viewing angles'
    ],
    benefits: [
      'Captive pedestrian audience',
      'Extended viewing duration',
      'Strategic urban placement',
      'Cost-effective pedestrian reach'
    ],
    pricing: 'Starting from ₹35,000/month'
  }
];

const ServicesComponent = React.memo(() => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const navigate = useNavigate();
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleService = useCallback((serviceId: string) => {
    setExpandedService((prev: string | null) => prev === serviceId ? null : serviceId);
  }, []);

  const handleLearnMore = useCallback((serviceId: string) => {
    navigate(`/services/${serviceId}`);
  }, [navigate]);

  return (
    <section className="pt-16 pb-8 md:pt-26 md:pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-4 md:mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Comprehensive outdoor advertising solutions tailored to maximize your brand's 
            visibility and impact across diverse urban landscapes.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {services.map((service, index) => {
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                ref={(el) => { cardRefs.current[service.id] = el; }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isExpanded ? 'col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-3' : ''}`}
              >
                <Card className={`cursor-pointer border-2 transition-all duration-300 h-full ${
                  isExpanded 
                    ? 'border-primary shadow-2xl' 
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-lg'
                }`}>
                  <CardContent className="p-0">
                    {/* Service header */}
                    <div 
                      className="p-3 md:p-6 flex flex-col md:flex-row md:items-center justify-between"
                      onClick={() => toggleService(service.id)}
                    >
                      {/* Mobile: Image on top, Desktop: Image on left */}
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 flex-1">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-24 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0 mb-2 md:mb-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs md:text-xl font-semibold text-gray-900 leading-tight mb-1">
                            {service.title}
                          </h3>
                          <p className="text-[10px] md:text-base text-gray-600 line-clamp-2 md:line-clamp-none">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="self-end md:self-center mt-2 md:mt-0 md:ml-2 flex-shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
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
                            <div className="p-4 md:p-6">
                              {/* Details */}
                              <div className="space-y-4">
                                {/* Features & Benefits in 2 columns */}
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                                      Key Features
                                    </h4>
                                    <ul className="space-y-1">
                                      {service.features.slice(0, 3).map((feature, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                          <Check className="h-3 w-3 text-primary" />
                                          <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                                      Benefits
                                    </h4>
                                    <ul className="space-y-1">
                                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                          <Check className="h-3 w-3 text-primary" />
                                          <span className="text-sm text-gray-600">{benefit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Pricing & CTA */}
                                <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3">
                                  <div>
                                    <p className="text-sm text-gray-600">Starting from</p>
                                    <p className="text-primary text-lg font-bold">{service.pricing}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                                      Get Quote
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => handleLearnMore(service.id)}
                                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                                    >
                                      Learn More
                                    </Button>
                                  </div>
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
          className="text-center mt-8 md:mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-12 text-white"
        >
          <h2 className="text-2xl md:text-4xl mb-3 md:mb-4">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Let's discuss your advertising goals and create a customized solution 
            that delivers maximum impact for your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
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