"use client";

import React from "react";
import { galleryImages2025_2026 } from "@/data/galleryImages";
import GalleryYearSection from "@/components/galleryYearSection";

const quarters = ["Spring", "Winter", "Fall"] as const;

const GalleryPage: React.FC = () => {
  const images = [...galleryImages2025_2026].reverse();

  return (
    <div className="gallery-container">
      <div className="bg-gray-100">
        <div className="mx-4 lg:mx-16 pt-4 pb-8">
          <h1 className="mt-4 text-center text-4xl font-semibold">
            Our Favorite Memories
          </h1>

          <h2 className="mt-4 text-2xl font-semibold">D1 Year</h2>

          {quarters.map((quarter) => (
            <GalleryYearSection
              key={quarter}
              images={images}
              year="2025-2026"
              quarter={quarter}
              p="high"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
