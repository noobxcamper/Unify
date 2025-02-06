import React, { useState } from "react";
import { ActionIcon, Menu, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconLogout2, IconMoon, IconSettings, IconSun, IconUserCircle } from "@tabler/icons-react";
import { logoutHandler } from "../utils/MsalAuthHandler";

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
                    <Menu.Item component="a" href="/admin/account" leftSection={<IconSettings size={18} />}>
                        Settings
                    </Menu.Item>

                    {computedColorScheme == "light" ?
                        <Menu.Item component="button" onClick={() => setColorScheme("dark")} leftSection={<IconMoon size={18} />}>
                            Dark Mode
                        </Menu.Item>
                        :
                        <Menu.Item component="button" onClick={() => setColorScheme("light")} leftSection={<IconSun size={18} />}>
                            Light Mode
                        </Menu.Item>
                    }

                    <Menu.Divider />

                    <Menu.Item component="button" onClick={logoutHandler} leftSection={<IconLogout2 size={18} />}>
                        Sign Out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default AccountMenuButton;