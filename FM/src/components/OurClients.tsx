import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  {
    name: "Airtel",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center",
    description: "Leading telecommunications provider"
  },
  {
    name: "Furtune",
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

export function OurClients() {
  return (
    <section className="py-16 md:py-24 bg-white">
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
            Trusted by <span className="text-primary">Leading Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with industry leaders who trust us to deliver 
            exceptional marketing results and drive their business growth.
          </p>
        </motion.div>

        {/* Clients grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                {/* Logo placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <span className="text-2xl font-bold text-primary">
                    {client.name.charAt(0)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {client.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                500+
              </motion.div>
              <div className="text-white/90">Projects Completed</div>
            </div>
            
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                150+
              </motion.div>
              <div className="text-white/90">Happy Clients</div>
            </div>
            
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                98%
              </motion.div>
              <div className="text-white/90">Success Rate</div>
            </div>
            
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                5+
              </motion.div>
              <div className="text-white/90">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}