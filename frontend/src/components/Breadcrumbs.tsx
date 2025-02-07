import React from "react";
import { useLocation, useNavigate } from "react-router";
import { firstCharacterUppercase } from "../utils/utilities";
import { Box, Link } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

function Breadcrumbs() {
    const location = useLocation();
    const navigate = useNavigate();
    let currentLink = '';
    let uniqueId: any;

    const crumbs = location.pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`
            crumb = firstCharacterUppercase(crumb);
            uniqueId = uuidv4();

            return (
                <Box key={uniqueId} sx={{ ":after": { m: "0px 10px", content: '"→"' }, ':last-child:after': { content: '""' } }}>
                    <Link sx={{ color: "black" }} href={currentLink}>{crumb}</Link>
                </Box>
            )
        });

    return (
        <Box sx={{ display: "inline-flex", alignItems: "center", my: 2 }}>
            {/* <Button
                style={{
                    height: "auto",
                    padding: 0,
                    color: "black"
                }}
                variant="subtle"
                onClick={(() => navigate(-1))}>
                <IconArrowLeft />
            </Button> */}
            {crumbs}
        </Box>
    )
}

export default Breadcrumbs;