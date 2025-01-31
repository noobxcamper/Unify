import { useMsal } from "@azure/msal-react";
import { ActionIcon, Menu } from "@mantine/core";
import { IconLogout2, IconSettings, IconUserCircle } from "@tabler/icons-react";
import React, { useState } from "react";

function AccountMenuButton() {
    const { instance } = useMsal();
    const [opened, setOpened] = useState(false);

    const openMenu = () => {
        setOpened(true);
    };

    const logout =() => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/login",
        });
    }

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
                    <Menu.Item component="a" href="/account" leftSection={<IconSettings size={14} />}>
                        Settings
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item component="button" onClick={logout} leftSection={<IconLogout2 size={14} />}>
                        Sign Out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default AccountMenuButton;