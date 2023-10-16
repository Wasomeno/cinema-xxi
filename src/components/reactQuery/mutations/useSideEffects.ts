"use client"

import { useRouter } from "next/navigation"
import { reactQueryClient } from "@/client/reactQueryClient"
import { useLoading } from "@/stores/loadingStore"
import { useToast } from "@/stores/toastStore"

export const useSideEffects = ({
  text,
  queryKeys,
  redirectUrl,
}: {
  text: string
  queryKeys?: string[]
  redirectUrl?: string
}) => {
  const { setLoading, setText } = useLoading()
  const toast = useToast()
  const router = useRouter()
  return {
    onMutate: () => {
      setText(text)
      setLoading(true)
    },
    onError: (error: any) => {
      let errorMessage
      if (error.reason) {
        errorMessage = error.reason
      } else if (error.message) {
        errorMessage = error.message
      }
      setLoading(false)
      toast.error(errorMessage)
    },
    onSuccess: async (response: any) => {
      const responseJson = await response.json()
      setLoading(false)
      toast.success(responseJson.message)
      redirectUrl && router.push(redirectUrl)
      queryKeys && reactQueryClient.invalidateQueries(queryKeys)
    },
  }
}
