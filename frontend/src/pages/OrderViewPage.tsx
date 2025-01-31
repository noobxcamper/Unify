import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Tooltip } from "@mantine/core";
import { IconBrandTeams, IconCheck, IconDeviceFloppy, IconExternalLink, IconMail, IconTruck } from "@tabler/icons-react";
import api from "../utils/api";
import Stack from "../components/Stack";
import TextEditor from "../components/RichTextEditor";
import { formatPrice } from "../utils/Utils";
import { getOrderStatusText } from "../constants/enums";
import { LoadingSkeletonSingle, LoadingSkeletonMulti } from "../components/LoadingSkeleon";
import { TableItemPill, TableItemText } from "../components/TableItems";
import OrderStatusPill from "../components/OrderStatusPill";

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
    tracking_url: string,
    private_notes: string
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
    }, []);

    return (
        <>
            {/* Top row */}
            {isLoading ? <LoadingSkeletonSingle /> :
                <Stack orientation="row" margin="0px 0px 30px 0px">
                    <Tooltip position="bottom" label={`Send ${data?.responder} a message on Teams`}>
                        <Button
                            variant="outline"
                            leftSection={<IconBrandTeams />}
                            component="a"
                            href={`sip:${data?.email}`}>
                            Send Message
                        </Button>
                    </Tooltip>

                    <Tooltip position="bottom" label={`Send ${data?.responder} an email`}>
                        <Button
                            variant="outline"
                            leftSection={<IconMail />}
                            component="a"
                            href={`mailto:${data?.email}`}>
                            Send Email
                        </Button>
                    </Tooltip>

                    <Button
                        variant="outline"
                        leftSection={<IconExternalLink />}
                        component="a"
                        href={data?.hyperlink}
                        target="_blank">
                        Product Page
                    </Button>

                    <Tooltip position="bottom" label={data?.tracking_url ? `Visit page` : "No tracking url"}>
                        <Button
                            variant="outline"
                            leftSection={<IconTruck />}
                            component="a"
                            href={data?.tracking_url}
                            target="_blank">
                            Tracking
                        </Button>
                    </Tooltip>

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
                        <TableItemText label="Date" text={data?.submission_date} />
                        <TableItemText label="Department" text={data?.department} />
                        <TableItemText label="Name" text={data?.responder} />
                        <TableItemText label="Email" text={data?.email} />
                    </Stack>
                    <Stack orientation="column">
                        <OrderStatusPill label="Order Status" status={data?.status} />
                        <TableItemText label="Items" text={data?.items} />
                        <TableItemText label="Quantity" text={data?.quantity} />
                        <TableItemText label="Price Per Item" text={formatPrice(data?.price ?? 0)} />
                    </Stack>
                    <Stack orientation="column">
                        <TableItemText label="Ship To" text={data?.ship_to} />
                        <TableItemText label="Address" text={data?.shipping_address ? data.shipping_address : "None"} />
                        <TableItemText label="Notes" text={data?.notes ? data.notes : "None"} />
                        <TableItemText label="Variation" text={data?.variation ? data.variation : "None"} />
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