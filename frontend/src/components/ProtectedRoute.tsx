import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";
import { AccountInfo, IdTokenClaims } from "@azure/msal-browser";
import { Box, Button, LoadingOverlay, Paper, Text } from "@mantine/core";
import { didTokenExpire, getIdTokenSilently, getGraphTokenSilently, GRAPH_ACCESS_TOKEN, logoutHandler, isAdmin } from "../utils/MsalAuthHandler";
import { InvalidTokenError, jwtDecode } from "jwt-decode";
import { IconHome } from "@tabler/icons-react";

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

            // If the user is an Admin
            if (isAdmin(idTokenClaims)) {
                // Get the graph token from the localstorage
                const graphToken = jwtDecode(localStorage.getItem(GRAPH_ACCESS_TOKEN) ?? "Empty");

                // If the token expired
                if (didTokenExpire(graphToken.exp)) {
                    // Refresh the token by grabbing it again silently
                    console.log("Graph API Token expired. Refreshing...");
                    getGraphTokenSilently();
                }
            }

            // If the application api token expired
            if (didTokenExpire(idTokenClaims.exp)) {
                // Refresh the token by grabbing it again silently
                getIdTokenSilently().then(() => {
                    console.log("Application API Token expired. Refreshing...");
                });
            }
        }
        catch (error) {
            if (error instanceof InvalidTokenError) {
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
            const idTokenClaims = activeAccount.idTokenClaims as IdTokenClaims;
            const hasRequiredRole = idTokenClaims.roles?.filter(role => requiredRoles.includes(role));
            console.log(hasRequiredRole);

            for (var i = 0; i < requiredRoles.length; i++) {
                if (idTokenClaims.roles?[i].toString() == requiredRoles[i]) {

                }
            }

            idTokenClaims.roles?.forEach((role) => {
                if (requiredRoles.includes(role)) {
                    console.log(role);
                    setIsAuthorized(true);
                } else {
                    console.log("nope");
                    setIsAuthorized(false);
                }
            });
        } else {
            // Account is invalid, meaning it's most likely not signed in, redirect to login page
            setIsAuthorized(false);
            navigate("/login");
            // navigate(`/login?redirect=${window.location.pathname}`);
        }
    };

    useEffect(() => {
        (async () => {
            await onPageLoad();
            await refreshTokens();
        })();
    }, []);

    // If authorized is null, meaning the page is still loading
    if (isAuthorized === null) {
        return (
            <>
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
            <>
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
                        border: "1px solid #e9e9e9"
                    }}>
                        <Text size={"26px"} fw={600}>You do not have access to this page.</Text>
                        <Text my={"xl"}>If you believe this to be a mistake, please contact your IT administrator.</Text>
                        <Button leftSection={<IconHome />} onClick={() => window.location.href= "/"}>Return Home</Button>
                    </Paper>
                </Box>
            </>
        )
    }
}

export {
    ProtectedRoute
}