import React, { useEffect } from "react";
import { Box, Paper, Button, Text, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { loginHandler, msalInstance } from "../utils/MsalAuthHandler";
import { IconBrandWindowsFilled, IconMoon, IconSun } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { AuthenticationResult } from "@azure/msal-browser";

function Login() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();

    const colorSchemeToggle = () => {
        if (colorScheme === 'dark') {
            setColorScheme('light');
        } else {
            setColorScheme('dark');
        }
    };

    useEffect(() => {
        msalInstance.handleRedirectPromise().then((response: AuthenticationResult | null) => {
            if (response !== null && response.account) {
                msalInstance.setActiveAccount(response.account);
                const assignedRoles = response.account.idTokenClaims?.roles;

                if (assignedRoles) {
                    switch (assignedRoles[0]) {
                        case 'Admin':
                            // redirect to admin
                            navigate("/admin/dashboard");
                            break;
                        case 'Finance':
                            // redirect to finance
                            navigate("/finance/orders");
                            break;
                        case 'User':
                            // redirect to user
                            navigate("/");
                            break;
                        default:
                            navigate('/login');
                            break;
                    }
                }
            }
        });
    }, [])

    return (
        <>
            <Box style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper shadow="md" mb="16px" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "48px",
                    borderRadius: "16px",
                    border: "1px solid var(--divider-border-color)"
                }}>
                    <Text size="38px">Unify</Text>
                    <Text size="14px">BETA</Text>
                    <Button my="32px" onClick={loginHandler} leftSection={<IconBrandWindowsFilled />}>Sign in with Microsoft</Button>
                    <Text size="14px" c="gray">Please contact your IT administrator to report any issues</Text>
                </Paper>
                <ActionIcon className="unify-button-subtle" onClick={colorSchemeToggle}>
                    {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                </ActionIcon>
            </Box>
        </>
    )
}

export default Login