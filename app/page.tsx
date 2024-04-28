"use client";

import { DataTable } from "./_components/data_table";
import { useDataFetching } from "./_hooks/useDataFetching";

export default function HomePage() {
    const { data, columns } = useDataFetching();

    // TASK : Create the feature for selecting rows in DataTable
    // const { rowSelection, setRowSelection } = useRowSelection();

    const handleRowSelect = (rowId: string | null) => {
        console.log("Selected row:", rowId);
    };

    return (
        <div className="flex flex-col gap-10 items-center p-10">
            <span className="text-3xl text-gray-700 font-bold">Task Details</span>
            <div className="max-w-screen-lg flex size-full flex-col">
                <DataTable columns={columns} data={data} onRowSelect={handleRowSelect} />
            </div>
        </div>
    );
}
