import React from "react";
import { Container, Box, Button, Text, Divider } from "@mantine/core";
import { IconLogout, IconLogout2 } from "@tabler/icons-react";
import { logoutHandler } from "../utils/MsalAuthHandler";
import { useAccount } from "@azure/msal-react";
import { Outlet } from "react-router";

function UserApp() {
    const instance = useAccount();

    return (
        <Box style={{
            padding: "36px"
        }}>
            <Text size="34px">Welcome, {instance?.name}</Text>
            <Button mt={"lg"} leftSection={<IconLogout2 />} onClick={logoutHandler}>Sign out</Button>

            <Divider my={"lg"}/>

            {/* <Container> */}
                <Outlet />
            {/* </Container> */}
        </Box>
    )
}

export default UserApp;