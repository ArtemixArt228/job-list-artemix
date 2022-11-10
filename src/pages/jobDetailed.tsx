import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { useGetJobsQuery } from "../redux/services/jobs";

import { IJobs, ILocation } from "../models/jobs";

import { BsBookmark, BsChevronLeft, BsShareFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

import { getDetails, timeSince } from "../utils/helpers";

import ApplyBtn from "../components/applyBtn";
import InfoCard from "../components/infoCard";

import ReactMapGl from "react-map-gl";

const JobDetailed = () => {
  const [job, setJob] = useState<IJobs<ILocation>>({} as IJobs<ILocation>);

  const { desc, responsibilities, benefits } = getDetails(job?.description);

  const { id } = useParams();

  const { data: jobs, isLoading, isError } = useGetJobsQuery();

  const findProperJob = (id: string) => {
    const jobsId = jobs?.map((job: IJobs<ILocation>) => job.id);

    const indexOfJob: number | undefined = jobsId?.indexOf(id);

    if (indexOfJob! >= 0 && jobs) {
      setJob(jobs[indexOfJob!]);
    }
  };

  useEffect(() => {
    findProperJob(id as string);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-gray-500 text-3xl p-4 text-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-red-900 text-3xl p-4 text-center">
        Ooops... There is some errors. Try again later, please!
      </div>
    );
  }

  return (
    <div className="xl:bg-white flex xl:flex-row xl:gap-[115px] xl:max-w-[1350px] xl:m-auto xl:my-[56px] flex-col w-full pt-[24px] px-[17px]">
      <main>
        <div className="xl:w-[725px] flex flex-col xl:pl-24">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:pb-[9px] sm:border-b sm:border-line">
            <h3 className="font-bold text-3xl text-headline-clr tracking-wider max-[640px]:w-full max-[640px]:pb-[9px] max-[640px]:border-b max-[640px]:border-line">
              Job Details
            </h3>
            <div className="flex items-center gap-8 text-headline-clr text-md max-[640px]:mt-[24px]">
              <div className="flex items-center gap-3">
                <BsBookmark className="cursor-pointer" />
                <p>Save to my list</p>
              </div>
              <div className="flex items-center gap-3 text-headline-clr">
                <BsShareFill className="cursor-pointer" />
                <p>Share</p>
              </div>
            </div>
          </header>
          <div className="max-[640px]:hidden">
            <ApplyBtn />
          </div>

          <div className="mt-[32px] flex xl:flex-row xl:justify-between flex-col">
            <h2 className="xl:max-w-[450px] font-bold text-xl text-headline-clr">
              {job.title}
            </h2>
            <div className="max-[1280px]:self-end max-[640px]:mt-1">
              <p className="font-bold text-[20px] text-headline-clr ">
                {job.salary}
              </p>
              <p className="text-headline-clr">Dollars, per year</p>
            </div>
          </div>
          <p className="mt-2 text-primary max-[1280px]:mt-[-30px] max-[1280px]:mb-[30px]">
            Posted {timeSince(job.createdAt)} ago
          </p>
          <div className="w-full mt-0.5 text-headline-clr">
            <div>
              <p>{desc}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-bold text-[20px]">Responsopilities</h5>
              <p>{responsibilities}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-bold text-[20px]">
                Compensation & Benefits:
              </h5>
              <ul className="max-[1280px]:pl-[16px]">
                {benefits?.split(".").map((item, index) => (
                  <li
                    key={index}
                    className="relative before:absolute before:w-2 before:h-2 my-1 before:bg-headline-clr before:top-2 before:left-[-15px] before:last:hidden"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-[640px]:text-center">
            <ApplyBtn />
          </div>
          <div className="mt-[86px] max-[640px]:mt-[40px]">
            <h5 className="text-[28px] font-bold text-[#3A4562] pb-[9px] border-b border-line ">
              Additional info
            </h5>
            <p className="mt-[15px] text-sm text-headline-clr">
              Employment type
            </p>
            <div className="mt-3 flex gap-[10px]">
              {job?.employment_type?.map((type) => (
                <InfoCard
                  key={type}
                  text={type}
                  bgColor={"bg-violet-btn"}
                  color={"text-violet-t"}
                  border={"border-violet-bor"}
                />
              ))}
            </div>
            <p className="mt-[23px] text-sm text-headline-clr">Benefits</p>
            <div className="mt-3 flex gap-[10px]">
              {job?.benefits?.map((type) => (
                <InfoCard
                  key={type}
                  text={type}
                  bgColor={"bg-yellow-btn"}
                  border={"border-yellow-bor"}
                  color={"text-yellow-t"}
                />
              ))}
            </div>
          </div>
          <div className="mt-[87px]">
            <h4 className="font-bold text-[28px] text-[#3A4562] pb-[9px] border-b border-line">
              Attached images
            </h4>
            <div className="mt-3 flex gap-3 max-[1200px]:flex-wrap justify-center">
              {job?.pictures?.map((url, i) => (
                <img
                  className="rounded-[8px] object-cover w-[220px] h-[150px]"
                  src={url}
                  alt="picture"
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hover:bg-[#E9E9F9] hover:transition mt-[89px] bg-[#E6E9F2] font-bold rounded-[8px] uppercase max-[640px]:hidden w-[213px] h-[50px] flex justify-center items-center">
          <Link
            className="text-headline-clr text-sm flex gap-[19px] justify-center items-center"
            to="/"
          >
            <BsChevronLeft className="text-xl" />
            RETURN TO JOB BOARD
          </Link>
        </div>
      </main>
      <aside className="max-[1200px]:mt-[60px]">
        <h4 className="max-[1200px]:font-bold max-[1200px]:text-[28px] max-[1200px]:text-[#3A4562] max-[1200px]:pb-[9px] max-[1200px]:border-b max-[1200px]:border-line max-[1200px]:mb-[21px] hidden">
          Contacts
        </h4>
        <div className="w-[402px] h-[436px] max-[1200px]:w-[310px] pt-[31px] bg-[#2A3047] rounded-[8px] text-[#E7EAF0] relative overflow-hidden">
          <div className="absolute rounded-full h-[273px] w-[273px] right-[43%] bg-[#202336] top-[-5%]"></div>
          <div className="relative px-[63px] z-10">
            <h3>Department name</h3>
            <p>{job.name}</p>
            <div>
              <FaMapMarkerAlt />
              <span>{job.address}</span>
            </div>
            <p>{job.phone}</p>
            <p>{job.email}</p>
          </div>
          <div className="w-full absolute bottom-0 h-[50%] overflow-hidden">
            {job?.location && (
              <ReactMapGl></ReactMapGl>
              /* <MapContainer
                center={[job?.location?.lat, job?.location?.long]}
                zoom={10}
              >
                <TileLayer
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <Marker position={[job?.location?.lat, job?.location?.long]}>
                  <Popup>
                    Artemix often here, come over for a cup of coffee :)
                  </Popup>
                </Marker>
              </MapContainer>*/
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default JobDetailed;
