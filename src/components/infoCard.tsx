import React from "react";

const InfoCard = ({
  color,
  text,
  bgColor,
  border,
}: {
  color: string;
  text: string;
  bgColor: string;
  border: string;
}) => {
  return (
    <article
      className={`w-[222px] h-[50px] rounded-[8px] border ${color} ${bgColor} ${border} flex flex-wrap justify-center items-center max-[640px]:w-[150px]`}
    >
      {text}
    </article>
  );
};

export default InfoCard;
