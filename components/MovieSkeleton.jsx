import React from "react";

export const MovieSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-48 w-36 animate-pulse rounded-lg bg-slate-300 lg:h-64 lg:w-48" />
      <span className="h-8 w-4/6 animate-pulse rounded-lg bg-slate-300" />
    </div>
  );
};
