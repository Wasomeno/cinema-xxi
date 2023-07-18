import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { query } from "@/components/reactQuery/queries/query";
import TableRowMenu from "@/components/TableRowMenu";

export const StudioShowtimesTable = ({ dispatch }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState({});

  const session = useSession();
  const studioShowtimes = query({
    url: `/api/cinemas/${session.data?.user.cinemaId}/studios/${router.query.studioId}/showtimes`,
    queryKey: ["studioShowtimes", router.query.studioId],
    enabledCondition: session.status !== "loading",
  });

  const cinemaStudioShowtimesTableColumns = [
    { accessorKey: "id", header: "Id", cell: (info) => info.getValue() },
    {
      accessorKey: "showtimeHour",
      header: "Showtime Hour",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "showtimeMinutes",
      header: "Showtime Minutes",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "movieTitle",
      header: "Movie Title",
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
            columns={cinemaStudioShowtimesTableColumns}
            data={studioShowtimes.data}
            dataStatus={studioShowtimes.status}
            selectedRow={selectedRow}
            setSelectedData={(data) =>
              dispatch({ type: "set_selected_data", selectedData: data })
            }
            setSelectedRow={setSelectedRow}
            rowMenu={(row) => (
              <TableRowMenu>
                <TableRowMenu.Button
                  onClick={() => {
                    dispatch({
                      type: "set_data_details",
                      details: studioShowtimes.data[row.id],
                    });
                    dispatch({ type: "open_details_modal" });
                  }}
                >
                  View Studio Showtimes
                </TableRowMenu.Button>
                <TableRowMenu.Button
                  onClick={() => {
                    dispatch({
                      type: "set_data_details",
                      details: studioShowtimes.data[row.id],
                    });
                    dispatch({ type: "open_edit_modal" });
                  }}
                >
                  Edit Studio Showtimes
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </AnimatedContainer>
    </div>
  );
};
