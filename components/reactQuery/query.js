import { useQuery } from "@tanstack/react-query";
import { queryClientApp } from "../../client/reactQueryClient";

export const query = (queryKey, queryFunction) => {
  const result = useQuery(queryKey, async () => await queryFunction);
  return result;
};

export const invalidateQueries = (keys) => {
  queryClientApp.invalidateQueries(keys);
};
