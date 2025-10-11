import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NavigationComponent = React.memo(({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const socialLinks = [
    { id: 'facebook', icon: <Facebook className="h-5 w-5" />, url: 'https://www.facebook.com/profile.php?id=61581897277789' },
    { id: 'instagram', icon: <Instagram className="h-5 w-5" />, url: 'https://www.instagram.com/fmtcsocial/' },
    { id: 'twitter', icon: <Twitter className="h-5 w-5" />, url: 'https://x.com/FmtcSocial68566' },
    { id: 'linkedin', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com' },
  ];

  // Dark theme logic
  const needsDarkTheme =
  currentPage === 'services' ||
  currentPage === 'contact' ||
  currentPage === 'portfolio' || // 👈 add this line
  isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        needsDarkTheme 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/assets/Fortune-Logo.png"
              alt="Fortune Media"
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? needsDarkTheme 
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white border-b-2 border-white'
                      : needsDarkTheme
                      ? 'text-gray-700 hover:text-primary'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Social Icons (Desktop) */}
            <div className="flex items-center space-x-4 ml-6">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    needsDarkTheme ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${
                needsDarkTheme 
                  ? 'text-gray-700 hover:text-primary hover:bg-gray-100' 
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
            style={{ maxHeight: isOpen ? '400px' : '0px' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-w-full">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    currentPage === item.id
                      ? 'text-primary bg-primary/10 border-l-4 border-primary'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Social Icons (Mobile) */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

NavigationComponent.displayName = 'Navigation';

export const Navigation = NavigationComponent;
