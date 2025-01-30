import React from "react";
import { Box, List, Typography, ListItem, Link } from "@mui/material";

function Sidebar({ children }) {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                height: "100%",
                width: {
                    xl: "220px",
                    sm: "65px"
                },
                p: 1,
                borderRight: "1px solid #e9e9e9",
                transition: "width 0.3s"
            }}>
                {children}
            </Box>
        </>
    )
}

function ListSection({ sectionTitle = "Section", children }) {
    return (
        <>
            <List className="DashboardListSection" sx={{
                my: {
                    xl: 1,
                    sm: 0,
                },
            }}>
                <Typography color="gray" sx={{
                    display: {
                        xl: "block",
                        sm: "none"
                    },
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
            <ListItem sx={{ py: 0.5, px: 0 }}>
                <Link sx={{
                    display: "inline-flex",
                    height: "100%",
                    color: "black",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: {
                        xl: "start",
                        sm: "center"
                    },
                    borderRadius: 2,
                    textDecoration: "none",
                    p: 1,
                    ":hover":
                    {
                        bgcolor: "primary.main",
                        color: "whitesmoke"
                    }
                }} href={link} className="DashboardLinkActive">
                    {icon}
                    <Typography fontWeight={300} sx={{
                        display: {
                            xl: "block",
                            sm: "none"
                        },
                        marginLeft: 2
                    }}>{title}</Typography>
                </Link>
            </ListItem>
        </>
    )
}

export {
    Sidebar,
    ListSection,
    ListItemLink
};