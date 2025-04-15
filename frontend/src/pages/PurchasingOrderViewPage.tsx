import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ActionIcon, Box, Button, Card, Container, Divider, Grid, Group, Input, Menu, Modal, Stack, Table, Text, Textarea, Title, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAddressBook, IconArrowLeft, IconArrowsShuffle, IconBell, IconBox, IconBrandTeams, IconCalendar, IconCheck, IconClick, IconClock, IconCurrencyDollar, IconDeviceFloppy, IconDots, IconExternalLink, IconMail, IconNote, IconNumber, IconPackages, IconProgress, IconReceipt, IconSitemap, IconTex, IconTruck, IconTruckDelivery, IconUser, IconX } from "@tabler/icons-react";
import { LoadingSkeletonSingle } from "../components/LoadingSkeleton";
import { TableItemText, TableItemPill } from "../components/TableItems";
import { formatPrice } from "../utils/utilities";
import { backendAPI, powerAutomateApi } from "../utils/api";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import TextEditor from "../components/RichTextEditor";
import IconText from "../components/IconText";
import { getOrderStatusText } from "../constants/enums";

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
    invoice_uploaded: boolean,
    private_notes: string
}

function SubmitModal({ token, data, modalOpened, onModalClose }: { token: string, data: IOrder, modalOpened: boolean, onModalClose: () => void }) {
    const [notes, setNotes] = useState<string>();
    const [trackingUrl, setTrackingUrl] = useState<string>();

    const submitOrderClick = () => {
        // Update the database on the backend
        backendAPI(token).patch(`/orders/${data.submission_id}`, { "status": 1, "notes": notes, "tracking_url": trackingUrl }).then(() => {
            // Set the data status to in progress
            data.status = 1;
            // Submit notification to Power Automate
            powerAutomateApi(data).then(() => {
                // Refresh the current page
                window.location.reload();
            });
        });
    };

    return (
        <Modal opened={modalOpened} onClose={onModalClose} title="Submit Order">
            <Input.Wrapper label="Tracking URL" description="If no tracking URL is provided, leave blank" mb="8px">
                <Input onChange={(event) => setTrackingUrl(event.currentTarget.value)} />
            </Input.Wrapper>
            <Input.Wrapper label="Notes" mb="8px">
                <Textarea onChange={(event) => setNotes(event.currentTarget.value)} />
            </Input.Wrapper>
            <Text size="12px" mb="8px">
                Submitting an order cannot be reversed. Please complete all necessary steps before submitting.
            </Text>
            <Text size="12px" mb="8px">
                Note: It can take up to 30 minutes for the notification to reach the user.
            </Text>
            <Button
                onClick={submitOrderClick}
                variant="outline"
                color="green"
                leftSection={<IconCheck />}
            >
                Submit
            </Button>
        </Modal>
    )
}

function CancelModal({ token, data, modalOpened, onModalClose }: { token: string, data: IOrder, modalOpened: boolean, onModalClose: () => void }) {
    const [notes, setNotes] = useState<string>();

    const cancelOrderClick = () => {
        // Update the database on the backend
        backendAPI(token).patch(`/orders/${data.submission_id}`, { "status": 3, "notes": notes }).then(() => {
            // Set the data status to in progress
            data.status = 3;
            // Submit notification to Power Automate
            powerAutomateApi(data).then(() => {
                // Refresh the current page
                window.location.reload();
            });
        });
    };

    return (
        <Modal opened={modalOpened} onClose={onModalClose} title="Submit Order">
            <Text mb={"8px"} size={"14px"}>Are you sure you want to cancel this order?</Text>
            <Text c="gray" mb={"8px"} size={"12px"}>This operation cannot be reversed and the order will need to be resubmitted.</Text>
            <Input.Wrapper label="Notes" mb="16px">
                <Textarea onChange={(event) => setNotes(event.currentTarget.value)} />
            </Input.Wrapper>
            <Button
                onClick={cancelOrderClick}
                variant="outline"
                color="red"
                leftSection={<IconX />}>
                Cancel
            </Button>
        </Modal>
    )
}

const inProgress = ({ token, data }: { token: string, data: IOrder | any }) => {
    backendAPI(token).patch(`/orders/${data.submission_id}`, { "status": 2 }).then(() => {
        // Set the data status to in progress
        data.status = 2;
        // Submit notification to Power Automate
        powerAutomateApi(data).then(() => {
            // Refresh the current page
            window.location.reload();
        });
    });
}

