import type { GalleryImage } from '../../data/galleryMockData';
import { Eye } from 'lucide-react';

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

export default function GalleryCard({ image, onClick }: GalleryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 h-full"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Gallery+Image';
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium">{image.serviceType}</p>
        <p className="text-white/80 text-xs">{image.city}</p>
      </div>
    </div>
  );
}
