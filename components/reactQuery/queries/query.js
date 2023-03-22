import { useQuery } from "@tanstack/react-query";

export const query = ({ queryKey, url }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery(queryKey, () =>
    fetch(url, { method: "GET" }).then((result) => result.json())
  );
  return result;
};
