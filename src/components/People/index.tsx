import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "../Checkbox/CheckBox";
import {
  extractNumberFromUrl,
  formatDate,
  toTitleCase,
} from "../../utils/helpers";
import { Table } from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { IPeople } from "../../utils/helpers/types/interfaces";
import { useGetPeople } from "../../hooks/queries";
import { Skeleton } from "antd";

const columns: ColumnDef<IPeople>[] = [
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
    accessorKey: "birth_year",
    header: "Birth Year",
    cell: ({ row }) => toTitleCase(row.original.birth_year),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => toTitleCase(row.original.gender),
  },
  {
    accessorKey: "hair_color",
    header: "Hair Color",
    cell: ({ row }) => toTitleCase(row.original.hair_color),
  },
  {
    accessorKey: "average_height",
    header: "Height",
    cell: ({ row }) => <span>{`${row.original.height} CM`}</span>,
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.created, "M/dd/yy"),
  },
];

export default function People() {
  const navigate = useNavigate();

  const handleRowClick = (row: Row<IPeople>) => {
    const id = extractNumberFromUrl(row.original.url);
    navigate(`/details/${id}?viewFrom=people`);
  };

  const { data, isLoading } = useGetPeople();

  return (
    <div>
      <div className="mt-[6rem] pb-32">
        <p className="text-borderlight text-base font-normal mb-24">People</p>
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
