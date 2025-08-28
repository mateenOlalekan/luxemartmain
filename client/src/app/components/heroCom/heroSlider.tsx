'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import img1 from "../../../../public/image/Fashion.jpeg";
import img2 from "../../../../public/image/Eletronic.jpg";
import img3 from "../../../../public/image/Furniture.jpg";

const slides = [
  {
    id: 1,
    image: img1,
    title: "Summer Collection 2025",
    description: "Discover the latest products with personalized style!",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: img2,
    title: "New Arrivals",
    description: "Discover the latest fashion trends now!",
    cta: "Shop Now",
  },
  {
    id: 3,
    image: img3,
    title: "Latest Tech Gadgets",
    description: "Up to 40% off on the latest electronics and gadgets. Limited time offer!",
    cta: "Explore Now",
  },
  {
    id: 4,
    image: img1,
    title: "Home & Living Essentials",
    description: "Transform your space with our curated collection of home decor and furniture.",
    cta: "Explore Collection",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [isTransitioning]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNextSlide();
    }

    if (touchStart - touchEnd < -50) {
      goToPrevSlide();
    }
  };

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(transitionTimer);
  }, [currentSlide]);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(autoplayTimer);
  }, [goToNextSlide]);

  return (
    <div className="relative w-full h-[455px] rounded-xl overflow-hidden group">
      {/* Slides Container */}
      <div 
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={80}
              style={{ filter: "brightness(0.8)" }}
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 text-white">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 animate-fadeIn delay-100">
                  {slide.description}
                </p>
                <button className="mt-4 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-full animate-fadeIn delay-200">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-800/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-800/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;