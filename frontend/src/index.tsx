import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, useColorScheme } from '@mui/material';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { ACCESS_TOKEN, AUTHORIZED, REFRESH_TOKEN } from './api';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './settings/authConfig';

// Components
import App from './components/App';
import Login from './components/Login';
import Order from './components/Order';
import Incidents from './components/Incidents';
import IncidentReport from './components/IncidentReport'
import IncidentPlan from './components/IncidentPlan'
import OrdersTable from './components/OrdersTable';
import Page404 from './components/StatusCodes'
import { ThemeProvider } from '@emotion/react';

// Place pages here for routing
const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/incidents/plan',
                Component: IncidentPlan
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
                Component: OrdersTable
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
    <React.StrictMode>
        {/* <MsalProvider instance={msalInstance}> */}
            <RouterProvider router={router} />
        {/* </MsalProvider> */}
    </React.StrictMode >
);