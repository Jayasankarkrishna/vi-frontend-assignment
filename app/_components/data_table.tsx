
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowSelect?: (rowId: string | null) => void; // Callback for row selection
}

export function DataTable<TData, TValue>({ columns, data, onRowSelect }: DataTableProps<TData, TValue>) {
    const [selectedRow, setSelectedRow] = useState<string | null>(null); // To store the ID of the selected row

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        // Reset selected row when data changes
        setSelectedRow(null);
    }, [data]);

    const handleRowClick = (rowId: string) => {
        setSelectedRow(rowId);
        if (onRowSelect) {
            onRowSelect(rowId);
        }
    };

    const handleCheckboxChange = (rowId: string) => {
        setSelectedRow(rowId === selectedRow ? null : rowId);
        if (onRowSelect) {
            onRowSelect(rowId === selectedRow ? null : rowId);
        }
    };

    return (
        <div className="space-y-4">
            <div className="rounded-md border overflow-hidden">
                <Table className="sticky-cols">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="sticky left-0 bg-white z-10">
                                {/* Checkbox column header */}
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => {}}
                                    className="cursor-pointer"
                                />
                            </TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, rowIndex) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.id === selectedRow && "selected"}
                                    onClick={() => handleRowClick(row.id)}
                                    className="hover:bg-gray-100"
                                >
                                    <TableCell>
                                        {/* Checkbox cell */}
                                        <input
                                            type="checkbox"
                                            checked={row.id === selectedRow}
                                            onChange={() => handleCheckboxChange(row.id)}
                                        />
                                    </TableCell>
                                    {row.getVisibleCells().map((cell, cellIndex) => (
                                        <TableCell
                                            key={cell.id}
                                            className={
                                                cellIndex < 2 ? "sticky left-0 bg-gray-100" : ""
                                            }
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

