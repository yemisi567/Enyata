import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "../Checkbox/CheckBox";
import { extractNumberFromUrl, formatDate } from "../../utils/helpers";
import { IFilms } from "../../utils/helpers/types/interfaces";
import { Table } from "../Table/Table";
import { Card } from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useGetFilms } from "../../hooks/queries";
import { Skeleton } from "antd";

const columns: ColumnDef<IFilms>[] = [
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
      <div className="px-[3rem]">
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
    accessorKey: "title",
    header: "Film title",
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
    cell: ({ row }) => formatDate(row.original.release_date, "M/dd/yy"),
  },

  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "producer",
    header: "Producer",
  },
  {
    accessorKey: "episode_id",
    header: "Episode ID",
  },
  {
    accessorKey: "returning_client",
    header: "Character",
    cell: ({ row }) => <div>{row.original.characters[0]}</div>,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleRowClick = (row: Row<IFilms>) => {
    const id = extractNumberFromUrl(row.original.url);
    navigate(`/details/${id}?viewFrom=overview`);
  };

  const { data, isLoading } = useGetFilms();

  return (
    <div className="w-full">
      <div className="flex gap-[6rem] mt-32">
        <Card classNames="w-[20.8rem] h-[13rem] !border-transparent shadow-lg shadow-textgray/25">
          <div className="flex justify-between items-center">
            <p className="text-base text-textgray font-bold">Films</p>
            <div className="h-[2.7rem] w-[2.7rem] bg-[#A9FFE0] rounded-r5 " />
          </div>
          <p className="text-base text-textgray font-bold mt-24">200</p>
          <p className="text-[9px] text-green font-normal mt-4">
            20 More than yesterday
          </p>
        </Card>
        <Card classNames="w-[20.8rem] h-[13rem] !border-transparent shadow-lg shadow-textgray/25">
          <div className="flex justify-between items-center">
            <p className="text-base text-textgray font-bold">Starship</p>
            <div className="h-[2.7rem] w-[2.7rem] bg-[#A9C1FF] rounded-r5 " />
          </div>
          <p className="text-base text-textgray font-bold mt-24">200</p>
          <p className="text-[9px] text-green font-normal mt-4">
            20 More than than yesterday
          </p>
        </Card>
        <Card classNames="w-[20.8rem] h-[13rem] !border-transparent shadow-lg shadow-textgray/25">
          <div className="flex justify-between items-center">
            <p className="text-base text-textgray font-bold">People</p>
            <div className="h-[2.7rem] w-[2.7rem] bg-[#FFA9EC] rounded-r5 " />
          </div>
          <p className="text-base text-textgray font-bold mt-24">200</p>
          <p className="text-[9px] text-green font-normal mt-4">
            20 More than than yesterday
          </p>
        </Card>
        <Card classNames="w-[20.8rem] h-[13rem] !border-transparent shadow-lg shadow-textgray/25">
          <div className="flex justify-between items-center">
            <p className="text-base text-textgray font-bold">Species</p>
            <div className="h-[2.7rem] w-[2.7rem] bg-[#FDFFA9] rounded-r5 " />
          </div>
          <p className="text-base text-textgray font-bold mt-24">200</p>
          <p className="text-[9px] text-green font-normal mt-4">
            20 More than than yesterday
          </p>
        </Card>
      </div>

      <div className="w-full mt-[6rem] pb-32">
        <p className="text-borderlight text-base font-normal mb-24">Films</p>
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
