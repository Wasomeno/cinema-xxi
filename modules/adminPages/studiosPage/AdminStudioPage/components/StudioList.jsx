import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

import DataContainer from "@/components/DataContainer";
import { useCinemaStudios } from "@/components/reactQuery/queries/Cinema/useCinemaStudios";
import { Paragraph } from "@/components/shared/Texts";

import { StudioListMenu } from "./StudioListMenu";

export const StudioList = ({ showMenu, toggleShowMenu }) => {
  const adminDetails = useAdminDetailsContext();
  const cinemaStudios = useCinemaStudios(adminDetails?.cinema);
  return (
    <DataContainer
      className="flex flex-col items-center justify-start gap-3"
      loading={cinemaStudios.isLoading}
      object="studios"
    >
      {cinemaStudios.data?.studio.length < 1 ? (
        <div className="flex h-72 items-center">
          <Paragraph size="sm">No Active Studio</Paragraph>
        </div>
      ) : (
        cinemaStudios.data?.studio.map((studio) => (
          <Link
            key={studio.id}
            href={"/admin/studios/" + studio.id}
            className="flex h-14 w-full items-center justify-center rounded-md bg-slate-200 p-2 shadow-sm"
          >
            <div className="w-2/6 text-center">
              <Paragraph size="sm">{"Studio " + studio.studio}</Paragraph>
            </div>
          </Link>
        ))
      )}
      <AnimatePresence>
        {showMenu && <StudioListMenu toggleShowMenu={toggleShowMenu} />}
      </AnimatePresence>
    </DataContainer>
  );
};
