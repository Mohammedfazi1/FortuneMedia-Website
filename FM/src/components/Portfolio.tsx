import { motion } from 'framer-motion';
import { Settings, Monitor, Sparkles, Code, Palette, Rocket } from 'lucide-react';

const Portfolio = () => {
  return (
    <section className="pt-18 pb-16 md:pt-26 md:pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Settings className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our finest work and creative solutions that deliver maximum impact for our clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Monitor className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            We're crafting an extraordinary portfolio experience to showcase our finest work. 
            Expect cutting-edge design, innovative features, and stunning visuals.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-green-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <p className="text-green-700 font-semibold text-lg">Design</p>
              <p className="text-green-600 text-sm">Complete</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mx-auto mb-3" />
              <p className="text-yellow-700 font-semibold text-lg">Development</p>
              <p className="text-yellow-600 text-sm">In Progress</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div className="w-3 h-3 bg-blue-300 rounded-full mx-auto mb-3" />
              <p className="text-blue-700 font-semibold text-lg">Testing</p>
              <p className="text-blue-600 text-sm">Upcoming</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-purple-50 rounded-2xl p-6 border border-purple-200"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="w-3 h-3 bg-purple-300 rounded-full mx-auto mb-3" />
              <p className="text-purple-700 font-semibold text-lg">Launch</p>
              <p className="text-purple-600 text-sm">Preparation</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What to Expect</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Interactive Design</h4>
              <p className="text-gray-600">Engaging animations and smooth transitions that bring our work to life</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Responsive Layout</h4>
              <p className="text-gray-600">Perfect viewing experience across all devices and screen sizes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Fast Performance</h4>
              <p className="text-gray-600">Lightning-fast loading times with optimized images and code</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Coming Soon</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our portfolio showcase is under development. Stay tuned for an amazing collection of our work.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Something amazing is coming</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Portfolio };