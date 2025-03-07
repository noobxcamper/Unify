import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Notifications } from '@mantine/notifications';
import { ActionIcon, Button, colorsTuple, createTheme, Divider, MantineProvider, Text } from '@mantine/core';
import { msalInstance } from './utils/MsalAuthHandler';
import { MsalProvider } from '@azure/msal-react';
import { ProtectedRoute } from './components/ProtectedRoute';
import { pdfjs } from 'react-pdf';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './assets/css/globalStyles.css';

// Pages
import AdminApp from './apps/AdminApp';
import UserApp from './apps/UserApp';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import OrderViewPage from './pages/OrderViewPage';
import FinanceOrderViewPage from './pages/FinanceOrderViewPage';
import IncidentsPage from './pages/IncidentsPage';
import IncidentReportPage from './pages/IncidentReportPage'
import IncidentPlanPage from './pages/IncidentPlanPage'
import OrdersPage from './pages/OrdersPage';
import Http404Page from './pages/Http404Page'
import DevelopmentPage from './pages/DevelopmentPage';
import TicketsPage from './pages/TicketsPage';
import AccountPage from './pages/AccountPage';
import UserPortalPage from './pages/UserPortalPage';
import UserOrdersPage from './pages/UserOrdersPage';

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
                element: <Text size="32">Loser</Text>
            },
            {
                path: 'kb',
                element: <Text size="32">Knowledgebase</Text>
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
        ]
    },
    {
        path: '/',
        element: <ProtectedRoute requiredRoles={["User"]}><UserApp /></ProtectedRoute>,
        children: [
            {
                path: '/',
                Component: UserPortalPage
            },
            {
                path: '/my_orders/:orderId',
                Component: UserOrdersPage
            },
        ]
    },
    {
        path: '/finance',
        element: <ProtectedRoute requiredRoles={["Finance"]}><UserApp /></ProtectedRoute>,
        children: [
            {
                path: 'orders',
                Component: OrdersPage,
            },
            {
                path: 'orders/:orderId',
                Component: FinanceOrderViewPage
            },
        ]
    }
]);

// Override default theme
const theme = createTheme({
    fontFamily: 'Ubuntu, sans-serif',
    components: {
        Button: Button.extend({
            classNames: {
                root: 'unify-button-filled',
            },
        }),
        ActionIcon: ActionIcon.extend({
            classNames: {
                root: 'unify-button-filled',
            }
        }),
        Divider: Divider.extend({
            classNames: {
                root: 'unify-divider'
            }
        })
    }
});
// App Root
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Set the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

root.render(
    <>
        <MantineProvider theme={theme}>
            <Notifications />
            <MsalProvider instance={msalInstance}>
                <RouterProvider router={router} />
            </MsalProvider>
        </MantineProvider>
    </>
);