import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Paper } from "@mantine/core";
import { backendAPI } from "../utils/api";
import { LoadingSkeletonMulti } from "./LoadingSkeleon";

function Test() {
    return (
        <>
            <GridToolbarQuickFilter
                variant="outlined"
                sx={{ width: 300 }}
                placeholder="Search..."
            />
        </>
    )
}

function DataTableComponent({ data, columns, eventHandler }) {
    const paginationModel = { page: 0, pageSize: 15 };

    return (
        <>
            <Paper shadow="md">
                <DataGrid
                    rows={data}
                    columns={columns}
                    onRowClick={eventHandler}
                    initialState={{
                        pagination: { paginationModel },
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterExcludeHiddenColumns: true
                            }
                        }
                    }}
                    pageSizeOptions={[5, 10, 15, 20, 25, 30]}
                    checkboxSelection
                    slots={{ toolbar: () => <Test /> }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Paper>
        </>
    )
}

function Table({ apiUrl, columns, eventHandler }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        backendAPI.get(apiUrl)
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div >
                {isLoading ? <LoadingSkeletonMulti /> : <DataTableComponent data={data} eventHandler={eventHandler} columns={columns} />}
            </div>
        </>
    )
}

export default Table