import React, { useState } from "react";
import { Container, Grid2 } from "@mui/material";
import { Box, ActionIcon, Divider, Button, Text } from "@mantine/core";
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
    IconMenu2,
    IconExternalLink
} from '@tabler/icons-react'

function Branding({ title = "App", icon }) {
    return (
        <>
            <Box px="8px" mb="32px" style={{ display: "inline-flex", alignItems: "center" }}>
                <img className="DashboardItemIcon" src={icon} height={36} width={36} />
                <Text size="28px" fw={600} p={0} ml="8px" style={{ flexGrow: 1 }}>{title}</Text>
            </Box>
        </>
    )
}

function PageHeader({ onMenuClick }) {
    return (
        <>
            <Box px="16px" style={{ height: 58, display: "inline-flex", width: "100%", alignItems: "center", borderBottom: "1px solid #e9e9e9" }}>
                <ActionIcon
                    hiddenFrom="xl"
                    variant="subtle"
                    onClick={onMenuClick}
                    style={{
                        color: "black",
                    }}>
                    <IconMenu2 size={22} />
                </ActionIcon>

                <Box style={{ display: "flex", width: "100%", justifyContent: "end", alignItems: "center" }}>
                    <Button
                        component="a"
                        href="/"
                        target="_blank"
                        mr="8px"
                        variant="light"
                        leftSection={<IconExternalLink />}>
                        Client Portal
                    </Button>
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
        <Box style={{ position: "relative" }}>
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
        </Box>
    )
}

export default Dashboard
export {
    PageContent,
    PageHeader
}