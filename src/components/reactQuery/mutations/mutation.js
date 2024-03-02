/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query"

const mutation = ({ url, body, sideEffects, method }) => {
  const mutationResult = useMutation({
    mutationFn: async () => {
      const result = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      if (!result.ok) {
        let errorObject = { code: 0, message: "" }
        switch (result.status) {
          case 400:
            errorObject.code = 400
            errorObject.message = "Error: Bad Request"
            break
          case 404:
            errorObject.code = 400
            errorObject.message = "Error: API Endpoint Not Found"
            break
          case 500:
            errorObject.code = 500
            errorObject.message = "Error: Internal Server Error"
            break
          default:
            errorObject.code = 500
            errorObject.message = "Error: API Error"
        }
        throw Error((errorObject.code, errorObject.message))
      }
      return result
    },
    ...sideEffects,
  })
  return mutationResult
}

export default mutation
