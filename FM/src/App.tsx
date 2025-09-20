import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

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
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'services':
        return <Services />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  }, [currentPage]);

  const shouldShowFooter = useMemo(() => currentPage !== 'portfolio', [currentPage]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold">Loading Furtune Media</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Main content */}
      <main className="w-full">
        {currentPageComponent}
      </main>
      
      {/* Footer - Only show on non-portfolio pages */}
      {shouldShowFooter && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}