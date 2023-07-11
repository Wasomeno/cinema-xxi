import { useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";
import TableRowMenu from "@/components/TableRowMenu";

export const CinemaAdminsTable = ({ dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const session = useSession();

  const cinemaAdmins = query({
    url: `/api/cinemas/${session.data?.user.cinemaId}/admins`,
    queryKey: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
    enabledCondition: session.data !== undefined,
  });

  const cinemaAdminsTableColumns = [
    {
      id: "id",
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
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
            columns={cinemaAdminsTableColumns}
            data={cinemaAdmins.data}
            dataStatus={cinemaAdmins.status}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            setSelectedData={(data) =>
              dispatch({ type: "set_selected_data", selectedData: data })
            }
            rowMenu={(row) => (
              <TableRowMenu>
                <TableRowMenu.Button
                  onClick={() => {
                    dispatch({
                      type: "set_data_details",
                      details: cinemaAdmins.data[row.id],
                    });
                    dispatch({ type: "open_edit_modal" });
                  }}
                >
                  Edit Admin
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </AnimatedContainer>
    </div>
  );
};
