import { Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconPlaceholder } from "@tabler/icons-react";
import React from "react";

function IconText({ text, icon = <IconPlaceholder />, tooltip = "" }) {
    return (
        <Group>
            {icon}
            <Tooltip position="bottom" label={tooltip === "" ? text : tooltip}>
                <Text ta="center" style={{
                    textAlign: "start",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "75%",
                    overflow: "hidden"
                }}>{text}</Text>
            </Tooltip>
        </Group>
    )
}

export default IconText;