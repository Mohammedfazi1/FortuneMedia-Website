import type { GalleryImage } from '../data/galleryMockData';

export interface FilterState {
  serviceTypes: string[];
  cities: string[];
}

export const filterImages = (
  images: GalleryImage[],
  filters: FilterState
): GalleryImage[] => {
  return images.filter((image) => {
    const serviceMatch =
      filters.serviceTypes.length === 0 ||
      filters.serviceTypes.includes('All') ||
      filters.serviceTypes.includes(image.serviceType);

    const cityMatch =
      filters.cities.length === 0 ||
      filters.cities.includes('All') ||
      filters.cities.includes(image.city);

    return serviceMatch && cityMatch;
  });
};
