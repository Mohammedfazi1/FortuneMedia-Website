import React from 'react';
import { X, Phone, MessageCircle, Mail, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '../../data/servicesData';
import { Button } from '../ui/button';

interface ServiceDetailsPanelProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailsPanel: React.FC<ServiceDetailsPanelProps> = ({
  service,
  isOpen,
  onClose
}) => {
  if (!service) return null;

  const handleCall = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${service.name} advertising service. Please provide more details.`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleEnquiry = () => {
    const subject = encodeURIComponent(`Enquiry for ${service.name}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in your ${service.name} advertising service. Please provide more information about pricing and availability.\n\nThank you.`);
    window.open(`mailto:info@fortunemedia.com?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-64 lg:h-80 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/placeholder-service.jpg';
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            service.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {service.available ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Coverage</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">Regions</p>
                              <p className="text-gray-600">{service.regions.join(', ')}</p>
                            </div>
                          </div>
                          {service.locations.length > 0 && (
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium text-gray-900">Locations</p>
                                <p className="text-gray-600">{service.locations.join(', ')}</p>
                              </div>
                            </div>
                          )}
                          {service.subLocations.length > 0 && (
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium text-gray-900">Sub-locations</p>
                                <p className="text-gray-600">{service.subLocations.join(', ')}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <span className="text-lg font-semibold text-primary">{service.pricing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleCall}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
                    disabled={!service.available}
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600"
                    disabled={!service.available}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </Button>
                  <Button
                    onClick={handleEnquiry}
                    variant="outline"
                    className="flex-1 flex items-center justify-center space-x-2"
                    disabled={!service.available}
                  >
                    <Mail className="h-5 w-5" />
                    <span>Enquiry</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};