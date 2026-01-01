import React from 'react';
import type { Service } from '../../data/servicesData';
import { ServiceCard } from './ServiceCard';

interface ServiceGridProps {
  services: Service[];
  onViewDetails: (service: Service) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onViewDetails }) => {
  // Sort services: available first, then not available
  const sortedServices = [...services].sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    return 0;
  });

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v6.414l-1.293-1.293a1 1 0 00-1.414 0L12 16.414l-2.293-2.293a1 1 0 00-1.414 0L7 15.414V9a2 2 0 012-2h8a2 2 0 012 2v6.414z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
        <p className="text-gray-600 max-w-md">
          Try adjusting your search terms or filters to find the services you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};