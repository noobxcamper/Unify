import React from "react";
import { Box, Paper, Button, Text, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { loginHandler } from "../utils/MsalAuthHandler";
import { IconBrandWindowsFilled, IconMoon, IconSun } from "@tabler/icons-react";

function Login() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const colorSchemeToggle = () => {
        if (colorScheme === 'dark') {
            setColorScheme('light');
        } else {
            setColorScheme('dark');
        }
    };

    return (
        <>
            <Box style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper shadow={"md"} mb="16px" style={{
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