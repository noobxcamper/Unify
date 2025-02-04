import React from "react";
import { List, Typography, ListItem, Link } from "@mui/material";
import { Box, Button, Drawer, Text, Tooltip } from "@mantine/core";

function Navigation({ open = false, onClose, children }) {
    return (
        <>
            <Box
                visibleFrom="xl"
                p={"sm"}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    height: "100%",
                    borderRight: "1px solid #e9e9e9",
                }}>
                {children}
            </Box>

            <Drawer
                hiddenFrom="xl"
                opened={open}
                onClose={onClose}>
                {children}
            </Drawer>
        </>
    )
}

function ListSection({ sectionTitle = "Section", children }) {
    return (
        <>
            <Box 
            style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Text
                    size="sm"
                    px={"sm"}
                    mb={"sm"}>
                    {sectionTitle}
                </Text>
                {children}
            </Box>
        </>
    )
}

function ListItemLink({ title = "Link", link = "/", icon }) {
    return (
        <>
            <Tooltip label={title} position="right">
                {/* <Link sx={{
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
                    <Typography
                        fontSize={14}
                        ml={2}>{title}</Typography>
                </Link> */}
                <Button
                    className="LinkButton"
                    style={{
                        display: "flex",
                        borderRadius: "8px",
                    }}
                    variant="subtle"
                    component="a"
                    href={link}
                    leftSection={icon}>
                    <Text>{title}</Text>
                </Button>
            </Tooltip>
        </>
    )
}

export {
    Navigation,
    ListSection,
    ListItemLink
};