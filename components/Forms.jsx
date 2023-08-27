import React from "react"
import { twMerge } from "tailwind-merge"

export const Form = ({ children, onSubmit, className }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className={className}
    >
      {children}
    </form>
  )
}

const Input = ({ type = "", labelText = "", value, setValue }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs lg:text-sm">{labelText}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="rounded-lg border bg-slate-50 px-2 py-2 text-xs dark:border-slate-600 dark:bg-slate-700 lg:text-sm"
      />
    </div>
  )
}

const Submit = ({ text = "", className }) => {
  return (
    <div className="my-3 text-center">
      <button
        className={twMerge(
          "h-10 w-44 rounded-lg border border-slate-300 text-xs font-medium transition duration-200 hover:bg-green-200 dark:border-slate-700 dark:hover:bg-green-800 lg:text-sm",
          className
        )}
      >
        {text}
      </button>
    </div>
  )
}

const TextArea = ({ id, value, setValue, width }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className={
        "h-40 rounded-lg border border-slate-500 p-2 font-poppins text-xs dark:bg-slate-700 lg:text-sm" +
        " " +
        "w-" +
        width
      }
    />
  )
}

Form.Submit = Submit
Form.Input = Input
Form.TextArea = TextArea
