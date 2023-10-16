import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { movieQueryKeys } from "../queryKeys/movieQueryKeys"

export function useAllMovies() {
  return useQuery<Movie[]>(movieQueryKeys.allMovies, () =>
    fetch("/api/movies").then((result) => result.json())
  )
}
