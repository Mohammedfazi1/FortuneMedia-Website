import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationSearch } from './LocationSearch';
import { filterData } from '../../data/servicesData';
import { Button } from '../ui/button';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  selectedRegions: string[];
  selectedLocations: string[];
  selectedSubLocations: string[];
  selectedAvailability: string[];
  onServiceToggle: (service: string) => void;
  onRegionToggle: (region: string) => void;
  onLocationToggle: (location: string) => void;
  onSubLocationToggle: (subLocation: string) => void;
  onAvailabilityToggle: (availability: string) => void;
  onClearAll: () => void;
  onApplyFilters: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedServices,
  selectedRegions,
  selectedLocations,
  selectedSubLocations,
  selectedAvailability,
  onServiceToggle,
  onRegionToggle,
  onLocationToggle,
  onSubLocationToggle,
  onAvailabilityToggle,
  onClearAll,
  onApplyFilters
}) => {
  const [activeCategory, setActiveCategory] = useState('Service Type');

  const categories = [
    'Service Type',
    'Region',
    'Location',
    'Sub-location',
    'Availability Status'
  ];

  const renderFilterOptions = () => {
    switch (activeCategory) {
      case 'Service Type':
        return (
          <div className="space-y-4">
            {filterData.services.map((service) => (
              <label key={service} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => onServiceToggle(service)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5"
                />
                <span className="text-base text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        );
      case 'Region':
        return (
          <div className="space-y-4">
            {filterData.regions.map((region) => (
              <label key={region} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => onRegionToggle(region)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5"
                />
                <span className="text-base text-gray-700">{region}</span>
              </label>
            ))}
          </div>
        );
      case 'Location':
        return (
          <LocationSearch
            locations={filterData.locations}
            selectedLocations={selectedLocations}
            onLocationToggle={onLocationToggle}
          />
        );
      case 'Sub-location':
        return (
          <div className="space-y-4">
            {filterData.subLocations.map((subLocation) => (
              <label key={subLocation} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubLocations.includes(subLocation)}
                  onChange={() => onSubLocationToggle(subLocation)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5"
                />
                <span className="text-base text-gray-700">{subLocation}</span>
              </label>
            ))}
          </div>
        );
      case 'Availability Status':
        return (
          <div className="space-y-4">
            {['Available', 'Not Available'].map((status) => (
              <label key={status} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(status)}
                  onChange={() => onAvailabilityToggle(status)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5"
                />
                <span className="text-base text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full">
              {/* Left: Categories */}
              <div className="w-1/3 bg-gray-50 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button onClick={onClose}>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                  <button
                    onClick={onClearAll}
                    className="text-sm text-primary hover:text-primary/80 font-medium mt-2"
                  >
                    Clear All
                  </button>
                </div>
                <div className="p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left p-3 rounded-lg text-sm font-medium ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Filter Options */}
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{activeCategory}</h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {renderFilterOptions()}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      onApplyFilters();
                      onClose();
                    }}
                    className="w-full py-3 text-base font-semibold"
                  >
                    Apply Filters
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