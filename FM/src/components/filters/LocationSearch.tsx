import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface LocationSearchProps {
  locations: string[];
  selectedLocations: string[];
  onLocationToggle: (location: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  locations,
  selectedLocations,
  onLocationToggle
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 py-2 text-sm"
        />
      </div>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {filteredLocations.map((location) => (
          <label key={location} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedLocations.includes(location)}
              onChange={() => onLocationToggle(location)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{location}</span>
          </label>
        ))}
      </div>
    </div>
  );
};