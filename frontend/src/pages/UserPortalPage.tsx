import React from "react";
import { useNavigate } from "react-router";
import { useAccount } from "@azure/msal-react";
import { Box, Text } from "@mantine/core";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import { GridColDef, GridEventListener } from "@mui/x-data-grid";
import { getOrderStatusText } from "../constants/enums";
import { formatPrice } from "../utils/utilities";
import { TableItemPill } from "../components/TableItems";
import Table from "../components/Table";


function UserPortalPage() {
    const account = useAccount();
    const navigate = useNavigate();
    const token = localStorage.getItem(API_ACCESS_TOKEN) ?? "None";

    const columns: GridColDef[] = [
        { field: 'submission_id', headerName: 'ID', width: 50, headerClassName: "mui-table-header" },
        { field: 'submission_date', headerName: 'Date', headerClassName: "mui-table-header" },
        { field: 'status', headerName: 'Status', flex: 1, headerClassName: "mui-table-header", valueFormatter: (val) => getOrderStatusText(val), renderCell: (params) => { return (<TableItemPill status={params.value} />) } },
        { field: 'department', headerName: 'Department', flex: 1, headerClassName: "mui-table-header" },
        { field: 'responder', headerName: 'Submitted By', flex: 1, headerClassName: "mui-table-header" },
        { field: 'items', headerName: 'Items', flex: 1, headerClassName: "mui-table-header" },
        { field: 'quantity', headerName: 'Qty', headerClassName: "mui-table-header" },
        { field: 'price', headerName: 'Price', flex: 1, headerClassName: "mui-table-header", valueFormatter: (val) => formatPrice(val) },
    ];

    const rowClick: GridEventListener<'rowClick'> = (params) => {
        navigate(`/my_orders/${params.row.submission_id}`);
    }

    return (
        <Box style={{
            padding: "36px"
        }}>
            <Table apiUrl={`/orders/user/?email=${account?.username}`} columns={columns} eventHandler={rowClick} />
        </Box>
    )
}

export default UserPortalPage;