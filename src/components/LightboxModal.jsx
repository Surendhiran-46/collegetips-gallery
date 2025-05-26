import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const LightboxModal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);
  const modalRef = useRef();

  const image = images[index]?.src;

  const prevImage = React.useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextImage = React.useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Key bindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, nextImage, prevImage, onClose]);

  // Click outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-black via-black/80 to-gray-900/90 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClickOutside}
      >
        {/* Close */}
        <button
          className="absolute top-6 right-6 text-white bg-white/10 border border-white/20 p-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm z-50"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Prev */}
        <button
          className="absolute left-6 text-white bg-white/10 border border-white/20 p-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm z-50"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next */}
        <button
          className="absolute right-6 text-white bg-white/10 border border-white/20 p-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm z-50"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Modal Image */}
        <motion.div
          ref={modalRef}
          className="relative max-w-3xl w-full max-h-[80vh] rounded-xl shadow-2xl border border-white/20 overflow-hidden"
          key={image}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={`Preview-${index}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-white/10 px-4 py-1 rounded-full border border-white/20 backdrop-blur">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal;
