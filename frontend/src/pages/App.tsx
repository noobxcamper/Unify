import React, { } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Dashboard, { PageContent } from '../layouts/DashboardLayout';
import { Outlet } from 'react-router';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

// Theme override
const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: "class"
    },
    typography: {
        fontFamily: "Ubuntu"
    },
    palette: {
        primary: {
            main: "#373aff",
        },
    },
})

function App() {
    return (
        <>
            {/* <AuthenticatedTemplate> */}
            <ThemeProvider theme={theme} defaultMode='light'>
                <MantineProvider>
                    <Dashboard>
                        <PageContent>
                            <Outlet />
                        </PageContent>
                    </Dashboard>
                </MantineProvider>
            </ThemeProvider>
            {/* </AuthenticatedTemplate> */}

            {/* <UnauthenticatedTemplate>
                <Navigate to="/login" />
                <Container>
                    <Typography fontSize={32}>Sorry, you are not allowed to access this resource. Please contact your IT administrator.</Typography>
                    <Button variant='outlined' onClick={() => window.location.href = "/login"}>Back to Login Page</Button>
                </Container>
            </UnauthenticatedTemplate> */}
        </>
    );
}

export default App;
