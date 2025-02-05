import React from 'react';
import ReactDOM from 'react-dom/client';
import { Typography } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { MsalProvider } from '@azure/msal-react';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import AdminApp from './apps/AdminApp';
import UserApp from './apps/UserApp';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import OrderViewPage from './pages/OrderViewPage';
import IncidentsPage from './pages/IncidentsPage';
import IncidentReportPage from './pages/IncidentReportPage'
import IncidentPlanPage from './pages/IncidentPlanPage'
import OrdersPage from './pages/OrdersPage';
import Http404Page from './pages/Http404Page'
import DevelopmentPage from './pages/DevelopmentPage';
import TicketsPage from './pages/TicketsPage';
import AccountPage from './pages/AccountPage';
import { colorsTuple, createTheme, MantineProvider } from '@mantine/core';
import { msalInstance } from './utils/MsalAuthHandler';

// Place pages here for routing
const router = createBrowserRouter([
    {
        path: '/login',
        Component: LoginPage
    },
    {
        path: '/login?redirect=:path',
        Component: LoginPage
    },
    {
        path: '*',
        Component: Http404Page
    },
    {
        path: '/admin',
        element: <ProtectedRoute requiredRoles={["Admin"]}><AdminApp /></ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                Component: DashboardPage
            },
            {
                path: 'account',
                Component: AccountPage
            },
            {
                path: 'tickets',
                Component: TicketsPage
            },
            {
                path: 'tickets/loser',
                element: <Typography fontSize={32}>Loser</Typography>
            },
            {
                path: 'kb',
                element: <Typography fontSize={32}>Knowledgebase</Typography>
            },
            {
                path: 'development',
                Component: DevelopmentPage,
            },
            {
                path: 'incidents/plan',
                Component: IncidentPlanPage
            },
            {
                path: 'incidents/reports',
                Component: IncidentsPage
            },
            {
                path: 'incidents/new',
                Component: IncidentReportPage
            },
            {
                path: 'finance/orders',
                Component: OrdersPage
            },
            {
                path: 'finance/orders/:orderId',
                Component: OrderViewPage
            }
        ]
    },
    {
        path: '/',
        element: <ProtectedRoute requiredRoles={["User"]}><UserApp /></ProtectedRoute>
    }
]);

// Override default theme
const theme = createTheme({
    colors: {
        'primary-solid': colorsTuple('#d14025'),
        'primary-hover': colorsTuple('#ff6a2d')
    }
});

// App Root
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <>
        <MantineProvider theme={theme}>
            <MsalProvider instance={msalInstance}>
                <RouterProvider router={router} />
            </MsalProvider>
        </MantineProvider>
    </>
);