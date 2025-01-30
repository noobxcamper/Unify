import React from "react";

function Stack({ orientation = "row", spacing = "10px", align = "start", justify = "start", margin = "0", children }) {
    return (
        <div style={{
            display: "flex",
            margin: margin,
            alignItems: align,
            justifyContent: justify,
            flexDirection: orientation === "row" ? "row" : "column",
            gap: spacing,
        }}>
            {children}
        </div>
    )
}

export default Stack;