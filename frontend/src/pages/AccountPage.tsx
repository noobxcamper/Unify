import React, { useEffect } from "react";
import { useAccount, useMsal } from "@azure/msal-react";
import { Typography } from "@mui/material";
import { msiApiGet } from "../utils/api";

function AccountPage() {
    const account = useAccount();

    const getUserGroups = () => {
        const response = msiApiGet("/me/memberof", localStorage.getItem("token"));
    };

    useEffect(() => {
        getUserGroups();
    },[])

    return (
        <>
            <Typography>{account?.name}</Typography>
            <Typography>Token: {localStorage.getItem("token")}</Typography>
        </>
    )
}

export default AccountPage;