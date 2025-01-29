import React, { useEffect, useState } from "react";
import { DataGrid, GridColumnVisibilityModel, GridToolbar } from '@mui/x-data-grid';
import { Paper, Skeleton, Stack } from "@mui/material";
import api from "../utils/api";
import Box from '@mui/material/Box';

function SkeletonComponent() {
    return (
        <>
            <Stack spacing={1}>
                <Skeleton variant="rounded" height={20} />
                <Skeleton variant="rounded" height={60} />
                <Skeleton variant="rounded" height={150} />
            </Stack>
        </>
    )
}

function DataTableComponent({ data, columns, eventHandler }) {
    const paginationModel = { page: 0, pageSize: 15 };

    return (
        <>
            <Paper elevation={2}>
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
                    slots={{ toolbar: GridToolbar }}
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

        api.get(apiUrl)
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
                {isLoading ? <SkeletonComponent /> : <DataTableComponent data={data} eventHandler={eventHandler} columns={columns} />}
            </div>
        </>
    )
}

export default Table