import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { ActionIcon, Menu, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconLogout2, IconMoon, IconSettings, IconSun, IconUserCircle } from "@tabler/icons-react";
import { logoutHandler } from "../utils/MsalAuthHandler";
// import { GRAPH_ACCESS_TOKEN, API_ACCESS_TOKEN } from "../settings/authConfig";

function AccountMenuButton() {
    // Get theme hook
    const { setColorScheme } = useMantineColorScheme();

    // Get the current theme variation
    const computedColorScheme = useComputedColorScheme();

    const [opened, setOpened] = useState(false);

    const openMenu = () => {
        setOpened(true);
    };

    return (
        <>
            <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
                <Menu.Target>
                    <ActionIcon
                        onClick={openMenu}
                        variant="subtle"
                        style={{
                            color: "black",
                        }}>
                        <IconUserCircle size={22} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item component="a" href="/admin/account" leftSection={<IconSettings size={14} />}>
                        Settings
                    </Menu.Item>

                    {computedColorScheme == "light" ?
                        <Menu.Item component="button" onClick={() => setColorScheme("dark")} leftSection={<IconMoon size={14} />}>
                            Dark Mode
                        </Menu.Item>
                        :
                        <Menu.Item component="button" onClick={() => setColorScheme("light")} leftSection={<IconSun size={14} />}>
                            Light Mode
                        </Menu.Item>
                    }

                    <Menu.Divider />

                    <Menu.Item component="button" onClick={logoutHandler} leftSection={<IconLogout2 size={14} />}>
                        Sign Out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default AccountMenuButton;