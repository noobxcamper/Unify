import React from "react"
import Table from "../components/Table"
import { GridColDef } from "@mui/x-data-grid"
import { useNavigate } from "react-router";
import { Button, Stack } from "@mui/material";

function Incidents() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: "mui-table-header" },
        { field: 'date', headerName: 'Date', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'type', headerName: 'Type', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'name', headerName: 'Name', flex: 1, headerClassName: "mui-table-header" },
        { field: 'analyst', headerName: 'Analyst', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'reviewed_by', headerName: 'Reviewed By', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'review_status', headerName: 'Review Status', flex: 0.5, headerClassName: "mui-table-header" },
    ];

    const navigate = useNavigate();

    const rowClick = () => {
        navigate('/incidents');
    }

    return (
        <>
            <Stack direction="column" spacing={1}>
                <h1>Incidents</h1>
                <Button variant="contained" style={{ width: "fit-content" }}>Create Incident</Button>
                <Table apiUrl="/incidents/all" columns={columns} eventHandler={rowClick} />
            </Stack>
        </>
    )
}

export default Incidents