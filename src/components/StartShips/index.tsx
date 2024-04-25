import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "../Checkbox/CheckBox";
import { extractNumberFromUrl, toTitleCase } from "../../utils/helpers";
import { Table } from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { IStartships } from "../../utils/helpers/types/interfaces";
import { useGetStarShips } from "../../hooks/queries";
import { Skeleton } from "antd";

const columns: ColumnDef<IStartships>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="py-[2rem] pl-[3rem]">
        <Checkbox
          handleChange={table.getToggleAllRowsSelectedHandler()}
          indeterminate={table.getIsSomeRowsSelected()}
          label=""
          name="row"
          value="row"
          isChecked={table.getIsAllRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-[3rem]">
        <Checkbox
          handleChange={row.getToggleSelectedHandler()}
          indeterminate={row.getIsSomeSelected()}
          label=""
          name="row"
          value="row"
          isChecked={row.getIsSelected()}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => toTitleCase(row.original.name),
  },

  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => toTitleCase(row.original.model),
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => toTitleCase(row.original.class || "Starfighter"),
  },
  {
    accessorKey: "passenger",
    header: "Passenger",
    cell: ({ row }) => toTitleCase(row.original.passengers),
  },
  {
    accessorKey: "length",
    header: "Length",
    cell: ({ row }) => <span>{`${row.original.length} CM`}</span>,
  },
  {
    accessorKey: "character",
    header: "Character",
    cell: ({ row }) => row.original.character || "https://swapi.dev/api/people",
  },
];

export default function StartShips() {
  const navigate = useNavigate();

  const handleRowClick = (row: Row<IStartships>) => {
    const id = extractNumberFromUrl(row.original.url);
    navigate(`/details/${id}?viewFrom=starship`);
  };

  const { data, isLoading } = useGetStarShips();

  return (
    <div>
      <div className="mt-[6rem] pb-32">
        <p className="text-borderlight text-base font-normal mb-24">
          Starships
        </p>
        {isLoading && (
          <div className="flex flex-col gap-y-[25px]">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
        {data && (
          <Table
            columns={columns}
            data={data.results}
            handleRowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}
