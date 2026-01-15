import { useState, useMemo, useCallback } from 'react';
import GalleryFilter from './gallery/GalleryFilter';
import GalleryGrid from './gallery/GalleryGrid';
import ImageViewer from './gallery/ImageViewer';
import { galleryImages, serviceTypes, cities } from '../data/galleryMockData';
import { filterImages } from '../lib/galleryUtils';
import type { FilterState } from '../lib/galleryUtils';

export default function Gallery() {
  const [filters, setFilters] = useState<FilterState>({
    serviceTypes: ['All'],
    cities: ['All'],
  });
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () => filterImages(galleryImages, filters),
    [filters]
  );

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleImageClick = useCallback((index: number) => {
    setViewerIndex(index);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewerIndex(null);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setViewerIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
            alt="Gallery Background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-2xl">Gallery</h1>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow-xl">
            Our Advertising Works Across Cities
          </p>
        </div>
      </div>

      <GalleryFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        serviceTypes={serviceTypes}
        cities={cities}
      />

      <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />

      {viewerIndex !== null && (
        <ImageViewer
          images={filteredImages}
          currentIndex={viewerIndex}
          onClose={handleCloseViewer}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
