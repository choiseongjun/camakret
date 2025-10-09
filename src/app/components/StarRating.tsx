
import { Star } from 'lucide-react';
import clsx from 'clsx';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StarRating({ rating, size = 'md', className }: StarRatingProps) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={clsx('flex items-center', className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={clsx(
            sizeClass[size],
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
}
