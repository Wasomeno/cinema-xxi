import React, { ReactNode } from "react"

export default function Table({ children }: { children: ReactNode }) {
  return (
    <table className="w-full border-collapse bg-slate-50 text-left text-sm text-gray-500  dark:text-slate-100">
      {children}
    </table>
  )
}

const Head = ({ children }: { children: ReactNode }) => {
  return <thead className="bg-blue-100 dark:bg-slate-700">{children}</thead>
}

const Body = ({ children }: { children: ReactNode }) => {
  return (
    <tbody className="relative divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
      {children}
    </tbody>
  )
}

Table.Head = Head
Table.Body = Body
