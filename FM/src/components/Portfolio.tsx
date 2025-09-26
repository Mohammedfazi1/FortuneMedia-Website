import { motion } from 'framer-motion';
import { Settings, Monitor, Sparkles, Code, Palette, Rocket } from 'lucide-react';

const Portfolio = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white pt-24 pb-16 overflow-y-auto">
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center max-w-5xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Settings className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight">
              Portfolio
            </h1>
            <p className="text-3xl md:text-4xl text-gray-600 font-light mb-4">
              Under Development
            </p>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-500">
              <Sparkles className="w-5 h-5" />
              <span>Something amazing is coming</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Monitor className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">
                Coming Soon
              </h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
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
          
          {/* Additional Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">What to Expect</h3>
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
          
          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Development Timeline</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">Q1</span>
                </div>
                <h4 className="font-semibold mb-2">Research & Planning</h4>
                <p className="text-white/80 text-sm">User research, wireframing, and technical planning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">Q2</span>
                </div>
                <h4 className="font-semibold mb-2">Design & Prototyping</h4>
                <p className="text-white/80 text-sm">Visual design, prototyping, and user testing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 font-bold">Q3</span>
                </div>
                <h4 className="font-semibold mb-2">Development</h4>
                <p className="text-white/80 text-sm">Frontend development and backend integration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">Q4</span>
                </div>
                <h4 className="font-semibold mb-2">Launch</h4>
                <p className="text-white/80 text-sm">Testing, optimization, and final launch</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Portfolio };