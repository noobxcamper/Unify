import React, { useState } from "react"
import { Button, List, Paper, ThemeIcon } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { Box, Typography } from "@mui/material";
const rickRoll = require("../assets/audio/Rick-Roll.mp3")
const rickRollVideo = require("../assets/audio/Rick-Roll-Video.mp4")

function TodoList() {
    return (
        <>
            <Paper shadow="sm" radius="lg" withBorder p="lg" mb={20}>
                <Typography my={2}>Cannon</Typography>
                <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={<ThemeIcon color="blue" size={24} radius="xl"><IconCircleDashed size={16} /></ThemeIcon>}
                >
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Dashboard layout</List.Item>
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Navigation</List.Item>
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Implement Microsoft SSO</List.Item>
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Finish setting up the orders view page</List.Item>
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Make breadcrumbs clickable links</List.Item>
                    <List.Item icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCircleCheck size={16} /></ThemeIcon>}>Implement a rich text editor</List.Item>
                    <List.Item>Finish implementing order submission functionality, needs to just send requests to the API</List.Item>
                    <List.Item>Allow scrolling inside the navigation sidebar</List.Item>
                </List>
            </Paper>

            <Paper shadow="md" radius="lg" withBorder p="lg" mb={20}>
                <Typography my={2}>Side Quests</Typography>
                <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={<ThemeIcon color="blue" size={24} radius="xl"><IconCircleDashed size={16} /></ThemeIcon>}
                >
                    <List.Item>Implement theme colors for dark and light mode</List.Item>
                    <List.Item>Implement RBAC</List.Item>
                    <List.Item>User management</List.Item>
                    <List.Item>Knowledgebase? 👀</List.Item>
                    <List.Item>Tickets??? Very ambitious ❤️</List.Item>
                </List>
            </Paper>

            <AudioTroll />
        </>
    )
}

function AudioTroll() {
    const [playState, setPlayState] = useState<boolean>(false);
    var audio = new Audio(rickRoll);

    const handlePlay = () => {
        audio.play();

        setPlayState(true);
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Button variant="filled" onClick={handlePlay} mb={8}>Do not click me (please)</Button>
                {playState ? <video src={rickRollVideo} autoPlay loop width={270} height={320} /> : <></>}
            </Box>
        </>
    )
}

export default TodoList;