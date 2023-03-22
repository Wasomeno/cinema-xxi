import { useQuery } from "@tanstack/react-query";

export const query = ({ queryKey, url, enabledCondition }) => {
  console.log(enabledCondition);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery(
    queryKey,
    () => fetch(url, { method: "GET" }).then((result) => result.json()),
    { enabled: enabledCondition }
  );
  return result;
};
