import React, { useState } from "react";

import { AiFillStar } from "react-icons/ai";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const StarsRating = ({ id }: { id: string }) => {
  const { changeRating } = useActions();

  const rating =
    useAppSelector(
      (store) => store.jobs?.jobsList?.find((job) => job.id === id)?.rating
    ) || 0;

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
            onClick={() => {
              // setRating(index);
              changeRating({ id, rating: index });
            }}
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