const saveNotes = ({ token, orderId, notes }) => {
    // Patch the order with the new private notes
    backendAPI(token).patch(`/orders/${orderId}`, { "private_notes": notes }).then(() => {
        // Show notification
        notifications.show({
            title: "Private Notes Saved",
            message: "Your private notes have been successfully saved for this order!",
        })
    });
};

function PurchasingOrderViewPage() {
    let { orderId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem(API_ACCESS_TOKEN) ?? "None";
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<IOrder>();
    const [editorText, setEditorText] = useState<string>();

    // Modal states
    const [submitModalOpened, setSubmitModalOpened] = useState<boolean>(false);
    const [cancelModalOpened, setCancelModalOpened] = useState<boolean>(false);

    // Invoice download URL state
    const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);

        // Get order
        backendAPI(token).get(`/orders/${orderId}`)
            .then(response => {
                setData(response.data);
                setIsLoading(false);

                // Get invoice URL if available
                backendAPI(token).get(`/files/download?filename=PO${response.data.submission_id}-final-invoice.pdf`)
                    .then((response) => {
                        setInvoiceUrl(response.data.download_url);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        // <Container>
        //     {/* Top row */}
        //     {isLoading ? <LoadingSkeletonSingle height={50} /> :
        //         <Group justify="flex-start" mb="30px">
        //             <Tooltip position="bottom" label="Go back">
        //                 <ActionIcon
        //                     style={{
        //                         marginRight: "auto"
        //                     }}
        //                     className="unify-button-subtle"
        //                     onClick={() => navigate(-1)}>
        //                     <IconArrowLeft size={22} />
        //                 </ActionIcon>
        //             </Tooltip>

        //             <Tooltip position="bottom" label="Save your private notes">
        //                 <ActionIcon
        //                     className="unify-button-subtle"
        //                     onClick={() => saveNotes({ token, orderId: data?.submission_id, notes: editorText })}>
        //                     <IconDeviceFloppy size={22} />
        //                 </ActionIcon>
        //             </Tooltip>

        //             <Menu
        //                 shadow="md"
        //                 width={200}>
        //                 <Menu.Target>
        //                     <ActionIcon className="unify-button-subtle">
        //                         <IconDots />
        //                     </ActionIcon>
        //                 </Menu.Target>

        //                 <Menu.Dropdown>
        //                     <Menu.Label>Order Actions</Menu.Label>

        //                     <Tooltip position="right" label="Submit the order">
        //                         <Menu.Item leftSection={<IconCheck size={18} />} onClick={() => setSubmitModalOpened(true)} disabled={data?.status !== 0 && data?.status !== 2 ? true : false}>
        //                             Submit
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Make order as in progress">
        //                         <Menu.Item leftSection={<IconProgress size={18} />} onClick={() => inProgress({ token: token, data: data })} disabled={data?.status !== 0 && data?.status !== 2 ? true : false}>
        //                             In Progress
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Cancel the order">
        //                         <Menu.Item leftSection={<IconX size={18} />} onClick={() => setCancelModalOpened(true)} disabled={data?.status !== 0 && data?.status !== 2 ? true : false}>
        //                             Cancel
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Menu.Divider />

        //                     <Menu.Label>Order Information</Menu.Label>

        //                     <Tooltip position="right" label="Opens product page in a new tab">
        //                         <Menu.Item component="a" leftSection={<IconExternalLink size={18} />} href={data?.hyperlink} target="_blank">
        //                             Product Page
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Opens tracking page in a new tab">
        //                         <Menu.Item component="a" leftSection={<IconTruck size={18} />} href={data?.tracking_url} target="_blank" disabled={data?.tracking_url !== "No tracking url" ? false : true}>
        //                             Tracking Page
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Download invoice for this order">
        //                         <Menu.Item component="a" leftSection={<IconReceipt size={18} />} href={invoiceUrl ?? ""} target="_blank" download disabled={data?.invoice_uploaded !== false ? false : true}>
        //                             Download Invoice
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Menu.Divider />

        //                     <Menu.Label>Communication</Menu.Label>

        //                     <Tooltip position="right" label="Send user an email">
        //                         <Menu.Item component="a" leftSection={<IconMail size={18} />} href={`mailto:${data?.email}`}>
        //                             Send Email
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Send user a teams message">
        //                         <Menu.Item component="a" leftSection={<IconBrandTeams size={18} />} href={`sip:${data?.email}`}>
        //                             Send Teams Message
        //                         </Menu.Item>
        //                     </Tooltip>

        //                     <Tooltip position="right" label="Send user a notification of order status">
        //                         <Menu.Item leftSection={<IconBell size={18} />} onClick={() => powerAutomateApi(data)} disabled={data?.status !== 1 && data?.status !== 3 ? true : false}>
        //                             Send Notification
        //                         </Menu.Item>
        //                     </Tooltip>
        //                 </Menu.Dropdown>
        //             </Menu>

        //             <SubmitModal token={token} data={data!} modalOpened={submitModalOpened} onModalClose={() => setSubmitModalOpened(false)} />
        //             <CancelModal token={token} data={data!} modalOpened={cancelModalOpened} onModalClose={() => setCancelModalOpened(false)} />
        //         </Group>
        //     }

        //     {isLoading ? <LoadingSkeletonSingle height={200} /> :
        //         <Stack orientation="row" spacing="80px">
        //             <Stack orientation="column">
        //                 <TableItemText label="Date" text={data?.submission_date} />
        //                 <TableItemText label="Department" text={data?.department} />
        //                 <TableItemText label="Name" text={data?.responder} />
        //                 <TableItemText label="Email" text={data?.email} />
        //             </Stack>
        //             <Stack orientation="column">
        //                 <TableItemPill label="Order Status" status={data?.status} />
        //                 <TableItemText label="Items" text={data?.items} />
        //                 <TableItemText label="Quantity" text={data?.quantity} />
        //                 <TableItemText label="Price Per Item" text={formatPrice(data?.price ?? 0)} />
        //             </Stack>
        //             <Stack orientation="column">
        //                 <TableItemText label="Ship To" text={data?.ship_to} />
        //                 <TableItemText label="Address" text={data?.shipping_address ? data.shipping_address : "None"} />
        //                 <TableItemText label="Notes" text={data?.notes ? data.notes : "None"} />
        //                 <TableItemText label="Variation" text={data?.variation ? data.variation : "None"} />
        //             </Stack>
        //         </Stack>
        //     }

        //     {isLoading ? <LoadingSkeletonSingle height={350} /> :
        //         <Stack orientation="column" margin="30px 0px 0px 0px">
        //             <TextEditor content={`${data?.private_notes}`} setText={setEditorText} />
        //         </Stack>
        //     }
        // </Container>

        <Grid>
            <Grid.Col span={3}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="24px" fw={500}>Employee Details</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <Stack>
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconCalendar />} text={data?.submission_date} />
                        }

                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconSitemap />} text={data?.department} />
                        }

                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconUser />} text={data?.responder} />
                        }

                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconMail />} text={data?.email} />
                        }
                    </Stack>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" mt="sm" withBorder>
                    <Text size="24px" fw={500}>Product Details</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <Stack>
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconClock />} text={getOrderStatusText(data?.status ?? 0)} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconBox />} text={data?.items} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconPackages />} text={data?.quantity} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconCurrencyDollar />} text={formatPrice(data?.price ?? 0)} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconArrowsShuffle />} text={data?.variation === "" ? "No variation" : data?.variation} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconNote />} text={data?.notes === "" ? "No notes provided" : data?.notes} />
                        }
                    </Stack>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" mt="sm" withBorder>
                    <Text size="24px" fw={500}>Shipping Details</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <Stack>
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconTruckDelivery />} text={data?.ship_to} />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconAddressBook />} text={data?.shipping_address === "" ? "No shipping address provided" : data?.shipping_address} />
                        }
                    </Stack>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" mt="sm" withBorder>
                    <Text size="24px" fw={500}>Private Notes</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <TextEditor content={`${data?.private_notes}`} setText={setEditorText} />

                    <Button
                        className="unify-button-filled"
                        leftSection={<IconDeviceFloppy size={22} />}
                        onClick={() => saveNotes({ token, orderId: data?.submission_id, notes: editorText })}
                        mt="md"
                    >
                        Save Notes
                    </Button>
                </Card>
            </Grid.Col>
            <Grid.Col span={9}>
                Invoice preview goes here
            </Grid.Col>
        </Grid>
    )
}

export default PurchasingOrderViewPage;