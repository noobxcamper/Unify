import React from "react";
import Table from "../components/Table"
import { GridColDef, GridEventListener } from "@mui/x-data-grid"
import { useNavigate } from "react-router";
import { formatPrice } from "../utils/utilities";
import { getOrderStatusText } from "../constants/enums";
import { TableItemPill } from "../components/TableItems";

function OrdersTable() {
    const columns: GridColDef[] = [
        { field: 'submission_id', headerName: 'ID', width: 50, headerClassName: "mui-table-header" },
        { field: 'submission_date', headerName: 'Date', headerClassName: "mui-table-header" },
        { field: 'status', headerName: 'Status', flex: 1, headerClassName: "mui-table-header", valueFormatter: (val) => getOrderStatusText(val), renderCell: (params) => {return ( <TableItemPill status={params.value} /> )} },
        { field: 'department', headerName: 'Department', flex: 1, headerClassName: "mui-table-header" },
        { field: 'responder', headerName: 'Submitted By', flex: 1, headerClassName: "mui-table-header" },
        { field: 'items', headerName: 'Items', flex: 1, headerClassName: "mui-table-header" },
        { field: 'quantity', headerName: 'Qty', headerClassName: "mui-table-header" },
        { field: 'price', headerName: 'Price', flex: 1, headerClassName: "mui-table-header",  valueFormatter: (val) => formatPrice(val) },
        { field: 'invoice_uploaded', headerName: 'Invoice', flex: 1, headerClassName: "mui-table-header",  valueFormatter: (val) => val == true ? "Yes" : "No" },
    ];

    const navigate = useNavigate();

    const rowClick: GridEventListener<'rowClick'> = (params) => {
        navigate(`${params.row.submission_id}`);
    }

    return (
        <>
            <Table apiUrl="/orders/all" columns={columns} eventHandler={rowClick} />
        </>
    )
}

export default OrdersTable