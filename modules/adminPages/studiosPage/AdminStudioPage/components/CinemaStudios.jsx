import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

import { useCinemaStudios } from "@/components/reactQuery/queries/Cinema/useCinemaStudios";
import { Paragraph } from "@/components/shared/Texts";

import { CinemaStudiosMenu } from "./CinemaStudiosMenu";

export const CinemaStudios = ({ showMenu, toggleShowMenu }) => {
  const adminDetails = useAdminDetailsContext();
  const cinemaStudios = useCinemaStudios(adminDetails?.cinema);

  if (cinemaStudios.isLoading)
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center gap-4">
        <p className="font-poppins text-xs">Fetching cinema studios</p>
        <MoonLoader
          loading={cinemaStudios.isLoading}
          size="30"
          color="black"
          speedMultiplier={0.75}
        />
      </div>
    );

  if (cinemaStudios.data?.studio.length < 1)
    return (
      <div className="flex h-72 items-center justify-center">
        <Paragraph size="sm">No active studios</Paragraph>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-start gap-3">
      {cinemaStudios.data?.studio.map((studio) => (
        <Link
          key={studio.id}
          href={"/admin/studios/" + studio.id}
          className="flex h-14 w-full items-center justify-center rounded-md bg-slate-200 p-2 shadow-sm dark:bg-slate-700"
        >
          <div className="w-2/6 text-center">
            <Paragraph size="sm">{"Studio " + studio.studio}</Paragraph>
          </div>
        </Link>
      ))}
      <AnimatePresence>
        {showMenu && <CinemaStudiosMenu toggleShowMenu={toggleShowMenu} />}
      </AnimatePresence>
    </div>
  );
};
