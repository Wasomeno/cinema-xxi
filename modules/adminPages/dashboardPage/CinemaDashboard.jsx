import { useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useSession } from "next-auth/react"
import { Line } from "react-chartjs-2"

import AnimatedContainer from "@/components/AnimatedContainer"
import { ChartComponent } from "@/components/ChartComponent"
import AdminHeader from "@/components/Headers/AdminHeader"
import { query } from "@/components/reactQuery/queries/query"

function getMonths() {
  let months = []
  for (let i = 0; i < 12; i++) {
    const time = new Date()
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      time.setMonth(i)
    )
    months.push({ index: time.getMonth(), month })
  }
  return months
}

export const CinemaDashboard = () => {
  const timeNow = new Date()
  const [selectedMonth, setSelectedMonth] = useState(
    getMonths()[timeNow.getMonth()]
  )

  const session = useSession()
  const cinemaMonthlyTransactions = query({
    queryKey: [selectedMonth.month],
    url: `/api/cinemas/${session.data?.user.cinemaId}/transactions/${
      selectedMonth.index + 1
    }`,
    enabledCondition: session.data !== undefined,
  })

  return (
    <AnimatedContainer className="flex flex-1 flex-col rounded-lg p-4">
      <AdminHeader>{session.data?.user.cinemaName}</AdminHeader>
      <div className="my-4 flex w-full flex-wrap items-center justify-start gap-4 lg:flex-nowrap">
        <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-slate-300 p-4 lg:w-3/6">
          <ChartComponent
            Chart={Line}
            labels={cinemaMonthlyTransactions.data?.map(
              (transaction) => transaction.date
            )}
            data={cinemaMonthlyTransactions.data?.map(
              (transaction) => transaction.total
            )}
            legend="Monthly Ticket Sales"
          />
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="w-28 rounded-lg border bg-slate-100 py-1.5 font-poppins text-sm">
                {selectedMonth.month}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-48 rounded-md bg-slate-100 px-1.5 py-3 font-poppins text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-700 ">
                  {getMonths().map((month) => (
                    <DropdownMenu.Item key={month.index}>
                      <button
                        onClick={() => setSelectedMonth(month)}
                        className="w-full rounded-md px-2 py-1.5 text-start transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600"
                      >
                        {month.month}
                      </button>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-slate-300 p-4 lg:w-3/6">
          <ChartComponent
            Chart={Line}
            labels={cinemaMonthlyTransactions.data?.map(
              (transaction) => transaction.date
            )}
            data={cinemaMonthlyTransactions.data?.map(
              (transaction) => transaction.total
            )}
            legend="Monthly Ticket Sales"
          />
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="w-28 rounded-lg border bg-slate-100 py-1.5 font-poppins text-sm">
                {selectedMonth.month}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-48 rounded-md bg-slate-100 px-1.5 py-3 font-poppins text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-700 ">
                  {getMonths().map((month) => (
                    <DropdownMenu.Item key={month.index}>
                      <button
                        onClick={() => setSelectedMonth(month)}
                        className="w-full rounded-md px-2 py-1.5 text-start transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600"
                      >
                        {month.month}
                      </button>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
