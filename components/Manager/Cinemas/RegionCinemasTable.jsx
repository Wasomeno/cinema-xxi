import { useState } from "react";

import DataSection from "@/components/DataSection";
import { query } from "@/components/reactQuery/queries/query";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";
import TableRowMenu from "@/components/TableRowMenu";

export const RegionCinemasTable = ({ regionId, dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});

  const regionCinemas = query({
    url: `/api/regions/${regionId}/cinemas`,
    queryKey: regionQueryKeys.regionCinemas(regionId),
  });

  const cinemaTableColumns = [
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
  ];

  return (
    <DataSection>
      <div className="mb-2 mt-4">
        <span className="font-poppins text-xs tracking-wide lg:text-sm">
          Cinema List
        </span>
      </div>
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
        columns={cinemaTableColumns}
        data={regionCinemas.data}
        dataStatus={regionCinemas.status}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setSelectedData={(data) =>
          dispatch({ type: "set_selected_data", selectedData: data })
        }
        rowMenu={(row) => (
          <TableRowMenu>
            <TableRowMenu.Link
              href={`/manager/regions/${regionId}/${
                regionCinemas.data[row.id]?.id
              }`}
            >
              View Cinema Details
            </TableRowMenu.Link>
          </TableRowMenu>
        )}
      />
    </DataSection>
  );
};
