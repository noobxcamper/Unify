import React from 'react';
import { PageContent } from '../layouts/DashboardLayout';
import { Outlet } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';

function AdminApp() {
    return (
        <>
            <DashboardLayout>
                <PageContent>
                    <Outlet />
                </PageContent>
            </DashboardLayout>
        </>
    );
}

export default AdminApp;
