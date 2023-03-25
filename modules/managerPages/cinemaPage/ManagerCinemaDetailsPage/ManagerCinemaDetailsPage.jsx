import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useCinemaDetails } from "@/components/reactQuery/queries/Cinema/useCinemaDetails";

import CinemaDetailsCard from "./components/CinemaDetailsCard";

export const ManagerCinemaDetailsPage = () => {
  const { query } = useRouter();
  const cinemaDetails = useCinemaDetails(query?.cinemaId);

  if (cinemaDetails.isLoading)
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center gap-4">
        <p className="font-poppins text-xs">Fetching cinema details</p>
        <MoonLoader
          loading={cinemaDetails.isLoading}
          size="30"
          color="black"
          speedMultiplier={0.75}
        />
      </div>
    );

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>{cinemaDetails.data?.name}</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <div className="mt-3 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 lg:text-sm">
                Details
              </p>
            </div>

            <div className="flex w-full snap-x gap-4 overflow-x-scroll">
              <div className="flex w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full">
                  <CinemaDetailsCard
                    title="Studios"
                    value={cinemaDetails.data?.studio.length}
                  />
                  <CinemaDetailsCard
                    title="Movies"
                    value={cinemaDetails.data?.movie.length}
                    withLink
                    link={
                      "/manager/region/" +
                      query?.regionId +
                      "/" +
                      query?.cinemaId +
                      "/movies"
                    }
                  />
                  <CinemaDetailsCard
                    title="Showtimes"
                    value={cinemaDetails.data?.showtimes.length}
                    withLink
                    link={
                      "/manager/region/" +
                      query?.regionId +
                      "/" +
                      query?.cinemaId +
                      "/showtimes"
                    }
                  />
                  <CinemaDetailsCard
                    title="Capacity Total"
                    value={cinemaDetails.data?.studio.reduce(
                      (currentTotal, details) => {
                        return details.capacity + currentTotal;
                      },
                      0
                    )}
                  />
                </div>
              </div>
              <div className="flex h-full w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full">
                  <CinemaDetailsCard
                    title="Admins"
                    value={cinemaDetails.data?.admin?.length}
                    withLink
                    link={
                      "/manager/region/" +
                      query?.regionId +
                      "/" +
                      query?.cinemaId +
                      "/admins"
                    }
                  />
                  <CinemaDetailsCard
                    title="Transactions"
                    value={cinemaDetails.data?.transactions.length}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 lg:text-sm">
                Ticket Sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
