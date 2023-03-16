import { AppMoviePage } from "modules/appPages/moviePage/AppMoviePage";
import { AppMoviePageProvider } from "modules/appPages/moviePage/components/context/AppMoviePageProvider";

const AppMovie = () => {
  return (
    <AppMoviePageProvider>
      <AppMoviePage />
    </AppMoviePageProvider>
  );
};

export default AppMovie;
