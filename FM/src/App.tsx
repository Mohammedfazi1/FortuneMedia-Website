import { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Portfolio = lazy(() => import('./components/Portfolio').then(module => ({ default: module.Portfolio })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce initial loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    if (page === currentPage) return; // Prevent unnecessary re-renders
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const currentPageComponent = useMemo(() => {
    const LoadingSpinner = () => (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

    switch (currentPage) {
      case 'home':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        );
      case 'services':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
        );
      case 'portfolio':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Portfolio />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        );
    }
  }, [currentPage]);

  // Show footer on all pages, but with different styling for portfolio
  const footerVariant = useMemo(() => currentPage === 'portfolio' ? 'compact' : 'full', [currentPage]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold">Loading Fortune Media</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Main content */}
      <main className="w-full overflow-x-hidden">
        {currentPageComponent}
      </main>
      
      {/* Footer - Show on all pages with different variants */}
      <Footer onNavigate={handleNavigate} variant={footerVariant} />
       <SpeedInsights />
    </div>
  );
}