import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { Button } from "@mantine/core";
import { IconBrandTeams, IconCheck, IconDeviceFloppy, IconExternalLink, IconMail, IconTruck } from "@tabler/icons-react";
import api from "../utils/api";
import Stack from "../components/Stack";
import { getOrderStatusText } from "../constants/enums";
import TextEditor from "../components/RichTextEditor";
import { LoadingSkeletonSingle, LoadingSkeletonMulti } from "../components/LoadingSkeleon";

interface IOrder {
    submission_id: string,
    submission_date: string,
    status: number,
    responder: string,
    email: string,
    department: string,
    items: string,
    price: number,
    variation: string,
    notes: string,
    quantity: number,
    ship_to: string,
    shipping_address: string,
    hyperlink: string,
    trackingUrl: string,
    private_notes: string
}

function OrderItemText({ label = "Label", text }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={14} color="gray">{label}</Typography>
            <Typography>{text}</Typography>
        </div>
    )
}

function OrderItemPill({ label = "Label", text, color = "#e9e9e9" }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <Typography fontSize={14} color="gray">{label}</Typography>
            <Typography fontSize={12} style={{ backgroundColor: color, padding: "2px 12px", borderRadius: "5px" }}>{text}</Typography>
        </div>
    )
}

export default function Order() {
    let { orderId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<IOrder>();

    useEffect(() => {
        setIsLoading(true);

        api.get(`/orders/${orderId}`)
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });

        console.log(data?.email);
    }, []);

    return (
        <>
            {/* Top row */}
            {isLoading ? <LoadingSkeletonSingle /> :
                <Stack orientation="row" margin="0px 0px 30px 0px">
                    <Button
                        variant="outline"
                        leftSection={<IconBrandTeams />}
                        component="a"
                        href={`sip:${data?.email}`}>
                        Send Message
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<IconMail />}
                        component="a"
                        href={`mailto:${data?.email}`}>
                        Send Email
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<IconExternalLink />}
                        component="a"
                        href={data?.hyperlink}
                        target="_blank">
                        Product Page
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<IconTruck />}
                        component="a"
                        href={data?.trackingUrl}
                        target="_blank">
                        Tracking
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<IconCheck />}>
                        Submit Order
                    </Button>
                </Stack>
            }

            {isLoading ? <LoadingSkeletonMulti /> :
                <Stack orientation="row" spacing="80px">
                    <Stack orientation="column">
                        <OrderItemText label="Date" text={data?.submission_date} />
                        <OrderItemText label="Department" text={data?.department} />
                        <OrderItemText label="Name" text={data?.responder} />
                        <OrderItemText label="Email" text={data?.email} />
                    </Stack>
                    <Stack orientation="column">
                        <OrderItemPill label="Order Status" text={getOrderStatusText(data?.status ?? 4)} color={data?.status === 0 ? "#e9e9e9" : data?.status === 1 ? "#c4ffba" : data?.status === 2 ? "#bacaff" : data?.status === 3 ? "#fc7979" : "#e9e9e9"} />
                        <OrderItemText label="Items" text={data?.items} />
                        <OrderItemText label="Quantity" text={data?.quantity} />
                        <OrderItemText label="Price Per Item" text={"$" + data?.price} />
                    </Stack>
                </Stack>
            }

            {isLoading ? <LoadingSkeletonMulti /> :
                <Stack orientation="column" margin="30px 0px 0px 0px">
                    <TextEditor content={`${data?.private_notes}`} />
                    <Button
                        variant="outline"
                        leftSection={<IconDeviceFloppy />}>
                        Save
                    </Button>
                </Stack>
            }
        </>
    )
}