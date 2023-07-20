import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";
import TableRowMenu from "@/components/TableRowMenu";

export const ShowtimesTable = ({ dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const router = useRouter();
  const session = useSession();

  const cinemaShowtimes = query({
    queryKey: cinemaQueryKeys.cinemaShowtimes(session.data?.user.cinemaId),
    url: "/api/cinemas/" + session.data?.user.cinemaId + "/showtimes",
    enabledCondition: session.data !== undefined,
  });

  const cinemaShowtimeTableColumns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "hour",
      header: "Hour",
      cell: (info) => {
        return info.getValue();
      },
    },
    {
      accessorKey: "minutes",
      header: "Minutes",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <div className="flex justify-center">
      <AnimatedContainer className="w-full">
        <DataSection>
          <DataSection.Toolbar>
            <DataSection.Toolbar.AddButton
              onClick={() => dispatch({ type: "open_add_modal" })}
            />
            <DataSection.Toolbar.DeleteButton
              disabled={!Object.keys(selectedRow).length}
              onClick={() => dispatch({ type: "open_delete_modal" })}
            />
          </DataSection.Toolbar>
          <DataSection.Table
            columns={cinemaShowtimeTableColumns}
            data={cinemaShowtimes.data}
            dataStatus={cinemaShowtimes.status}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            rowMenu={(row) => (
              <TableRowMenu>
                <TableRowMenu.Button
                  onClick={() =>
                    router.push(
                      `/admin/showtimes?id=${row.original.id}&edit=true`
                    )
                  }
                >
                  Edit Showtime
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </AnimatedContainer>
    </div>
  );
};
