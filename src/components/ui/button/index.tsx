import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "flex justify-center items-center rounded-lg duration-300 shadow-sm transition-all disabled:opacity-30 text-black font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-200 hover:bg-gray-300",
        primary: "bg-slate-900 hover:bg-slate-800 text-white",
      },
      size: {
        default: "py-2 px-4 lg:text-sm text-xs",
        medium: "py-3 px-5 text-base lg:text-sm",
        large: "py-4 px-6 lg:text-lg text-base ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonVariants
>(({ variant, size, className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(clsx(buttonVariants({ variant, size, className })))}
    />
  )
})

Button.displayName = "Button"
