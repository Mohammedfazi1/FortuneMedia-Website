import type { GalleryImage } from '../../data/galleryMockData';
import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No images found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="aspect-[4/3]"
        >
          <GalleryCard image={image} onClick={() => onImageClick(index)} />
        </div>
      ))}
    </div>
  );
}
