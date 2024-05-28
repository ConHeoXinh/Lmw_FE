import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ item, ...remain }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const handleDivClick = () => {
    navigate(item?.route);
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <>
      <div key={item?.id} className="mb-6">
        <div
          className={`flex ${
            hoveredIndex === item?.id
              ? "transform scale-110 transition-all duration-300"
              : ""
          }`}
          onMouseEnter={() => handleMouseEnter(item?.id)}
          onMouseLeave={handleMouseLeave}
          onClick={handleDivClick}
        >
          <div className="flex p-6 w-full gap-5">
            <div>
              <img
                src={item?.image}
                alt={item?.name}
                className="mx-auto w-[180px] max-w-[180px] object-cover shadow-2xl"
              />
            </div>
            <div>
              <h3 className="font-bold text-xl my-4 text-[#1b3764] text-[32px] cardo">
                {item?.name}
              </h3>
              <p className="mt-3 text-start text-slate-400 mb-3 leading-6 max-h-[94px] text-[#969aa0] text-[19px] line-clamp-4">
                {item?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
