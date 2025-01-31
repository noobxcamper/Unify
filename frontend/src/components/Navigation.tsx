import React from "react";
import { Box, List, Typography, ListItem, Link } from "@mui/material";
import { Drawer, Tooltip } from "@mantine/core";

function Navigation({ open = false, onClose, children }) {
    return (
        <>
            <Box sx={{
                display: {
                    xl: "flex",
                    xs: "none"
                },
                flexDirection: "column",
                overflow: "hidden",
                height: "100%",
                p: 1,
                borderRight: "1px solid #e9e9e9",
            }}>
                {children}
            </Box>

            <Drawer opened={open} onClose={onClose}>
                {children}
            </Drawer>
        </>
    )
}

function ListSection({ sectionTitle = "Section", children }) {
    return (
        <>
            <List>
                <Typography color="gray" sx={{
                    px: 1,
                    mb: 1
                }}>{sectionTitle}</Typography>
                {children}
            </List>
        </>
    )
}

function ListItemLink({ title = "Link", link = "/", icon }) {
    return (
        <>
        <Tooltip label={title} position="right">
            <ListItem sx={{ py: 0.5, px: 0 }}>
                <Link sx={{
                    display: "inline-flex",
                    height: "100%",
                    color: "black",
                    width: "100%",
                    alignItems: "center",
                    borderRadius: 2,
                    textDecoration: "none",
                    p: 1,
                    ":hover":
                    {
                        bgcolor: "primary.main",
                        color: "whitesmoke"
                    }
                }} href={link}>
                    {icon}
                    <Typography fontWeight={300} sx={{
                        marginLeft: 2
                    }}>{title}</Typography>
                </Link>
            </ListItem>
            </Tooltip>
        </>
    )
}

export {
    Navigation,
    ListSection,
    ListItemLink
};