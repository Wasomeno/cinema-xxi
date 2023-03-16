import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import AnimatedContainer from "@/components/AnimatedContainer";
import { useMovieDetails } from "@/components/reactQuery/queries/Movie/useMovieDetails";
import { Title } from "@/components/shared/Texts";

import { useMoviePageValueContext } from "./components/context/appMoviePageContext";
import { DateColumn } from "./components/DateColumn";
import { MovieShowtimesList } from "./components/MovieShowtimesList";

const SeatsModal = dynamic(() =>
  import("./components/SeatsModal").then((component) => component.SeatsModal)
);
const TicketConfirmationModal = dynamic(() =>
  import("./components/TicketConfirmationModal")
);

export const AppMoviePage = () => {
  const { modalState, router } = useMoviePageValueContext();
  const { movieId } = router?.query;
  const fetchedMovieDetails = useMovieDetails({ movieId: movieId });

  return (
    <AnimatedContainer className="h-screen">
      <div className="my-4 text-center">
        <Title>{fetchedMovieDetails.data?.title}</Title>
      </div>
      <div className="flex w-full items-start justify-center gap-5 ">
        <div className="flex w-5/12 justify-center p-2 sm:h-full sm:w-3/12 md:h-full md:w-4/12 lg:h-full lg:w-4/12 xl:w-3/12">
          <div className="h-44 w-full rounded-lg bg-slate-400 sm:h-52 md:h-64 md:w-4/6 lg:h-80" />
        </div>
        <div className="flex w-5/12 flex-col gap-4 p-2">
          <div>
            <p className="mb-2 font-poppins text-xs md:text-sm">Synopsis</p>
            <p className="overflow-hidden text-ellipsis text-xs tracking-wide"></p>
          </div>
          <div className="w-full">
            <p className="mb-2 font-poppins text-xs md:text-sm">Casts</p>
          </div>
        </div>
      </div>
      <DateColumn />
      <MovieShowtimesList />
      <AnimatePresence>
        {modalState === "seats" && <SeatsModal />}
        {modalState === "ticket" && <TicketConfirmationModal />}
      </AnimatePresence>
    </AnimatedContainer>
  );
};
