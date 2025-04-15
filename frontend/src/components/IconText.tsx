import { Group, Stack, Text } from "@mantine/core";
import { IconPlaceholder } from "@tabler/icons-react";
import React from "react";

function IconText({text, icon = <IconPlaceholder />}) {
    return (
        <Group gap="lg">
            {icon}
            <Text ta="center" lineClamp={1}>{text}</Text>
        </Group>
    )
}

export default IconText;