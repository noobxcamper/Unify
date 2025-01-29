import React from 'react';
import ReactDOM from 'react-dom/client';
import { Typography } from '@mui/material';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './settings/authConfig';

// Pages
import App from './pages/App';
import Login from './pages/LoginPage';
import Order from './pages/OrderViewPage';
import Incidents from './pages/IncidentsPage';
import IncidentReport from './pages/IncidentReportPage'
import IncidentPlan from './pages/IncidentPlanPage'
import OrdersTable from './pages/OrdersPage';
import Page404 from './pages/Http404Page'
import { PageContent } from './layouts/DashboardLayout';
import TodoList from './pages/TodoListPage';

// Place pages here for routing
const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                element: <PageContent pageTitle="Homepage"><Typography fontSize={32}>Welcome to Unify</Typography></PageContent>
            },
            {
                path: '/helpdesk',
                children: [
                    {
                        path: 'tickets',
                        element: <PageContent pageTitle="Helpdesk"><Typography fontSize={32}>Tickets</Typography></PageContent>,
                        children: [
                            {
                                path: 'loser',
                                element: <PageContent pageTitle="Helpdesk"><Typography fontSize={32}>Loser</Typography></PageContent>
                            }
                        ]
                    },
                    {
                        path: 'kb',
                        element: <PageContent pageTitle="Helpdesk"><Typography fontSize={32}>Knowledgebase</Typography></PageContent>
                    },
                    {
                        path: 'development',
                        element: <PageContent pageTitle="Helpdesk"><TodoList /></PageContent>
                    }
                ]
            },
            {
                path: '/incidents/plan',
                element: <PageContent pageTitle="Incident Response Plan"><IncidentPlan /></PageContent>
            },
            {
                path: '/incidents/reports',
                Component: Incidents
            },
            {
                path: '/incidents/new',
                Component: IncidentReport
            },
            {
                path: '/finance/orders',
                element: <PageContent pageTitle="Orders"><OrdersTable /></PageContent>
            },
            {
                path: '/finance/orders/:orderId',
                Component: Order
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '*',
        Component: Page404
    }
]);

// App Root
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Microsoft Auth Settings
// const msalInstance = new PublicClientApplication(msalConfig);

root.render(
    <>
        {/* <MsalProvider instance={msalInstance}> */}
            <RouterProvider router={router} />
        {/* </MsalProvider> */}
    </>
);