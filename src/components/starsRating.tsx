import React, { useState } from "react";

import { AiFillStar } from "react-icons/ai";

const StarsRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="md:text-3xl text-xl xl:ml-28">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index > (hover || rating) ? "text-primary" : "text-[#38415D]"
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <AiFillStar />
          </button>
        );
      })}
    </div>
  );
};

export default StarsRating;
