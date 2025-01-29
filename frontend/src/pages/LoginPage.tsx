import React from "react";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";
import { AuthenticationResult, EventType } from "@azure/msal-browser";
import { Box, Paper, Button, Typography } from "@mui/material";
import { loginRequest } from "../settings/authConfig";

function Login() {
    // Get the MSAL instance
    const { instance } = useMsal();

    // Navigation constant
    const navigate = useNavigate();

    // Get first active account on page load and redirect to homepage
    if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
        instance.setActiveAccount(instance.getAllAccounts()[0]);
        window.location.href = '/';
    }

    // Redirect to homepage on login success
    instance.addEventCallback((event) => {
        // Get the payload from the event
        const payload = event.payload as AuthenticationResult

        // If the event type is login success, and the payload has an account
        if (event.eventType === EventType.LOGIN_SUCCESS && payload.account) {
            // Set the active account to the payload account
            instance.setActiveAccount(payload.account);

            // Redirect to homepage
            navigate('/');
        }
    });

    const microsoftSignInHandler = () => {
        // If user signs in with microsoft
        // Show sign in popup
        instance.loginPopup(loginRequest).catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <Box sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper elevation={0} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                }}>
                    <Typography fontSize={38}>Unify</Typography>
                    <Typography fontSize={14} mb={4}>BETA</Typography>
                    <Button variant="contained" onClick={microsoftSignInHandler}>Sign in with Microsoft</Button>
                    <Typography fontSize={14} mt={2} fontStyle={"italic"}>Please contact your IT administrator to report any issues</Typography>
                </Paper>
            </Box>
        </>
    )
}

export default Login