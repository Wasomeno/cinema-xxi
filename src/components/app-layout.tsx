import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

import { AnimatedContainer, AnimatedContainerProps } from "./animated-container"

export const AppLayout: React.FC<AnimatedContainerProps> = (props) => {
  return (
    <AnimatedContainer
      {...props}
      className={twMerge("flex w-full flex-1 flex-col", props.className)}
    >
      {props.children}
    </AnimatedContainer>
  )
}
