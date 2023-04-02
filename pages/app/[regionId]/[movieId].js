import { prisma } from "lib/prisma";
import { AppMoviePage } from "modules/appPages/moviePage/AppMoviePage";
import { AppMoviePageProvider } from "modules/appPages/moviePage/components/context/AppMoviePageProvider";

export async function getStaticPaths() {
  const movies = await prisma.movie.findMany();
  const regions = await prisma.region.findMany();

  const regionAndMovieIds = regions.map((region) => {
    const ids = movies.map((movie) => ({
      params: { regionId: region.id.toString(), movieId: movie.id.toString() },
    }));
    return ids;
  });

  const flattedIds = regionAndMovieIds.flat();

  return { paths: flattedIds, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { params } = context;
  const movieDetails = await prisma.movie.findUnique({
    where: { id: parseInt(params.movieId) },
  });

  const movieShowtimes = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
    select: {
      cinema: {
        include: {
          movie: {
            where: { id: parseInt(params.movieId) },
            select: {
              showtime: {
                where: { movieId: parseInt(params.movieId) },
                include: { movie: true, studio: true, cinema: true },
              },
            },
          },
        },
      },
    },
  });
  const movieShowtimesFlat = movieShowtimes.cinema.flatMap((cinema) => ({
    id: cinema.id,
    regionId: cinema.regionId,
    name: cinema.name,
    showtimes: cinema.movie.flatMap((cinemaShowtime) =>
      cinemaShowtime.showtime.flat()
    ),
  }));

  return {
    props: {
      movieDetails: movieDetails,
      movieShowtimes: movieShowtimesFlat,
    },
    revalidate: 30,
  };
}

const AppMovie = ({ movieDetails, movieShowtimes }) => {
  return (
    <AppMoviePageProvider>
      <AppMoviePage
        movieDetails={movieDetails}
        movieShowtimes={movieShowtimes}
      />
    </AppMoviePageProvider>
  );
};

export default AppMovie;
