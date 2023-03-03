/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";

export const query = ({ queryKey, url }) => {
  const result = useQuery(queryKey, () =>
    fetch(url, { method: "GET" }).then((result) => result.json())
  );
  return result;
};
