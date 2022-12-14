import React, { useEffect, useState } from "react";

import { IJobs, ILocation } from "../models/jobs";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import { getCountry, timeSince } from "../utils/helpers";
import StarsRating from "./starsRating";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";

const JobCard = ({
  pictures,
  title,
  name,
  id,
  createdAt,
  location,
}: IJobs<ILocation>) => {
  const saved = useAppSelector((store) => store.jobs?.jobsList)?.find(
    (job) => job.id === id
  )?.saved;

  // console.log(job);

  const { saveJob, unSaveJob } = useActions();

  const [loc, setLoc] = useState<any>({});

  useEffect(() => {
    getCountry(location?.long, location?.lat).then((data) => setLoc(data));
  }, []);

  return (
    <article className="max-w-[1400px] max-[425px]:min-h-[210px] xl:h-[164px] bg-white px-[16px] xl:py-[24px] pt-[44px] pb-[27px] flex items-center md:gap-[32px] gap-[19px] rounded-[8px] my-[4px] shadow-lg relative hover:bg-[#f0f0f0] hover:transition">
      <div className="flex flex-col self-start h-full max-[1060px]:pt-[15px]  ">
        <img
          src={pictures[0]}
          alt="Picture"
          className="rounded-full md:h-[85px] h-[64px] md:w-[85px]  w-[64px]"
        />
      </div>
      <div className="flex flex-col md:w-[712px] w-[70%]">
        <Link
          to={`/${id}`}
          className="text-headline-clr font-bold text-[20px] max-[1060px]:pt-[15px] max-[760px]:text-[18px] max-[425px]:pb-14"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {title}
        </Link>
        <div className="text-primary my-2 max-[425px]:left-[15px] max-[425px]:bottom-[40px] max-[425px]:absolute">
          <p>{name}</p>
        </div>
        <div className="text-primary flex items-center gap-3 max-[425px]:left-[15px] max-[425px]:bottom-[20px] max-[425px]:absolute">
          <FaMapMarkerAlt />
          <p>
            {loc?.city}, {loc?.country}
          </p>
        </div>
      </div>
      <div className="max-[1060px]:absolute max-[1060px]:left-6 max-[1060px]:top-4">
        <StarsRating id={id} />
      </div>
      {!saved ? (
        <BsBookmark
          onClick={() => {
            saveJob(id);
          }}
          className="text-2xl text-headline-clr absolute xl:top-6 right-6 bottom-6 cursor-pointer"
        />
      ) : (
        <BsFillBookmarkFill
          onClick={() => {
            unSaveJob(id);
          }}
          className="text-2xl text-headline-clr absolute xl:top-6 right-6 bottom-6 cursor-pointer"
        />
      )}
      <p className="text-headline-clr absolute bottom-6 right-6 max-[1280px]:top-4 max-[380px]:top-[17px] cursor-pointer max-[380px]:text-[13px] h-4">
        Posted {timeSince(createdAt)} ago
      </p>
    </article>
  );
};

export default JobCard;
