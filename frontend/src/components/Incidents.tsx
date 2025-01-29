import React from "react"
import Table from "./Table"
import { GridColDef } from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router";
import { Button, Stack } from "@mui/material";
import { PageContainer } from "@toolpad/core";

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
            <PageContainer>
                <Stack direction="column" spacing={1}>
                    <h1>Incidents</h1>
                    <Button startIcon={<AddIcon />} variant="contained" style={{ width: "fit-content" }}>Create Incident</Button>
                    <Table apiUrl="/incidents/all" columns={columns} eventHandler={rowClick} />
                </Stack>
            </PageContainer>
        </>
    )
}

export default Incidents