import { prisma } from "lib/prisma";
import { ManagerMoviesPage } from "modules/managerPages/moviesPage/ManagerMoviesPage";

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany();
  return {
    props: {
      movies: movies,
    },
  };
}

const ManageMovies = ({ movies }) => {
  return <ManagerMoviesPage movies={movies} />;
};

export default ManageMovies;
