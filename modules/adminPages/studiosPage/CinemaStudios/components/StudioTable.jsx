import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys";
import TableRowMenu from "@/components/TableRowMenu";

export const StudioTable = ({ dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const session = useSession();
  const router = useRouter();
  const cinemaStudios = query({
    queryKey: cinemaStudioQueryKeys.allStudio,
    url: "/api/cinemas/" + session.data?.user.cinemaId + "/studios",
    enabledCondition: session.data !== undefined,
  });

  const cinemaStudioTableColumns = [
    { accessorKey: "id", header: "Id", cell: (info) => info.getValue() },
    {
      accessorKey: "studio",
      header: "Studio",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
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
            columns={cinemaStudioTableColumns}
            data={cinemaStudios.data}
            dataStatus={cinemaStudios.status}
            selectedRow={selectedRow}
            setSelectedData={(data) =>
              dispatch({ type: "set_selected_data", selectedData: data })
            }
            setSelectedRow={setSelectedRow}
            rowMenu={(row) => (
              <TableRowMenu>
                <TableRowMenu.Link
                  href={`/admin/studios/${cinemaStudios.data[row.id].id}`}
                >
                  View Studio Details
                </TableRowMenu.Link>
                <TableRowMenu.Button
                  onClick={() =>
                    router.push(
                      `/admin/studios?id=${row.original.id}&edit=true`
                    )
                  }
                >
                  Edit Studio Details
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </AnimatedContainer>
    </div>
  );
};
