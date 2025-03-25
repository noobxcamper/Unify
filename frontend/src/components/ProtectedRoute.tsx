import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";
import { AccountInfo, IdTokenClaims } from "@azure/msal-browser";
import { Box, Button, Paper, Text } from "@mantine/core";
import { getIdTokenSilently, getGraphTokenSilently, isAdmin, logoutHandler } from "../utils/MsalAuthHandler";
import { InvalidTokenError } from "jwt-decode";
import { IconChevronLeft, IconLogout2 } from "@tabler/icons-react";
import LoadingOverlay from "./LoadingOverlay";

function ProtectedRoute({ children, requiredRoles }: { children: any, requiredRoles: string[] }) {
    // Get the MSAL instance object
    const { instance } = useMsal();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    // Navigation hook
    const navigate = useNavigate();

    const refreshTokens = async () => {
        try {
            // Grab the token from the local storage
            const idTokenClaims: IdTokenClaims = instance.getActiveAccount()?.idTokenClaims as IdTokenClaims;

            // Check if is admin and grab the graph token as well
            if (isAdmin(idTokenClaims)) {
                // Refresh the token by grabbing it again silently
                getGraphTokenSilently();
            }

            // Refresh the token by grabbing it again silently
            getIdTokenSilently();
        }
        catch (error) {
            if (error instanceof InvalidTokenError) {
                console.log("Invalid Token, likely expired");
                console.log(error);
            }
        }
    }

    // When the page loads async
    const onPageLoad = async () => {
        // Get the current active account's info
        const activeAccount: AccountInfo = instance.getActiveAccount()!;

        // Check if account is valid first
        if (activeAccount) {
            // Get the token id claims
            const idTokenClaims = activeAccount.idTokenClaims as IdTokenClaims;
            
            // Get the roles for the user from the claims
            const userRoles: string[] = idTokenClaims.roles!;

            // Check to see if the user has ALL the required roles for this page
            const hasAllRoles = requiredRoles.every(role => userRoles.includes(role));

            // If the user is Admin OR has all roles, allow access
            if(userRoles.includes("Admin") || hasAllRoles) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } else {
            // Account is invalid, meaning it's most likely not signed in, redirect to login page
            setIsAuthorized(false);
            navigate("/login");
            // navigate(`/login?redirect=${window.location.pathname}`);
        }
    };

    useEffect(() => {
        onPageLoad();
        refreshTokens();
    }, []);

    // If authorized is null, meaning the page is still loading
    if (isAuthorized === null) {
        return (
            <>
                <LoadingOverlay visible={true} overlayMessage="Page is loading... please wait" />
            </>
        )
    }

    if (isAuthorized === true) {
        return (
            <>
                {children}
            </>
        )
    }
    else {
        return (
            <Box style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Paper shadow={"lg"} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "64px",
                    borderRadius: "8px",
                    border: "1px solid var(--divider-border-color)"
                }}>
                    <Text mb={"lg"} size={"26px"} fw={600}>You do not have access to this page.</Text>
                    <Text mb={"lg"}>If you believe this to be a mistake, please contact your IT administrator.</Text>

                    <Box style={{
                        display: "inline-flex"
                    }}>
                        <Button mr={"md"} leftSection={<IconChevronLeft />} onClick={() => navigate(-1)}>Previous Page</Button>
                        <Button leftSection={<IconLogout2 />} onClick={logoutHandler}>Logout</Button>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export {
    ProtectedRoute
}