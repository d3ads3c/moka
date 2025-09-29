"use client"
import React, { useEffect, useState } from 'react';

interface AutoSlideImagesProps {
    images: string[];
    interval?: number; // milliseconds
    visibleCount?: number; // number of images to show at once
}

const AutoSlideImages: React.FC<AutoSlideImagesProps> = ({ images, interval = 3000 }) => {
    const visibleCount = 5;
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Duplicate images for seamless loop
    const extendedImages = [...images, ...images.slice(0, visibleCount)];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => prev + 1);
            setIsTransitioning(true);
        }, interval);
        return () => clearInterval(timer);
    }, [interval]);

    // Reset position instantly when reaching the end
    useEffect(() => {
        if (current === images.length) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrent(0);
            }, 700); // match transition duration
            return () => clearTimeout(timeout);
        } else {
            setIsTransitioning(true);
        }
    }, [current, images.length]);

    return (
        <div style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
            <div
                style={{
                    display: 'flex',
                    transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
                    transform: `translateX(${current * (100 / visibleCount)}%)`,
                    width: `${extendedImages.length * (100 / visibleCount)}%`,
                }}
            >
                {extendedImages.map((img, idx) => (
                    <div
                        key={img + idx}
                        style={{
                            flex: `0 0 ${100 / visibleCount}%`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <img
                            src={img}
                            alt={`slide-${idx}`}
                            style={{
                                maxWidth: '50%',
                                maxHeight: '50%',
                                objectFit: 'contain',
                            }}
                            className='grayscale'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutoSlideImages;
