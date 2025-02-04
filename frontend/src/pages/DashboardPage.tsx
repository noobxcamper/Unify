import { IdTokenClaims } from "@azure/msal-browser";
import { useAccount } from "@azure/msal-react";
import { Text } from "@mantine/core";
import React from "react";

function DashboardPage() {
    const account = useAccount();
    const idTokenClaims = account?.idTokenClaims as IdTokenClaims

    return (
        <>
            <Text size="lg">Dashboard</Text>
            <Text>{idTokenClaims['roles']}</Text>
        </>
    )
}

export default DashboardPage;