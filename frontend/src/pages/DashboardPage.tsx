import { Button, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";

function DashboardPage() {
    useEffect(() => {
        notifications.show({
            title: "Test Notification",
            message: "Hello World"
        });
    }, [])

    return (
        <>
            <Text size="lg">Dashboard</Text>
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