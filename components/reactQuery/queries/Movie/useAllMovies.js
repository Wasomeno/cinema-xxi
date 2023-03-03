import { query } from "../../query";
import { movieKeys } from "./movieQueryKeysFactory";

export const useAllMovies = () => {
  const movies = query({ queryKey: movieKeys.allMovies, url: "/api/movies" });
  return movies;
};
