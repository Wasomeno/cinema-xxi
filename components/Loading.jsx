import { AnimatePresence } from "framer-motion"

import { useLoadingDetails } from "../stores/loadingStore"
import { CenteredModalContainer } from "./ModalContainer"
import { Spinner } from "./Spinner"

const Loading = () => {
  const [loading, loadingText] = useLoadingDetails()
  return (
    <AnimatePresence>
      {loading && (
        <CenteredModalContainer className="flex h-3/6 flex-col items-center justify-center gap-5 border dark:border-slate-600 lg:h-80 lg:w-72 ">
          <span className="font-poppins text-sm font-medium lg:text-base">
            {loadingText}
          </span>
          <Spinner />
        </CenteredModalContainer>
      )}
    </AnimatePresence>
  )
}

export default Loading
