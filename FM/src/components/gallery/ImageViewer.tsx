import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../../data/galleryMockData';

interface ImageViewerProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageViewer({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageViewerProps) {
  const currentImage = images[currentIndex];

  const handlePrevious = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, handlePrevious, handleNext]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) handleNext();
      if (touchEndX - touchStartX > 50) handlePrevious();
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrevious]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors lg:top-6 lg:right-6"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={handlePrevious}
        className="absolute left-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden lg:block"
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden lg:block"
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </button>

      <div className="max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/800x600/1f2937/ffffff?text=Image+Not+Found';
          }}
        />
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-medium">{currentImage.serviceType}</p>
          <p className="text-white/70 text-sm">{currentImage.city}</p>
          <p className="text-white/50 text-xs mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 lg:hidden">
        <button
          onClick={handlePrevious}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
