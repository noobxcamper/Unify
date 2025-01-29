import React, {  } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Dashboard from '../layouts/DashboardLayout';

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
        mode: "dark",   // this needs to change dynamically later using states
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
                <Dashboard />
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
