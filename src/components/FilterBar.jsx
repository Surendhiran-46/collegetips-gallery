import React from "react";

const FilterBar = ({ categories, active, setActive }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-3 rounded-xl backdrop-blur-sm">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setActive(category)}
          className={`px-4 py-2 rounded-full backdrop-blur-md border
    transition-all duration-200 shadow-sm
    ${
      active === category
        ? "bg-green-600 text-white border-green-300 shadow-md"
        : "bg-gray/20 text-black-100 border-black/10 hover:bg-black/10"
    }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
