import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { servicesData, filterData } from '../../data/servicesData';

interface GlobalSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, onSearchChange]);

  // Smart search with synonyms and sentence understanding
  const getSmartSuggestions = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Service synonyms mapping
    const serviceSynonyms: { [key: string]: string[] } = {
      'Auto Rickshaw': ['auto', 'rickshaw', 'auto rickshaw', 'three wheeler', 'tuk tuk', 'auto top'],
      'Billboard / Hoardings': ['billboard', 'hoarding', 'board', 'outdoor board', 'advertising board'],
      'Pole Kiosk': ['pole', 'kiosk', 'pole kiosk', 'street pole', 'pillar'],
      'Bus Shelter': ['bus shelter', 'bus stop', 'shelter', 'transit shelter'],
      'UniPole & Cantilever': ['unipole', 'cantilever', 'pole', 'tower', 'high pole'],
      'Gantry Arch': ['gantry', 'arch', 'overhead', 'bridge'],
      'Bus Branding': ['bus branding', 'bus advertising', 'bus wrap'],
      'Traffic Police Booth': ['police booth', 'traffic booth', 'booth'],
      'Traffic Sunshade Barricade': ['sunshade', 'barricade', 'traffic barricade', 'shade'],
      'Center Median Barricade': ['median', 'center median', 'road median', 'divider'],
      'LED Display': ['led', 'digital display', 'screen', 'electronic board'],
      'Foot Over Bridge': ['fob', 'foot bridge', 'over bridge', 'pedestrian bridge']
    };

    const suggestions = new Set<string>();

    // Check services with synonyms
    Object.entries(serviceSynonyms).forEach(([service, synonyms]) => {
      if (synonyms.some(synonym => searchLower.includes(synonym))) {
        suggestions.add(service);
      }
    });

    // Check regions
    filterData.regions.forEach(region => {
      if (region.toLowerCase().includes(searchLower) || searchLower.includes(region.toLowerCase())) {
        suggestions.add(region);
      }
    });

    // Check locations
    filterData.locations.forEach(location => {
      if (location.toLowerCase().includes(searchLower) || searchLower.includes(location.toLowerCase())) {
        suggestions.add(location);
      }
    });

    // Check sub-locations
    filterData.subLocations.forEach(subLocation => {
      if (subLocation.toLowerCase().includes(searchLower) || searchLower.includes(subLocation.toLowerCase())) {
        suggestions.add(subLocation);
      }
    });

    return Array.from(suggestions).slice(0, 6);
  };

  const suggestions = useMemo(() => {
    if (!localSearchTerm || localSearchTerm.length < 2) return [];
    return getSmartSuggestions(localSearchTerm);
  }, [localSearchTerm]);

  const handleClear = () => {
    setLocalSearchTerm('');
    onSearchChange('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLocalSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchTerm('');
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search services, locations, or areas..."
          value={localSearchTerm}
          onChange={(e) => {
            setLocalSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 focus:border-primary rounded-lg"
        />
        {localSearchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
            >
              <span className="text-gray-700">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};