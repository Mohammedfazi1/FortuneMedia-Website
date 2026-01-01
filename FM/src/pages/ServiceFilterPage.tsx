import React, { useState, useMemo, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { GlobalSearchBar } from '../components/search/GlobalSearchBar';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MobileFilterDrawer } from '../components/filters/MobileFilterDrawer';
import { ServiceGrid } from '../components/cards/ServiceGrid';
import { ServiceDetailsPanel } from '../components/details/ServiceDetailsPanel';
import { servicesData, type Service } from '../data/servicesData';
import { Button } from '../components/ui/button';

// Shuffle array utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ServiceFilterPage: React.FC = () => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter states
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSubLocations, setSelectedSubLocations] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  // UI states
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Shuffle services on first load
  const [shuffledServices] = useState(() => shuffleArray(servicesData));

  // Filter logic
  const filteredServices = useMemo(() => {
    return shuffledServices.filter((service) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          service.name.toLowerCase().includes(searchLower) ||
          service.regions.some(region => region.toLowerCase().includes(searchLower)) ||
          service.locations.some(location => location.toLowerCase().includes(searchLower)) ||
          service.subLocations.some(subLocation => subLocation.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Service type filter
      if (selectedServices.length > 0 && !selectedServices.includes(service.name)) {
        return false;
      }

      // Region filter
      if (selectedRegions.length > 0 && !service.regions.some(region => selectedRegions.includes(region))) {
        return false;
      }

      // Location filter
      if (selectedLocations.length > 0 && !service.locations.some(location => selectedLocations.includes(location))) {
        return false;
      }

      // Sub-location filter
      if (selectedSubLocations.length > 0 && !service.subLocations.some(subLocation => selectedSubLocations.includes(subLocation))) {
        return false;
      }

      // Availability filter
      if (selectedAvailability.length > 0) {
        const availabilityMatch = selectedAvailability.some(status => {
          if (status === 'Available') return service.available;
          if (status === 'Not Available') return !service.available;
          return false;
        });
        if (!availabilityMatch) return false;
      }

      return true;
    });
  }, [
    shuffledServices,
    searchTerm,
    selectedServices,
    selectedRegions,
    selectedLocations,
    selectedSubLocations,
    selectedAvailability
  ]);

  // Filter toggle handlers
  const handleServiceToggle = useCallback((service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  }, []);

  const handleRegionToggle = useCallback((region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  }, []);

  const handleLocationToggle = useCallback((location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  }, []);

  const handleSubLocationToggle = useCallback((subLocation: string) => {
    setSelectedSubLocations(prev => 
      prev.includes(subLocation) 
        ? prev.filter(sl => sl !== subLocation)
        : [...prev, subLocation]
    );
  }, []);

  const handleAvailabilityToggle = useCallback((availability: string) => {
    setSelectedAvailability(prev => 
      prev.includes(availability) 
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedServices([]);
    setSelectedRegions([]);
    setSelectedLocations([]);
    setSelectedSubLocations([]);
    setSelectedAvailability([]);
    setSearchTerm('');
  }, []);

  const handleViewDetails = useCallback((service: Service) => {
    setSelectedService(service);
    setIsDetailsOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedService(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <GlobalSearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            selectedServices={selectedServices}
            selectedRegions={selectedRegions}
            selectedLocations={selectedLocations}
            selectedSubLocations={selectedSubLocations}
            selectedAvailability={selectedAvailability}
            onServiceToggle={handleServiceToggle}
            onRegionToggle={handleRegionToggle}
            onLocationToggle={handleLocationToggle}
            onSubLocationToggle={handleSubLocationToggle}
            onAvailabilityToggle={handleAvailabilityToggle}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Button
              onClick={() => setIsMobileFilterOpen(true)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Additional Search Bar */}
          <div className="mb-6">
            <GlobalSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Advertising Services
            </h1>
            <p className="text-gray-600">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Service Grid */}
          <ServiceGrid
            services={filteredServices}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedServices={selectedServices}
        selectedRegions={selectedRegions}
        selectedLocations={selectedLocations}
        selectedSubLocations={selectedSubLocations}
        selectedAvailability={selectedAvailability}
        onServiceToggle={handleServiceToggle}
        onRegionToggle={handleRegionToggle}
        onLocationToggle={handleLocationToggle}
        onSubLocationToggle={handleSubLocationToggle}
        onAvailabilityToggle={handleAvailabilityToggle}
        onClearAll={handleClearAll}
        onApplyFilters={() => {}}
      />

      {/* Service Details Panel */}
      <ServiceDetailsPanel
        service={selectedService}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default ServiceFilterPage;