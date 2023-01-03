import { ethers } from "ethers";
import Link from "next/link";
import React from "react";
import { Paragraph } from "@/components/shared/Texts";

const MovieListCard = ({ movie }) => {
  return (
    <Link
      href={"/manager/movies/" + parseInt(movie.movieId.hex)}
      className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
    >
      <div className="w-3/6 flex justify-center items-center gap-4">
        <Paragraph
          text={ethers.utils.parseBytes32String(movie.title)}
          style="medium"
          size="sm"
        />
      </div>
      <div className="w-2/6">
        <p className="font-poppins text-xs text-center"></p>
      </div>
    </Link>
  );
};

export default MovieListCard;
