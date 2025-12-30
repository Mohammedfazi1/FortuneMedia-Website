import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';

// ✅ Correct lazy imports (default exports only)
const Home = lazy(() => import('./components/Home'));
const Services = lazy(() => import('./components/Services'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const ServiceFilter = lazy(() => import('./components/ServiceFilter'));
const Contact = lazy(() => import('./components/Contact'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentPath = location.pathname;

  const currentPage =
    currentPath === '/'
      ? 'home'
      : currentPath.startsWith('/services')
      ? 'services'
      : currentPath === '/ServiceFilter'
      ? 'ServiceFilter'
      : currentPath === '/contact'
      ? 'contact'
      : 'home';

  const footerVariant = currentPage === 'ServiceFilter' ? 'compact' : 'full';

  return (
    <div className="min-h-screen bg-white w-full">
      <Navigation currentPage={currentPage} />

      <main className="w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/ServiceFilter" element={<ServiceFilter />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer
        variant={footerVariant}
        onNavigate={(path) => navigate(path)}
      />

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