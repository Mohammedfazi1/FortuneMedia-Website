import type { FilterState } from '../../lib/galleryUtils';

interface GalleryFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  serviceTypes: string[];
  cities: string[];
}

export default function GalleryFilter({
  filters,
  onFilterChange,
  serviceTypes,
  cities,
}: GalleryFilterProps) {
  const toggleFilter = (type: 'serviceTypes' | 'cities', value: string) => {
    const currentFilters = filters[type];
    
    if (value === 'All') {
      onFilterChange({ ...filters, [type]: ['All'] });
      return;
    }

    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((f) => f !== value && f !== 'All')
      : [...currentFilters.filter((f) => f !== 'All'), value];

    onFilterChange({
      ...filters,
      [type]: newFilters.length === 0 ? ['All'] : newFilters,
    });
  };

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 md:items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 uppercase min-w-fit">Service:</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter('serviceTypes', type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    filters.serviceTypes.includes(type)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px md:h-6 md:w-px bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 uppercase min-w-fit">City:</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => toggleFilter('cities', city)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    filters.cities.includes(city)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
