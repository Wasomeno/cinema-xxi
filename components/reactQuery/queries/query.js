import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const query = ({ queryKey, url, enabledCondition }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    queryKey,
    async () => {
      const { data } = await axios.get(url)
      return data
    },
    {
      enabled: enabledCondition,
    }
  )
}
