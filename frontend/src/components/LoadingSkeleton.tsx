import { Skeleton, Stack } from "@mui/material";
import React from "react"

function LoadingSkeletonSingle({ height = 30 }) {
    return (
        <>
            <Stack mb={1}>
                <Skeleton variant="rounded" height={height} />
            </Stack>
        </>
    )
}

function LoadingSkeletonMulti() {
    return (
        <>
            <Stack spacing={1}>
                <Skeleton variant="rounded" height={20} />
                <Skeleton variant="rounded" height={60} />
                <Skeleton variant="rounded" height={150} />
            </Stack>
        </>
    )
}

export {
    LoadingSkeletonSingle,
    LoadingSkeletonMulti
};