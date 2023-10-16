import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { ClassArray } from "clsx"
import { twMerge } from "tailwind-merge"

import { cn } from "@/lib/utils"

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
}

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

export const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs lg:text-sm">{label}</label>
      <input
        className={cn(
          "rounded-lg border bg-slate-50 px-2 py-2 text-xs dark:border-slate-600 dark:bg-slate-700 lg:text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}

const Submit = ({
  text,
  className,
}: {
  text: string
  className?: ClassArray
}) => {
  return (
    <div className="my-3 text-center">
      <button
        className={cn(
          "h-10 w-44 rounded-lg border border-slate-300 text-xs font-medium transition duration-200 hover:bg-green-200 dark:border-slate-700 dark:hover:bg-green-800 lg:text-sm",
          className
        )}
      >
        {text}
      </button>
    </div>
  )
}

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={cn(
        "h-40 rounded-lg border border-slate-500 p-2 font-poppins text-xs dark:bg-slate-700 lg:text-sm",
        className
      )}
      {...props}
    />
  )
}

Form.Submit = Submit
Form.Input = Input
Form.TextArea = TextArea
