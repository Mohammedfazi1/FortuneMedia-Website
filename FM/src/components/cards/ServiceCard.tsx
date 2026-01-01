import React from 'react';
import { MapPin, Eye } from 'lucide-react';
import type { Service } from '../../data/servicesData';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <Card className={`group transition-all duration-200 ${
      service.available 
        ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
        : 'opacity-60 cursor-not-allowed'
    }`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholder-service.jpg';
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              service.available
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {service.available ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {service.name}
          </h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">
              {service.regions.slice(0, 2).join(', ')}
              {service.regions.length > 2 && ` +${service.regions.length - 2} more`}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {service.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              {service.pricing}
            </span>
            <Button
              onClick={() => onViewDetails(service)}
              variant="outline"
              size="sm"
              disabled={!service.available}
              className="flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};