import { useQuery } from "@tanstack/react-query";
import { queryClientApp } from "client/reactQueryClient";
import { useEffect, useState } from "react";

export function useSearchCinema({ searchTerm }) {
  //   const [cinemas, setCinemas] = useState([]);
  const cinemas = useQuery({
    queryKey: ["cinemaSearch", searchTerm],
    queryFn: async () => {
      return await fetch("/api/cinemas/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: searchTerm }),
      }).then((response) => response.json());
    },
  });

  return cinemas;
}
