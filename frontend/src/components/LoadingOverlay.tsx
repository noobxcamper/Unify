import { Box, Loader, Text } from "@mantine/core";
import React from "react";

function LoadingOverlay({ visible, overlayMessage = "" }) {
    return (
        <>
            <Box style={{
                height: "100vh",
                display: "flex",
                position: "absolute",
                left: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.5)",
                zIndex: 400,
                visibility: visible ? "visible" : "hidden"
            }}>
                <Box style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    padding: "40px",
                    borderRadius: "8px"
                }}>
                    <Text mb={"lg"} size={"lg"} fw={500}>{overlayMessage}</Text>
                    <Loader />
                </Box>
            </Box>
        </>
    )
}

export default LoadingOverlay;