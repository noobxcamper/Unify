import React, { useRef } from "react";
import Table from "../components/Table"
import { GridColDef, GridEventListener } from "@mui/x-data-grid"
import { useNavigate } from "react-router";
import { Paper } from "@mui/material";

function StatusTag() {
    return (
        <>
            <h1>placeholder</h1>
        </>
    )
}

function OrdersTable() {
    const pageTitle = useRef("Orders");

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, headerClassName: "mui-table-header" },
        { field: 'submission_date', headerName: 'Submission Date', headerClassName: "mui-table-header" },
        { field: 'status', headerName: 'Order Status', headerClassName: "mui-table-header" },
        { field: 'department', headerName: 'Department', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'responder', headerName: 'Submitted By', flex: 1, headerClassName: "mui-table-header" },
        { field: 'items', headerName: 'Items', flex: 0.5, headerClassName: "mui-table-header" },
        { field: 'quantity', headerName: 'Qty', width: 50, headerClassName: "mui-table-header" },
        { field: 'price', headerName: 'Price', headerClassName: "mui-table-header" },
    ];

    const navigate = useNavigate();

    const rowClick: GridEventListener<'rowClick'> = (params) => {
        // window.location.href = `/finance/orders/${params.row.id}`;
        navigate(`/finance/orders/${params.row.id}`);
    }

    return (
        <>
            <Table apiUrl="/orders/all" columns={columns} eventHandler={rowClick} />
        </>
    )
}

export default OrdersTable