import { Box, Button, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import React from "react";
import { logoutHandler } from "../utils/MsalAuthHandler";
import { useAccount } from "@azure/msal-react";

function UserApp() {
    const instance = useAccount();

    return (
        <Box style={{
            padding: "36px"
        }}>
            <Text size="34px">Welcome, {instance?.name}</Text>
            <Button mt={"lg"} leftSection={<IconLogout />} onClick={logoutHandler}>Logout</Button>
        </Box>
    )
}

export default UserApp;