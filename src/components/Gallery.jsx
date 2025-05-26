import React, { useState } from "react";
import { galleryImages, categories } from "../data/images";
import FilterBar from "./FilterBar";
import ImageCard from "./ImageCard";
import LightboxModal from "./LightboxModal";
import Masonry from 'react-masonry-css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalImage, setModalImage] = useState(null);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1
        style={{ fontFamily: "" }}
        className="text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 text- bg-clip-text drop-shadow-sm tracking-tight"
      >
        CollegeTips Gallery 📸
      </h1>

      <FilterBar
        categories={["All", ...categories]}
        active={selectedCategory}
        setActive={setSelectedCategory}
      />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 mt-6"
        columnClassName="space-y-4"
      >
        {filteredImages.map((img, index) => (
          <ImageCard
            key={index}
            image={img}
            onClick={() => setModalImage({ index, images: filteredImages })}
          />
        ))}
      </Masonry>

      {modalImage && (
        <LightboxModal
          images={modalImage.images}
          currentIndex={modalImage.index}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
