import React from "react";

import { IJobs, ILocation } from "../models/jobs";

import { FaMapMarkerAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";

import { timeSince } from "../utils/helpers";

const JobCard = ({
  pictures,
  title,
  name,
  address,
  email,
  id,
  createdAt,
}: IJobs<ILocation>) => {
  return (
    <article className="w-[1400px] h-[164px] bg-white px-[16px] py-[24px] flex items-center gap-[32px] rounded-[8px] my-[4px] shadow-lg">
      <div className="flex flex-col items-start h-full">
        <img
          src={pictures[0]}
          alt="Picture"
          className="w-[85px] h-[85px] rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <Link to={`/${id}`} className="headlineClr font-bold text-[20px]">
          {title}
        </Link>
        <div className="">
          <p>{name}</p>p{email}
        </div>
        <div>
          <FaMapMarkerAlt />
          <p>{address}</p>
        </div>
      </div>
      <BsBookmark />
      <p>Posted {timeSince(createdAt)} ago</p>
    </article>
  );
};

export default JobCard;
