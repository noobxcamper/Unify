import React from "react";
import { useAccount } from "@azure/msal-react";
import { Typography } from "@mui/material";

function AccountPage() {
    const account = useAccount();

    return (
        <>
        <Typography>{account?.name}</Typography>
        </>
    )
}

export default AccountPage;