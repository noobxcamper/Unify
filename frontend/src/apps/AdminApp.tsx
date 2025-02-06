import React from 'react';
import { createTheme } from '@mui/material';
import { PageContent } from '../layouts/DashboardLayout';
import { Outlet } from 'react-router';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import DashboardLayout from '../layouts/DashboardLayout';
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
            <AuthenticatedTemplate>
                <DashboardLayout>
                    <PageContent>
                        <Outlet />
                    </PageContent>
                </DashboardLayout>
            </AuthenticatedTemplate>

            {/* <UnauthenticatedTemplate>
                <Box style={{
                    display: "flex",
                    height: "100vh",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Paper shadow={'sm'} style={{
                        maxWidth: "400px",
                        padding: "20px",
                        textAlign: "center",
                        border: "1px solid #e9e9e9",
                        borderRadius: "16px"
                    }}>
                        <Text size="xl" fw={600}>Authentication Error</Text>
                        <Divider my={"md"} />
                        <Text size="md" mb={"md"}>Please return to the login page and sign in before attempting to access this page. If you believe this is an error, contact your IT administrator.</Text>
                        <Button leftSection={<IconLogin2 />} onClick={() => window.location.href = "/login"}>Login</Button>
                    </Paper>
                </Box>
            </UnauthenticatedTemplate> */}
        </>
    );
}

export default App;
