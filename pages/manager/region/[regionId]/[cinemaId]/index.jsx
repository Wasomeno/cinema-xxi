import { prisma } from "lib/prisma";
import { ManagerCinemaDetailsPage } from "modules/managerPages/cinemaPage/ManagerCinemaDetailsPage";

export async function getServerSideProps({ params }) {
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      movie: true,
      region: true,
      showtimes: true,
      studio: true,
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
  return <ManagerCinemaDetailsPage cinemaDetails={cinemaDetails} />;
};

export default CinemaDetails;
