import React from "react";
import { Typography } from "@mui/material";

function TableItemText({ label = "Label", text }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={14} color="gray">{label}</Typography>
            <Typography>{text}</Typography>
        </div>
    )
}

function TableItemPill({ label = "Label", text, color = "#e9e9e9" }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <Typography fontSize={14} color="gray">{label}</Typography>
            <Typography fontSize={12} style={{ backgroundColor: color, padding: "2px 12px", borderRadius: "5px" }}>{text}</Typography>
        </div>
    )
}

export {
    TableItemText,
    TableItemPill
}