"use client";

import {
  galleryImages2025_2026,
} from "@/data/galleryImages";
import React, { useState } from "react";
import GalleryYearSection from "@/components/galleryYearSection";

const GalleryPage: React.FC = () => {
  return (
    <div className="gallery-container ">
      <div className="bg-gray-100">
        <div className="mx-4 lg:mx-16 pt-4 pb-8">
          <h2 className="text-4xl mt-4 font-semibold text-center">
            Our Favorite Memories
          </h2>
          <h2 className="text-2xl mt-4 font-semibold">D1 Year</h2>
          <GalleryYearSection
            images={galleryImages2025_2026.slice().reverse()}
            year="2025-2026"
            quarter="Fall"
            p="high"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
