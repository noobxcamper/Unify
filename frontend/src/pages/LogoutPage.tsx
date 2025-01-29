import React from "react";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import IconLogout from '@tabler/icons-react';

function Logout() {
    // Get the MSAL instance
    const { instance } = useMsal();

    // Navigation constant
    const navigate = useNavigate();

    const microsoftSignOutHandler = () => {
        // Sign out user
        instance.logout().catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <Button variant="outlined" onClick={microsoftSignOutHandler}>Sign out</Button>
        </>
    )
}

export default Logout