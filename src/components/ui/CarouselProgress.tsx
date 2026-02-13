import React from 'react';

interface CarouselProgressProps {
    total: number;
    current: number;
    className?: string;
}

const CarouselProgress: React.FC<CarouselProgressProps> = ({ total, current, className = '' }) => {
    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${index === current
                            ? 'bg-editorial-black dark:bg-white w-8'
                            : 'bg-gray-300 dark:bg-gray-700 w-4'
                        }`}
                />
            ))}
        </div>
    );
};

export default CarouselProgress;
