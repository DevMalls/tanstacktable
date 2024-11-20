import { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import './tanstacktablereact.css';



export const TanStackTableReact = (props: any): JSX.Element => {

    console.log({ props })

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const table = useReactTable({               // wrapper the table logic & rendering the cell/header/footer templates
        data: data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),      // contains all the data and logic necessary to render rows in the table.
        getSortedRowModel: getSortedRowModel(), // contains logic for sort and to render sorted row model 
        meta: {
            updateData: (rowIndex: number, columnId: string, value: string) => {
                setData((prev: any) => {
                    return prev.map((row: any, index: number) => {
                        if (index === rowIndex) {
                            return {
                                ...prev[rowIndex],
                                [columnId]: value,
                            }
                        }
                        return row;
                    })
                })
            },
            updateDropdown: (rowIndex: number, columnId: string, value: string) => {
                setData((prev: any) => {
                    return prev.map((row: any, index: number) => {
                        if (index === rowIndex) {
                            const valueindex = prev[rowIndex][columnId].indexOf(value);
                            let arr = JSON.parse(JSON.stringify(prev[rowIndex][columnId]));
                            // If the value exists in the array, move it to the first index
                            if (valueindex !== -1) {
                                // Remove the value from its current position and add it at the start
                                arr.splice(valueindex, 1);  // Removes the value from its current position
                                arr.unshift(value);     // Adds the value at the beginning of the array
                            }
                            return {
                                ...prev[rowIndex],
                                [columnId]: arr
                            }
                        }
                        return row;
                    })
                })
            },
        }
    });

    return (
        <div className="tanstack-container">
            <table className="table-container">
                <thead className="table-header">
                    {table?.getHeaderGroups().map(headerGroup => (
                        <tr className="table-row" key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSorted = header.column.getIsSorted();
                                const sortIcon = isSorted === 'asc'
                                    ? '🔼' // Ascending arrow
                                    : isSorted === 'desc'
                                        ? '🔽' // Descending arrow
                                        : '⇅'; // Default sort icon (sortable state);
                                return (
                                    <th className="table-headeritem" key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() &&
                                                    <span className={header.column.getCanSort() ? 'cursor-pointer' : ''}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >{sortIcon}</span>}
                                            </>
                                        )}
                                    </th>
                                )
                            }
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table?.getRowModel()?.rows?.map(row =>
                        <tr className="table-row" key={row.id}>
                            {row.getVisibleCells()?.map(cell => {
                                let cellvalue = cell.getValue() === false ? "Inactive" : cell.getValue() === true ? "Active" : "Other";
                                return (
                                    <td className={`table-cellitem ${cellvalue}`} key={cell.id}>
                                        {cell.getValue() === false ? "Inactive" :
                                            cell.getValue() === true ? "Active" :
                                                cell.getValue() !== null ? flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    : 'NA'
                                        }
                                    </td>
                                )
                            }
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="dropdown-container">
                {
                    props.pagedropdown &&
                    <select
                        value={props.count}
                        onChange={e => {
                            props.onClickDataLimit(parseInt(e.target.value));
                        }}
                    >
                        {props.pageCountList.map((pageSize: number) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                }
            </div>
        </div>)
}