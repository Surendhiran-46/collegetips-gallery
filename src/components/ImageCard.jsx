import React,{ memo } from "react";
import { motion } from "framer-motion";

const ImageCard = ({ image, onClick }) => {
  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-2xl shadow-xl group bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full object-cover rounded-2xl group-hover:brightness-75 transition-all duration-300"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm p-2 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        {image.category}
      </div>
    </motion.div>
  );
};

export default memo(ImageCard);
