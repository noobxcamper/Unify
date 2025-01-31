import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Input, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconBrandTeams, IconCheck, IconDeviceFloppy, IconExternalLink, IconMail, IconProgress, IconTruck, IconX } from "@tabler/icons-react";
import { formatPrice } from "../utils/Utils";
import { LoadingSkeletonSingle, LoadingSkeletonMulti } from "../components/LoadingSkeleon";
import { TableItemText, TableItemPill } from "../components/TableItems";
import api from "../utils/api";
import Stack from "../components/Stack";
import TextEditor from "../components/RichTextEditor";
import { Typography } from "@mui/material";

interface IOrder {
    id: number,
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

function SubmitButtonWithModal({ orderId }) {
    const [opened, { open, close }] = useDisclosure(false);

    const submitOrderClick = () => {
        api.patch(`/orders/${orderId}`, { "status": 1 });
        window.location.reload();
    };

    return (
        <>
            <Tooltip position="bottom" label="Submit this order">
                <Button
                    onClick={open}
                    variant="outline"
                    leftSection={<IconCheck />}>
                    Submit Order
                </Button>
            </Tooltip>

            <Modal opened={opened} onClose={close} title="Submit Order">
                <Input.Wrapper label="Tracking URL" description="If no tracking url is provided, leave blank" mb={"8px"}>
                    <Input />
                </Input.Wrapper>
                <Typography fontSize={12} mb={"8px"}>Submitting an order cannot be reversed. Please complete all necessary steps before submitting.</Typography>
                <Button
                    onClick={submitOrderClick}
                    variant="outline"
                    color="green"
                    leftSection={<IconCheck />}>
                    Submit
                </Button>
            </Modal>
        </>
    )
}

function CancelButtonWithModal({ orderId }) {
    const [opened, { open, close }] = useDisclosure(false);

    const cancelOrderClick = () => {
        api.patch(`/orders/${orderId}`, { "status": 3 });
        window.location.reload();
    };


    return (
        <>
            <Tooltip position="bottom" label="Cancel this order">
                <Button
                    onClick={open}
                    variant="outline"
                    leftSection={<IconX />}>
                    Cancel Order
                </Button>
            </Tooltip>

            <Modal opened={opened} onClose={close} title="Cancel Order">
                <Typography mb={"8px"} fontSize={14}>Are you sure you want to cancel this order?</Typography>
                <Typography color="gray" mb={"8px"} fontSize={12}>This operation cannot be reversed and the order will need to be resubmitted.</Typography>
                <Button
                    onClick={cancelOrderClick}
                    variant="outline"
                    color="red"
                    leftSection={<IconX />}>
                    Cancel
                </Button>
            </Modal>
        </>
    )
}

export default function Order() {
    let { orderId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<IOrder>();

    const handleSubmitClick = (trackingUrl: string) => {
    };

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

                    <Tooltip position="bottom" label="Visit product page in a new tab">
                        <Button
                            variant="outline"
                            leftSection={<IconExternalLink />}
                            component="a"
                            href={data?.hyperlink}
                            target="_blank">
                            Product Page
                        </Button>
                    </Tooltip>

                    <Tooltip position="bottom" label={data?.tracking_url ? `Visit tracking url page in a new tab` : "No tracking url"}>
                        <Button
                            variant="outline"
                            leftSection={<IconTruck />}
                            component="a"
                            href={data?.tracking_url}
                            target="_blank">
                            Tracking
                        </Button>
                    </Tooltip>


                    {data?.status === 3 || data?.status === 1 ?
                        <></> :
                        <>
                            <Tooltip position="bottom" label="Mark order as in progress">
                                <Button
                                    variant="outline"
                                    leftSection={<IconProgress />}>
                                    In Progress
                                </Button>
                            </Tooltip>
                            <SubmitButtonWithModal orderId={data?.id} />
                            <CancelButtonWithModal orderId={data?.id} />
                        </>}
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
                        <TableItemPill label="Order Status" status={data?.status} />
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