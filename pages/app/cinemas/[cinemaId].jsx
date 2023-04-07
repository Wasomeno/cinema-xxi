import { prisma } from "lib/prisma";
import { CinemaMoviesPage } from "modules/appPages/cinemaPages/CinemaMoviesPage";

export async function getStaticPaths() {
  const cinemas = await prisma.cinema.findMany();
  const cinemaPaths = cinemas.map((cinema) => ({
    params: { cinemaId: cinema.id.toString() },
  }));

  return { paths: cinemaPaths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { params } = context;
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      movie: {
        where: { cinema: { every: { id: parseInt(params.cinemaId) } } },
      },
    },
  });

  return { props: { cinemaDetails }, revalidate: 30 };
}

const CinemaMovies = ({ cinemaDetails }) => {
  return <CinemaMoviesPage cinemaDetails={cinemaDetails} />;
};

export default CinemaMovies;
