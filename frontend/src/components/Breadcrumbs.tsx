import React from "react";
import { useLocation, useNavigate } from "react-router";
import { firstCharacterUppercase } from "../utils/Utils";
import { Box, Link } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { v4 as uuidv4 } from 'uuid';

function Breadcrumbs() {
    const location = useLocation();
    const navigate = useNavigate();
    let currentLink = '';

    const crumbs = location.pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`
            crumb = firstCharacterUppercase(crumb);

            return (
                <>
                    <Box sx={{ ":before": { m: "0px 10px", content: '"/"' } }}>
                        <Link sx={{ color: "black" }} href={currentLink} key={uuidv4()}>{crumb}</Link>
                    </Box>
                </>
            )
        });

    return (
        <Box sx={{ display: "inline-flex", alignItems: "center", my: 2 }}>
            <Button
                style={{
                    height: "auto",
                    padding: 0,
                    color: "black"
                }}
                variant="subtle"
                onClick={(() => navigate(-1))}>
                <IconArrowLeft />
            </Button>
            {crumbs}
        </Box>
    )
}

export default Breadcrumbs;