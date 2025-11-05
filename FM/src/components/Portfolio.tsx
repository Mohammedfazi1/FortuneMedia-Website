import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, MessageCircle, RotateCcw, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { servicesData } from '../data/servicesData';
import type { Service, ServiceWithLocation } from '../data/servicesData';

type AvailabilityKey = 'available' | 'available_soon' | 'not_available';

const Portfolio = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState<ServiceWithLocation[]>([]);

  const cities = Object.keys(servicesData);
  const locations = selectedCity ? Object.keys(servicesData[selectedCity]) : [];

  const availabilityConfig = {
    available: { color: 'bg-green-500', text: 'Available', description: 'Ready for Advertisement' },
    available_soon: { color: 'bg-orange-500', text: 'Available Soon', description: 'Structure installation pending' },
    not_available: { color: 'bg-red-500', text: 'Not Available', description: 'Currently occupied' }
  };

  useEffect(() => {
    let services: ServiceWithLocation[] = [];
    
    if (selectedCity) {
      if (selectedLocation) {
        services = servicesData[selectedCity][selectedLocation].map((service: Service) => ({
          ...service,
          city: selectedCity,
          location: selectedLocation,
          id: `${selectedCity}-${selectedLocation}-${service.service}`
        }));
      } else {
        Object.keys(servicesData[selectedCity]).forEach(location => {
          servicesData[selectedCity][location].forEach((service: Service) => {
            services.push({
              ...service,
              city: selectedCity,
              location,
              id: `${selectedCity}-${location}-${service.service}`
            });
          });
        });
      }
    } else {
      Object.keys(servicesData).forEach(city => {
        Object.keys(servicesData[city]).forEach(location => {
          servicesData[city][location].forEach((service: Service) => {
            services.push({
              ...service,
              city,
              location,
              id: `${city}-${location}-${service.service}`
            });
          });
        });
      });
    }

    if (availabilityFilter) {
      services = services.filter((service: ServiceWithLocation) => service.availability === availabilityFilter);
    }

    setFilteredServices(services);
  }, [selectedCity, selectedLocation, availabilityFilter]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices((prev: string[]) => 
      prev.includes(serviceId) 
        ? prev.filter((id: string) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const resetFilters = () => {
    setSelectedCity('');
    setSelectedLocation('');
    setAvailabilityFilter('');
    setSelectedServices([]);
  };

  const submitToWhatsApp = () => {
    if (selectedServices.length === 0) return;
    
    const selectedData = filteredServices.filter(service => selectedServices.includes(service.id));
    const cities = [...new Set(selectedData.map(s => s.city))];
    const locations = [...new Set(selectedData.map(s => s.location))];
    const availabilities = [...new Set(selectedData.map(s => s.availability))];
    const services = selectedData.map(s => s.service);
    
    const message = `Hello, I'm interested in:\nCity: ${cities.join(', ')}\nLocations: ${locations.join(', ')}\nAvailability: ${availabilities.join(', ')}\nServices: ${services.join(', ')}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919840055603?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="pt-18 pb-16 md:pt-26 md:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Service <span className="text-blue-600">Locations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and book advertising services across multiple cities and locations
          </p>
        </motion.div>

        {/* Availability Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {Object.entries(availabilityConfig).map(([key, config]) => (
            <Button
              key={key}
              onClick={() => setAvailabilityFilter(availabilityFilter === key ? '' : key)}
              className={`${config.color} hover:opacity-80 text-white ${
                availabilityFilter === key ? 'ring-4 ring-blue-300' : ''
              }`}
            >
              {config.text}
            </Button>
          ))}
          <Button onClick={resetFilters} variant="outline" className="border-gray-300">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white shadow-lg lg:shadow-none p-6 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button onClick={() => setSidebarOpen(false)} variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedLocation('');
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  disabled={!selectedCity}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <Button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredServices.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No services found matching your criteria</p>
                </div>
              ) : (
                filteredServices.map((service) => {
                  const config = availabilityConfig[service.availability as AvailabilityKey];
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.service}</h3>
                          <div className="flex items-center text-gray-600 mb-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.city}</span>
                          </div>
                          <p className="text-sm text-gray-600">{service.location}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceSelect(service.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${config.color}`}>
                          {config.text}
                        </div>
                        <p className="text-sm text-gray-600">{config.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Available by: {service.available_by}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Submit Button */}
            {selectedServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 right-6 lg:relative lg:bottom-auto lg:right-auto lg:text-center"
              >
                <Button
                  onClick={submitToWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Submit Interest ({selectedServices.length})
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Portfolio };