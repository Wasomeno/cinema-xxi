import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TransactionCard = ({
  movie,
  cinema,
  studio,
  showtime,
  ticketAmount,
  href,
}) => {
  const dateTime = new Date(showtime * 1000);
  return (
    <Link
      href={href}
      className="h-40 w-full rounded-lg bg-slate-50 p-2 shadow-sm lg:h-52 lg:w-[30rem]"
    >
      <div className="flex h-full items-center justify-between">
        <div className="relative h-full w-4/12">
          <Image
            src={movie.image_url}
            alt="movie-image"
            fill
            className="rounded-lg"
          />
        </div>
        <div className="flex h-full w-7/12 items-center justify-center">
          <div className="flex w-5/6 flex-col gap-2">
            <h5 className="font-poppins text-sm font-medium">{movie.title}</h5>
            <p className="font-poppins text-xs">
              {`${cinema.name} , Studio ${studio}`}
            </p>
            <p className="font-poppins text-xs">
              {`${dateTime.toDateString()}, ${dateTime.getHours()}:${dateTime.getMinutes()} PM`}
            </p>
            <span className="text-sm">{ticketAmount} Tickets</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const TransactionCardSkeleton = () => {
  return (
    <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200 p-4 shadow-sm lg:h-52 lg:w-[30rem]">
      <div className="flex h-full items-center justify-between">
        <div className="relative h-full w-4/12">
          <div className="h-full w-full animate-pulse rounded-lg bg-slate-400" />
        </div>
        <div className="flex h-full w-7/12 items-center justify-center">
          <div className="flex w-5/6 flex-col gap-2">
            <div className="h-[14px] w-full animate-pulse rounded-lg bg-slate-400" />
            <div className="h-[12px] w-5/6 animate-pulse rounded-lg bg-slate-400" />
            <div className="h-[12px] w-5/6 animate-pulse rounded-lg bg-slate-400" />
            <div className="h-[14px] w-3/6 animate-pulse rounded-lg bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
