import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addMovie = ({ title, duration, synopsis, cast }) => {
  const sideEffects = createSideEffects({
    context: "add",
    object: "movie",
    redirect: true,
    redirectUrl: "/manager/movies",
  });
  const addMovieMutation = mutation({
    url: "/api/movies",
    body: {
      title: title,
      duration: duration,
      synopsis: synopsis,
      cast: cast,
    },
    method: "POST",
    sideEffects: sideEffects,
  });
  return addMovieMutation;
};
