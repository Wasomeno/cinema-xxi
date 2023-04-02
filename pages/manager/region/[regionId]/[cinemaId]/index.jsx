import { prisma } from "lib/prisma";
import { ManagerCinemaDetailsPage } from "modules/managerPages/cinemaPage/ManagerCinemaDetailsPage";

export async function getStaticPaths() {
  const regions = await prisma.region.findMany({ include: { cinema: true } });
  const regionAndCinemaIds = regions.map((region) => {
    return region.cinema.map((cinema) => ({
      params: {
        regionId: region.id.toString(),
        cinemaId: cinema.id.toString(),
      },
    }));
  });

  return { paths: regionAndCinemaIds.flat(), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
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
    revalidate: 30,
  };
}

const CinemaDetails = ({ cinemaDetails }) => {
  console.log(cinemaDetails);
  return <ManagerCinemaDetailsPage />;
};

export default CinemaDetails;
