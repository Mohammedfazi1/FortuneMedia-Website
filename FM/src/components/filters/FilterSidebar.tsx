import React from 'react';
import { LocationSearch } from './LocationSearch';
import { servicesData } from '../../data/servicesData';

interface FilterSidebarProps {
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
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
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
  onClearAll
}) => {
  // Dynamic filter options based on current selections
  const getAvailableServices = () => {
    if (selectedRegions.length === 0 && selectedLocations.length === 0 && selectedSubLocations.length === 0) {
      return [...new Set(servicesData.map(s => s.name))];
    }
    
    return [...new Set(servicesData
      .filter(service => {
        const regionMatch = selectedRegions.length === 0 || service.regions.some(r => selectedRegions.includes(r));
        const locationMatch = selectedLocations.length === 0 || service.locations.some(l => selectedLocations.includes(l));
        const subLocationMatch = selectedSubLocations.length === 0 || service.subLocations.some(sl => selectedSubLocations.includes(sl));
        return regionMatch && locationMatch && subLocationMatch;
      })
      .map(s => s.name))];
  };

  const getAvailableRegions = () => {
    if (selectedServices.length === 0 && selectedLocations.length === 0 && selectedSubLocations.length === 0) {
      return [...new Set(servicesData.flatMap(s => s.regions))];
    }
    
    return [...new Set(servicesData
      .filter(service => {
        const serviceMatch = selectedServices.length === 0 || selectedServices.includes(service.name);
        const locationMatch = selectedLocations.length === 0 || service.locations.some(l => selectedLocations.includes(l));
        const subLocationMatch = selectedSubLocations.length === 0 || service.subLocations.some(sl => selectedSubLocations.includes(sl));
        return serviceMatch && locationMatch && subLocationMatch;
      })
      .flatMap(s => s.regions))];
  };

  const getAvailableLocations = () => {
    if (selectedServices.length === 0 && selectedRegions.length === 0 && selectedSubLocations.length === 0) {
      return [...new Set(servicesData.flatMap(s => s.locations))];
    }
    
    return [...new Set(servicesData
      .filter(service => {
        const serviceMatch = selectedServices.length === 0 || selectedServices.includes(service.name);
        const regionMatch = selectedRegions.length === 0 || service.regions.some(r => selectedRegions.includes(r));
        const subLocationMatch = selectedSubLocations.length === 0 || service.subLocations.some(sl => selectedSubLocations.includes(sl));
        return serviceMatch && regionMatch && subLocationMatch;
      })
      .flatMap(s => s.locations))];
  };

  const getAvailableSubLocations = () => {
    if (selectedServices.length === 0 && selectedRegions.length === 0 && selectedLocations.length === 0) {
      return [...new Set(servicesData.flatMap(s => s.subLocations))];
    }
    
    return [...new Set(servicesData
      .filter(service => {
        const serviceMatch = selectedServices.length === 0 || selectedServices.includes(service.name);
        const regionMatch = selectedRegions.length === 0 || service.regions.some(r => selectedRegions.includes(r));
        const locationMatch = selectedLocations.length === 0 || service.locations.some(l => selectedLocations.includes(l));
        return serviceMatch && regionMatch && locationMatch;
      })
      .flatMap(s => s.subLocations))];
  };

  const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear All
          </button>
        </div>

        <FilterSection title="Service Type">
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {getAvailableServices().map((service) => (
              <label key={service} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => onServiceToggle(service)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Region">
          <div className="space-y-3">
            {getAvailableRegions().map((region) => (
              <label key={region} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => onRegionToggle(region)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{region}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Location">
          <LocationSearch
            locations={getAvailableLocations()}
            selectedLocations={selectedLocations}
            onLocationToggle={onLocationToggle}
          />
        </FilterSection>

        <FilterSection title="Sub-location">
          <div className="space-y-3 max-h-32 overflow-y-auto">
            {getAvailableSubLocations().map((subLocation) => (
              <label key={subLocation} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubLocations.includes(subLocation)}
                  onChange={() => onSubLocationToggle(subLocation)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{subLocation}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability Status">
          <div className="space-y-3">
            {['Available', 'Not Available'].map((status) => (
              <label key={status} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(status)}
                  onChange={() => onAvailabilityToggle(status)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};