import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, Branding, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout, PageContainer } from '@toolpad/core';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Button, Container, createTheme, Typography } from '@mui/material';

import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from './Logout';
import Dashboard, { PageContent, PageHeader } from './Dashboard';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import OrdersTable from './OrdersTable';

// Theme override
const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    typography: {
        fontFamily: "Ubuntu"
    },
    palette: {
        mode: "light",
        primary: {
            main: "#373aff"
        },
        background: {
            paper: "yellow"
        }
    }
})

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Incident Response',
    },
    {
        segment: 'incidents',
        title: 'Incidents',
        icon: <NotificationsActiveIcon />,
        children: [
            {
                segment: 'reports',
                title: "All Reports",
                icon: <AssessmentIcon />
            },
            {
                segment: 'new',
                title: "Create Report",
                icon: <AddIcon />
            }
        ]
    },
    {
        segment: 'incidents/plan',
        title: 'Incident Response Plan',
        icon: <InventoryIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Finance',
    },
    {
        segment: 'finance/orders',
        title: 'Orders',
        icon: <AttachMoneyIcon />
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Reporting',
    },
    {
        segment: 'audit',
        title: 'Audit Logs',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'administrative',
                title: 'Administrative',
                icon: <AssignmentIcon />,
            }
        ],
    },
    {
        kind: "divider"
    },
    {
        kind: "header",
        title: "Admin"
    },
    {
        segment: 'settings',
        title: 'Settings',
        icon: <SettingsIcon />,
    }
];

const mainTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const BRANDING: Branding = {
    title: "Unify",
    logo: "",
    homeUrl: "incidents"
}

function App() {
    return (
        <>
            {/* <AuthenticatedTemplate>
                <AppProvider
                    navigation={NAVIGATION}
                    theme={mainTheme}
                    branding={BRANDING}
                    session={{
                        user: {
                            name: "User"
                        }
                    }}
                    >
                    <DashboardLayout slotProps={{
                    }}
                    slots={{
                        toolbarAccount: Logout,
                    }}
                    >
                        <PageContainer>
                            <Outlet />
                        </PageContainer>
                    </DashboardLayout>
                </AppProvider>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Container>
                    <Typography fontSize={32}>Sorry, you are not allowed to access this resource. Please contact your IT administrator.</Typography>
                    <Button variant='outlined' onClick={() => window.location.href = "/login"}>Back to Login Page</Button>
                </Container>
            </UnauthenticatedTemplate> */}
            <ChakraProvider value={defaultSystem}>
                <Dashboard>
                    <PageHeader title="Homepage" accountName="Hazem Abo Hashima" />
                    <Container>
                        <PageContent>
                            <Outlet />
                        </PageContent>
                    </Container>
                </Dashboard>
            </ChakraProvider>
        </>
    );
}

export default App;
