import { IdTokenClaims } from "@azure/msal-browser";
import { useAccount } from "@azure/msal-react";
import { Button, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";

function DashboardPage() {
    const account = useAccount();
    const idTokenClaims = account?.idTokenClaims as IdTokenClaims

    useEffect(() => {
        notifications.show({
            title: "Test Notification",
            message: "Hello World"
        });
    }, [])

    return (
        <>
            <Text size="lg">Dashboard</Text>
            <Text>{idTokenClaims['roles']}</Text>
            <Group>
                <Button>Normal Button</Button>
                <Button className="unify-button-light">Light Button</Button>
                <Button className="unify-button-outline">Outline Button</Button>
                <Button className="unify-button-subtle">Subtle Button</Button>
            </Group>
        </>
    )
}

export default DashboardPage;