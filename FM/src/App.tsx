import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const Portfolio = lazy(() => import('./components/Portfolio').then(module => ({ default: module.Portfolio })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Determine current page for navigation highlighting
  const getCurrentPage = () => {
    if (currentPath === '/') return 'home';
    if (currentPath.startsWith('/services')) return 'services';
    if (currentPath === '/portfolio') return 'portfolio';
    if (currentPath === '/contact') return 'contact';
    return 'home';
  };

  const currentPage = getCurrentPage();
  const footerVariant = currentPage === 'portfolio' ? 'compact' : 'full';

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Navigation */}
      <Navigation currentPage={currentPage} />
      
      {/* Main content */}
      <main className="w-full overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer variant={footerVariant} />
      <SpeedInsights />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}