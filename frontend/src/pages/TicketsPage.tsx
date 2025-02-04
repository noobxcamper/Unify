import React from "react";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Typography } from "@mui/material";

function TicketsPage() {
    return (
        <>
            <Typography fontSize={32}>Tickets</Typography>
            <Button
                component="a"
                href="/tickets/loser"
                rightSection={<IconArrowRight size={14} />}
            >
                Visit the Loser
            </Button>
        </>
    )
}

export default TicketsPage;