import React from "react";
import { Pill } from "@mantine/core";
import { getOrderStatusText } from "../constants/enums";
import { Paper, Typography } from "@mui/material";
import { IconProgress } from "@tabler/icons-react";

function OrderStatusPill({ label = "", status = 0 }) {
    return (
        <div style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
            {label ? <Typography fontSize={14} color="gray">{label}</Typography> : <></>}
            <Pill size="md" style={{
                backgroundColor: status === 0 ? "#f1e7ff" : status === 1 ? "#cef0e0" : status === 2 ? "#faedcd" : status === 3 ? "#f8d3d4" : "#e9e9e9",
                color: status === 0 ? "#ae8ebd" : status === 1 ? "#41a780" : status === 2 ? "#c0803d" : status === 3 ? "#d14025" : "#e9e9e9",
            }}>
                {getOrderStatusText(status)}
            </Pill>
        </div>
    )
}

export default OrderStatusPill;