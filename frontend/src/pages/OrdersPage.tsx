import React from "react";
import Table from "../components/Table"
import { GridColDef, GridEventListener } from "@mui/x-data-grid"
import { useNavigate } from "react-router";
import { formatPrice } from "../utils/Utils";
import { getOrderStatusText } from "../constants/enums";
import OrderStatusPill from "../components/OrderStatusPill";

function OrdersTable() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, headerClassName: "mui-table-header" },
        { field: 'submission_date', headerName: 'Date', headerClassName: "mui-table-header" },
        { field: 'status', headerName: 'Status', flex: 1, headerClassName: "mui-table-header", valueFormatter: (val) => getOrderStatusText(val), renderCell: (params) => {return ( <OrderStatusPill status={params.value} /> )} },
        { field: 'department', headerName: 'Department', flex: 1, headerClassName: "mui-table-header" },
        { field: 'responder', headerName: 'Submitted By', flex: 1, headerClassName: "mui-table-header" },
        { field: 'items', headerName: 'Items', flex: 1, headerClassName: "mui-table-header" },
        { field: 'quantity', headerName: 'Qty', headerClassName: "mui-table-header" },
        { field: 'price', headerName: 'Price', flex: 1, headerClassName: "mui-table-header",  valueFormatter: (val) => formatPrice(val)},
    ];

    const navigate = useNavigate();

    const rowClick: GridEventListener<'rowClick'> = (params) => {
        navigate(`/finance/orders/${params.row.id}`);
    }

    return (
        <>
            <Table apiUrl="/orders/all" columns={columns} eventHandler={rowClick} />
        </>
    )
}

export default OrdersTable