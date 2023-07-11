import Image from "next/image";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataSection from "@/components/DataSection";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import TableRowMenu from "@/components/TableRowMenu";

export const AllMoviesTable = ({ dispatch }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const allMovies = useAllMovies();

  const movieTableColumns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image_url",
      header: "Image",
      cell: (info) => (
        <div className="flex items-center justify-center">
          <Image
            src={info.getValue()}
            alt="movie-image"
            width={90}
            height={180}
            className="rounded-lg"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <AnimatedContainer className="flex flex-1 flex-col">
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
            columns={movieTableColumns}
            dataStatus={allMovies.status}
            data={allMovies.data}
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
                      details: allMovies.data[row.id],
                    });
                    dispatch({
                      type: "open_details_modal",
                    });
                  }}
                >
                  View Movie
                </TableRowMenu.Button>
                <TableRowMenu.Button
                  onClick={() => {
                    dispatch({
                      type: "set_data_details",
                      details: allMovies.data[row.id],
                    });
                    dispatch({
                      type: "open_edit_modal",
                    });
                  }}
                >
                  Edit Movie
                </TableRowMenu.Button>
              </TableRowMenu>
            )}
          />
        </DataSection>
      </div>
    </AnimatedContainer>
  );
};
