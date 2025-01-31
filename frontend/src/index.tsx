import React from 'react';
import ReactDOM from 'react-dom/client';
import { Typography } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './settings/authConfig';

// Pages
import App from './pages/App';
import LoginPage from './pages/LoginPage';
import OrderViewPage from './pages/OrderViewPage';
import IncidentsPage from './pages/IncidentsPage';
import IncidentReportPage from './pages/IncidentReportPage'
import IncidentPlanPage from './pages/IncidentPlanPage'
import OrdersPage from './pages/OrdersPage';
import Http404Page from './pages/Http404Page'
import TodoListPage from './pages/TodoListPage';
import TicketsPage from './pages/TicketsPage';
import AccountPage from './pages/AccountPage';

// Place pages here for routing
const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                element: <Typography fontSize={32}>Welcome to Unify</Typography>
            },
            {
                path: '/account',
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
                path: '/kb',
                element: <Typography fontSize={32}>Knowledgebase</Typography>
            },
            {
                path: '/development',
                Component: TodoListPage,
            },
            {
                path: '/incidents/plan',
                Component: IncidentPlanPage
            },
            {
                path: '/incidents/reports',
                Component: IncidentsPage
            },
            {
                path: '/incidents/new',
                Component: IncidentReportPage
            },
            {
                path: '/finance/orders',
                Component: OrdersPage
            },
            {
                path: '/finance/orders/:orderId',
                Component: OrderViewPage
            }
        ]
    },
    {
        path: '/login',
        Component: LoginPage
    },
    {
        path: '*',
        Component: Http404Page
    }
]);

// App Root
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Microsoft Auth Settings
const msalInstance = new PublicClientApplication(msalConfig);

root.render(
    <>
        <MsalProvider instance={msalInstance}>
            <RouterProvider router={router} />
        </MsalProvider>
    </>
);