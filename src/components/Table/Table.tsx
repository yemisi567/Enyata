import * as React from "react";
import {
  useReactTable,
  flexRender,
  ColumnDef,
  Row,
  RowSelectionState,
  getCoreRowModel,
  OnChangeFn,
  VisibilityState,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { cn } from "../../utils/helpers";

interface TableProps<TData> {
  /** Table data */
  data: TData[];
  /** Defines table columns and their values */
  columns: ColumnDef<TData>[];
  /** Additional classname for styling */
  className?: string;
  /** Row selected state */
  rowSelection?: RowSelectionState;
  /** row expanded state returns a boolean object containing the index of the rows expanded. */
  expandedRows?: ExpandedState;
  /** Set selected rows state */
  setRowSelection?: OnChangeFn<RowSelectionState> | undefined;
  /** Set expanded rows state */
  setExpandedRows?: OnChangeFn<ExpandedState> | undefined;
  /** Click handler for each table row */
  handleRowClick?: (row: Row<TData>) => void;
  /** Determines visibility of a column */
  isColumnVisible?: VisibilityState;
  /** this is a component that contains the columns to be rendered when a row is expanded */
  renderRowSubComponent?: (props: { row: Row<TData> }) => JSX.Element;
}

export function Table<TData>({
  data,
  columns,
  className,
  rowSelection,
  expandedRows,
  setExpandedRows,
  setRowSelection,
  handleRowClick,
  isColumnVisible,
  renderRowSubComponent,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: rowSelection || {},
      columnVisibility: isColumnVisible || {},
      expanded: expandedRows,
    },
    onExpandedChange: setExpandedRows,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableHiding: true,
  });

  return (
    <>
      <div className="w-full overflow-x-auto flex flex-col border border-borderlight border-opacity-40 rounded-r4">
        <table className={cn("w-full border-collapse", className)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="shadow-tableshadow">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-left text-base text-nowrap capitalize font-medium pr-24 text-borderlight  border-b border-strokelight"
                  >
                    <p>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="align-middle">
            {table.getRowModel().rows.map((row, index) => (
              <>
                <tr
                  key={row.id}
                  onClick={
                    handleRowClick ? () => handleRowClick(row) : undefined
                  }
                  className={cn({
                    "cursor-default hover:bg-secondary-light": handleRowClick,
                    "shadow-tableshadow": index === 0,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "py-[14px] pr-24 text-base font-medium border-b border-strokelight text-textgray cursor-pointer"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td
                      colSpan={row.getVisibleCells().length}
                      className=" bg-secondary-light"
                    >
                      {renderRowSubComponent &&
                        renderRowSubComponent({
                          row,
                        })}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
