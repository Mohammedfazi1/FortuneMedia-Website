import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const clients = [
  {
    name: "Airtel",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center",
    description: "Leading telecommunications provider"
  },
  {
    name: "Fortune",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
    description: "Financial services excellence"
  },
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center",
    description: "Innovation in technology"
  },
  {
    name: "GlobalRetail",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
    description: "Retail chain expansion"
  },
  {
    name: "UrbanDev",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center",
    description: "Real estate development"
  },
  {
    name: "HealthPlus",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
    description: "Healthcare solutions"
  }
];

// Memoized client card component for better performance
const ClientCard = React.memo(({ client, index }) => (
  <motion.div
    key={`${client.name}-${index}`}
    whileHover={{ 
      scale: 1.05,
      y: -5
    }}
    transition={{ 
      duration: 0.2,
      ease: "easeOut"
    }}
    className="group cursor-pointer flex-shrink-0 w-72"
  >
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center text-center group-hover:border-blue-300 will-change-transform">
      {/* Logo placeholder with GPU acceleration */}
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-100 transition-colors duration-200 transform-gpu">
        <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200 transform-gpu">
          {client.name.charAt(0)}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {client.name}
      </h3>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        {client.description}
      </p>
      
      {/* Optimized animation indicator */}
      <div className="mt-4 w-8 h-1 bg-blue-100 rounded-full group-hover:bg-blue-600 group-hover:w-12 transition-all duration-200"></div>
    </div>
  </motion.div>
));

ClientCard.displayName = 'ClientCard';

// Memoized stats item component
const StatsItem = React.memo(({ value, label, delay }) => (
  <div>
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="text-3xl md:text-4xl font-bold mb-2"
    >
      {value}
    </motion.div>
    <div className="text-white/80">{label}</div>
  </div>
));

StatsItem.displayName = 'StatsItem';

const OurClientsComponent = React.memo(() => {
  // Memoize duplicated clients to prevent recreation on every render
  const duplicatedClients = useMemo(() => [...clients, ...clients], []);

  // Memoize animation configuration
  const scrollAnimation = useMemo(() => ({
    x: [0, `-${100 / 2}%`], // Only move half the distance since we duplicated
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30, // Slightly slower for smoother performance
        ease: "linear",
      },
    }
  }), []);

  // Memoize stats data
  const statsData = useMemo(() => [
    { value: "500+", label: "Projects Completed", delay: 0.1 },
    { value: "150+", label: "Happy Clients", delay: 0.2 },
    { value: "98%", label: "Success Rate", delay: 0.3 },
    { value: "5+", label: "Years Experience", delay: 0.4 }
  ], []);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
            Trusted by <span className="text-blue-600">Leading Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with industry leaders who trust us to deliver 
            exceptional marketing results and drive their business growth.
          </p>
        </motion.div>

        {/* Horizontal scrolling clients */}
        <div className="relative">
          {/* Optimized gradient overlays using CSS gradients */}
          <div className="absolute left-0 top-0 w-20 h-full z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          <div className="absolute right-0 top-0 w-20 h-full z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent"></div>
          
          <div className="flex overflow-hidden">
            <motion.div
              animate={scrollAnimation.x}
              transition={scrollAnimation.transition}
              className="flex gap-8 will-change-transform"
              style={{ 
                width: 'max-content',
                backfaceVisibility: 'hidden', // Prevents flickering
                perspective: 1000 // Enables 3D hardware acceleration
              }}
            >
              {duplicatedClients.map((client, index) => (
                <ClientCard
                  key={`${client.name}-${index}`}
                  client={client}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Optimized stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 bg-black rounded-3xl p-8 md:p-12 text-white relative overflow-hidden will-change-transform"
        >
          {/* Static background patterns - no animation for better performance */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <StatsItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={stat.delay}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

OurClientsComponent.displayName = 'OurClients';

export const OurClients = OurClientsComponent;