import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { Button } from './ui/button';

const footerLinks = {
  services: [
    'Rickshaw Autotop Ads',
    'Gift Articles',
    'LED Displays',
    'Gantry Arches',
    'Center Medians',
    'AC Traffic Booth',
    'Barricades',
    'Hoarding'
  ],
  company: [
    'About Us',
    'Our Team',
    'Careers',
    'News & Media',
    'Case Studies',
    'Testimonials'
  ],
  support: [
    'Contact Support',
    'Documentation',
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'FAQ'
  ]
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61581897277789', label: 'Facebook' },
  { icon: Twitter, href: 'https://x.com/FmtcSocial68566', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/fmtcsocial/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
];

interface FooterProps {
  onNavigate: (page: string) => void;
  variant?: 'full' | 'compact';
}

const FooterComponent = React.memo(({ onNavigate, variant = 'full' }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wrap navigation with scroll
  const handleNavigation = (page: string) => {
    onNavigate(page);
    scrollToTop();
  };

  // Compact footer for portfolio page
  if (variant === 'compact') {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo and copyright */}
            <div className="flex items-center space-x-4">
              <img
                src="/assets/Fortune-Logo.png"
                alt="Fortune Media"
                className="h-8 w-auto"
              />
              <span className="text-gray-400 text-sm hidden sm:block">© 2024 All rights reserved.</span>
            </div>

            {/* Social links and back to top */}
            <div className="flex items-center space-x-4">
              {/* Social links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
              
              {/* Back to top button */}
              <Button
                onClick={scrollToTop}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full"
                aria-label="Back to top"
                size="sm"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile copyright */}
          <div className="text-center text-gray-400 text-sm mt-4 sm:hidden">
            © 2024 Fortune Media. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to top button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="mb-6">
                <img
                  src="/assets/Fortune-Logo.png"
                  alt="Fortune Media"
                  className="h-12 w-auto"
                />
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming brands through innovative marketing solutions and creative excellence. 
                We specialize in outdoor advertising that captures attention and drives results.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">
                    EMERALD APARTMENTS, 3RD FLOOR, BEHIND KTM CHAMBERS, 19 WHEAT CROFT ROAD, NUNGAMBAKKAM, CHENNAI 600 034
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="https://wa.me/919840055603" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    9840055603
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="mailto:mustafa.fmtc@gmail.com"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    mustafa.fmtc@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleNavigation('services')}
                    className="text-gray-300 hover:text-primary transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavigation('home')}
                    className="text-gray-300 hover:text-primary transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavigation('contact')}
                    className="text-gray-300 hover:text-primary transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div>
          <div className="md:flex md:items-center md:justify-between">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Fortune Media. All rights reserved.
              </p>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

FooterComponent.displayName = 'Footer';

export const Footer = FooterComponent;
