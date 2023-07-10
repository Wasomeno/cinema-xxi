import { prisma } from "lib/prisma";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";

export async function getServerSideProps({ params }) {
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      cinema_movie: true,
      region: true,
      showtimes: true,
      studios: true,
      transactions: true,
    },
  });
  return {
    props: {
      cinemaDetails: {
        ...cinemaDetails,
        transactions: cinemaDetails.transactions.map((transaction) => ({
          ...transaction,
          showtime: transaction.showtime.toString(),
          createdAt: transaction.createdAt.getSeconds(),
        })),
      },
    },
  };
}

const CinemaDetails = ({ cinemaDetails }) => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>{cinemaDetails.name}</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <div className="mt-3 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 dark:text-slate-50 lg:text-sm">
                Details
              </p>
            </div>

            <div className="flex w-full snap-x gap-4 overflow-x-scroll">
              <div className="flex w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full"></div>
              </div>
              <div className="flex h-full w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 dark:text-slate-50 lg:text-sm">
                Ticket Sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default CinemaDetails;
