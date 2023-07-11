import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions";
import TableRowMenu from "@/components/TableRowMenu";

export const AllRegionsTable = ({ dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const router = useRouter();
  const allRegions = useAllRegions();

  const regionTableColumns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "cinemaAmount",
      header: "Cinema Amount",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <AnimatedContainer className="flex flex-1 flex-col ">
      <div className="w-full">
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
            columns={regionTableColumns}
            data={allRegions.data}
            dataStatus={allRegions.status}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            setSelectedData={(data) =>
              dispatch({ type: "set_selected_data", selectedData: data })
            }
            rowMenu={(row) => (
              <TableRowMenu>
                <TableRowMenu.Button
                  onClick={() =>
                    router.push("/manager/regions/" + row.getValue("id"))
                  }
                >
                  View Region
                </TableRowMenu.Button>
                <TableRowMenu.Button
                  onClick={() => {
                    dispatch({
                      type: "set_data_details",
                      details: allRegions.data[row.id],
                    });
                    dispatch({ type: "open_edit_modal" });
                  }}
                >
                  Edit Region
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </div>
    </AnimatedContainer>
  );
};
