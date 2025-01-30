import React from "react";
import { Box, Button, Container, Grid2, Typography, Divider } from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import { Sidebar, ListSection, ListItemLink } from "../components/SidebarNav";
import BrandLogo from "../assets/img/brand.png"
import {
    IconLayoutDashboard,
    IconUserCircle,
    IconClipboardText,
    IconListCheck,
    IconShieldCog,
    IconSettings,
    IconCreditCard,
    IconUsers,
    IconTicket,
    IconLibrary,
    IconCode,
    IconBell,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarRightCollapse} from '@tabler/icons-react'

function Branding({ title = "App", icon }) {
    return (
        <>
            <Box sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: {
                    xl: "start",
                    sm: "center"
                },
                px: 1
            }}>
                <img className="DashboardItemIcon" src={icon} height={36} width={36} />
                <Typography sx={{
                    display: {
                        xl: "block",
                        sm: "none"
                    },
                    fontSize: 28,
                    fontWeight: 600,
                    padding: 0,
                    marginLeft: "8px",
                    flexGrow: 1,
                }}>{title}</Typography>
                <Button sx={{
                    display: {
                        xl: "flex",
                        sm: "none"
                    },
                    minWidth: "auto",
                    borderRadius: "50%",
                    color: "black"
                }}><IconLayoutSidebarLeftCollapse size={26} /></Button>
            </Box>
        </>
    )
}

function PageHeader() {
    return (
        <>
            <Box sx={{ height: 58, px: 2, display: "inline-flex", width: "100%", alignItems: "center", borderBottom: "1px solid #e9e9e9" }}>
                {/* <Paper elevation={1} sx={{ maxWidth: "50%", p: 1, borderRadius: "12px", flexGrow: 1 }}>
                    <Input variant="unstyled" placeholder="Find something..." leftSection={<IconSearch size={16} />} />
                </Paper> */}
                <Button sx={{
                    display: {
                        xl: "none",
                        sm: "flex"
                    },
                    minWidth: "auto",
                    borderRadius: "50%",
                    color: "black",
                    justifyContent: "start",
                }}><IconLayoutSidebarRightCollapse size={26} /></Button>

                <Button sx={{
                    minWidth: "auto",
                    ml: "auto",
                    borderRadius: "50%",
                    color: "black",
                    justifyContent: "end",
                }}><IconBell size={26} /></Button>

                <Button sx={{
                    minWidth: "auto",
                    borderRadius: "50%",
                    color: "black",
                    justifyContent: "end",
                }}><IconUserCircle size={26} /></Button>
            </Box>
        </>
    )
}

function PageContent({ children }) {
    return (
        <>
            <Box>
                <Breadcrumbs />
                {children}
            </Box>
        </>
    )
}

function Dashboard({ children }) {
    return (
        <>
            <Grid2 container sx={{ height: "100vh" }}>
                <Grid2 sx={{ width: "auto" }}>
                    <Sidebar>
                        <Branding title="Unify" icon={BrandLogo} />
                        <ListSection sectionTitle="Dashboard">
                            <ListItemLink title="Dashboard" link="/" icon={<IconLayoutDashboard />} />
                        </ListSection>
                        <Divider />
                        <ListSection sectionTitle="Helpdesk">
                            <ListItemLink title="Tickets" link="/tickets" icon={<IconTicket />} />
                            <ListItemLink title="Knowledgebase" link="/kb" icon={<IconLibrary />} />
                            <ListItemLink title="Development" link="/development" icon={<IconCode />} />
                        </ListSection>
                        <Divider />
                        <ListSection sectionTitle="Incident Response">
                            <ListItemLink title="Reports" icon={<IconClipboardText />} />
                            <ListItemLink title="Plan" link="/incidents/plan" icon={<IconListCheck />} />
                        </ListSection>
                        <Divider />
                        <ListSection sectionTitle="Finance">
                            <ListItemLink title="Orders" link="/finance/orders" icon={<IconCreditCard />} />
                        </ListSection>
                        <Divider />
                        <ListSection sectionTitle="Management">
                            <ListItemLink title="Users" icon={<IconUsers />} />
                            <ListItemLink title="General" icon={<IconSettings />} />
                            <ListItemLink title="Security" icon={<IconShieldCog />} />
                        </ListSection>
                    </Sidebar>
                </Grid2>
                <Grid2 sx={{ flexGrow: 1 }}>
                    <PageHeader />
                    <Container>
                        {children}
                    </Container>
                </Grid2>
            </Grid2>
        </>
    )
}

export default Dashboard
export {
    PageContent,
    PageHeader
}