import React, { useState } from "react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { ActionIcon, Divider } from "@mantine/core";
import { Navigation, ListSection, ListItemLink } from "../components/Navigation";
import AccountMenuButton from "../components/AccountMenuButton";
import BrandLogo from "../assets/img/brand.png"
import {
    IconLayoutDashboard,
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
    IconMenu2
} from '@tabler/icons-react'

function Branding({ title = "App", icon }) {
    return (
        <>
            <Box sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1,
                mb: 4
            }}>
                <img className="DashboardItemIcon" src={icon} height={36} width={36} />
                <Typography sx={{
                    fontSize: 28,
                    fontWeight: 600,
                    padding: 0,
                    marginLeft: "8px",
                    flexGrow: 1,
                }}>{title}</Typography>
            </Box>
        </>
    )
}

function PageHeader({ onMenuClick }) {
    return (
        <>
            <Box sx={{ height: 58, px: 2, display: "inline-flex", width: "100%", alignItems: "center", borderBottom: "1px solid #e9e9e9" }}>
                <ActionIcon
                    hiddenFrom="xl"
                    variant="subtle"
                    onClick={onMenuClick}
                    style={{
                        color: "black",
                    }}>
                    <IconMenu2 size={22} />
                </ActionIcon>

                <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
                    <ActionIcon
                        variant="subtle"
                        style={{
                            color: "black",
                        }}>
                        <IconBell size={22} />
                    </ActionIcon>

                    <AccountMenuButton />
                </Box>
            </Box>
        </>
    )
}

function PageContent({ children }) {
    return (
        <>
            <Box>
                {children}
            </Box>
        </>
    )
}

function Dashboard({ children }) {
    const [open, setOpen] = useState<boolean>(false);

    const openDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        setOpen(false);
    }

    return (
        <>
            <Grid2 container sx={{ height: "100vh" }}>
                <Grid2 sx={{ width: "auto" }}>
                    <Navigation open={open} onClose={closeDrawer}>
                        <Branding title="Unify" icon={BrandLogo} />
                        <ListSection sectionTitle="Dashboard">
                            <ListItemLink title="Dashboard" link="/admin/dashboard" icon={<IconLayoutDashboard />} />
                        </ListSection>
                        <Divider my={"sm"} />
                        <ListSection sectionTitle="Helpdesk">
                            <ListItemLink title="Tickets" link="/admin/tickets" icon={<IconTicket />} />
                            <ListItemLink title="Knowledgebase" link="/admin/kb" icon={<IconLibrary />} />
                            <ListItemLink title="Development" link="/admin/development" icon={<IconCode />} />
                        </ListSection>
                        <Divider my={"sm"} />
                        <ListSection sectionTitle="Incident Response">
                            <ListItemLink title="Reports" icon={<IconClipboardText />} />
                            <ListItemLink title="Plan" link="/admin/incidents/plan" icon={<IconListCheck />} />
                        </ListSection>
                        <Divider my={"sm"} />
                        <ListSection sectionTitle="Finance">
                            <ListItemLink title="Orders" link="/admin/finance/orders" icon={<IconCreditCard />} />
                        </ListSection>
                        <Divider my={"sm"} />
                        <ListSection sectionTitle="Management">
                            <ListItemLink title="Users" icon={<IconUsers />} />
                            <ListItemLink title="General" icon={<IconSettings />} />
                            <ListItemLink title="Security" icon={<IconShieldCog />} />
                        </ListSection>
                    </Navigation>
                </Grid2>
                <Grid2 sx={{ flexGrow: 1 }}>
                    <PageHeader onMenuClick={openDrawer} />
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