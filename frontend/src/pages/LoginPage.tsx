import React from "react";
import { Typography } from "@mui/material";
import { Box, Paper, Button } from "@mantine/core";
import { loginHandler } from "../utils/MsalAuthHandler";
import { IconBrandWindowsFilled } from "@tabler/icons-react";

function Login() {
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
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid var(--divider-border-color)"
                }}>
                    <Typography fontSize={38}>Unify</Typography>
                    <Typography fontSize={14} mb={4}>BETA</Typography>
                    <Button variant="contained" onClick={loginHandler} leftSection={<IconBrandWindowsFilled />}>Sign in with Microsoft</Button>
                    <Typography fontSize={14} mt={2} color="gray">Please contact your IT administrator to report any issues</Typography>
                </Paper>
            </Box>
        </>
    )
}

export default Login