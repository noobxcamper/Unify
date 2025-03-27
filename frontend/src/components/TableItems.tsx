import React from "react";
import { Typography } from "@mui/material";
import { Pill, Tooltip } from "@mantine/core";
import { getOrderStatusText } from "../constants/enums";

function TableItemText({ label = "Label", text }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "250px" }}>
            <Typography fontSize={12} color="gray">{label}</Typography>
            <Tooltip position="bottom" label={text}>
                <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} fontSize={14}>{text}</Typography>
            </Tooltip>
        </div>
    )
}

function TableItemPill({ label = "", status = 0 }) {
    return (
        <div style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
            {label ? <Typography fontSize={12} color="gray">{label}</Typography> : <></>}
            <Pill size="lg" style={{
                backgroundColor: status === 0 ? "#f1e7ff" : status === 1 ? "#cef0e0" : status === 2 ? "#faedcd" : status === 3 ? "#f8d3d4" : "#e9e9e9",
                color: status === 0 ? "#ae8ebd" : status === 1 ? "#41a780" : status === 2 ? "#c0803d" : status === 3 ? "#d14025" : "#e9e9e9",
            }}>
                <Typography fontSize={14}>{getOrderStatusText(status)}</Typography>
            </Pill>
        </div>
    )
}

export {
    TableItemText,
    TableItemPill
}