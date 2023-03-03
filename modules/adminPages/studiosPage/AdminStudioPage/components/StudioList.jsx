import Link from "next/link";
import React from "react";

import DataContainer from "@/components/DataContainer";
import { useCinemaStudios } from "@/components/reactQuery/queries/Cinema/useCinemaStudios";
import { Paragraph } from "@/components/shared/Texts";

export const StudioList = () => {
  const cinemaStudios = useCinemaStudios();
  return (
    <DataContainer
      className="flex flex-col items-center justify-start gap-3"
      loading={false}
      object="studios"
    >
      {cinemaStudios.data?.studio.length < 1 ? (
        <div className="flex h-72 items-center">
          <Paragraph size="sm">No Active Studio</Paragraph>
        </div>
      ) : (
        cinemaStudios.data?.studio.map((studio, index) => (
          <Link
            key={index}
            href={"/admin/studios/" + studio.studio}
            className="flex h-14 w-full items-center justify-center rounded-md bg-slate-200 p-2 shadow-sm"
          >
            <div className="w-2/6 text-center">
              <Paragraph size="sm">{"Studio " + studio.studio}</Paragraph>
            </div>
          </Link>
        ))
      )}
    </DataContainer>
  );
};
