import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ActionIcon, Box, Button, Card, Container, Divider, Grid, Group, Input, Menu, MenuDivider, Modal, Stack, Table, Text, Textarea, Title, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAddressBook, IconArrowLeft, IconArrowsShuffle, IconBell, IconBox, IconBrandTeams, IconCalendar, IconCheck, IconClick, IconClock, IconCurrencyDollar, IconDeviceFloppy, IconDots, IconExternalLink, IconEye, IconMail, IconNote, IconNumber, IconPackages, IconProgress, IconReceipt, IconSitemap, IconTex, IconTruck, IconTruckDelivery, IconUser, IconX } from "@tabler/icons-react";
import { LoadingSkeletonSingle } from "../components/LoadingSkeleton";
import { TableItemText, TableItemPill } from "../components/TableItems";
import { formatPrice } from "../utils/utilities";
import { backendAPI, powerAutomateApi } from "../utils/api";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import TextEditor from "../components/RichTextEditor";
import IconText from "../components/IconText";
import { getOrderStatusText } from "../constants/enums";
import PDFViewer from "../components/PDFViewer";
import IOrder from "../interfaces/IOrder";
import OrderTiles from "../components/OrderTiles";

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
                backendAPI(token).get(`/files/download?filename=PO10-final-invoice.pdf`)
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
        <Grid justify="center">
            <Grid.Col span={4}>
                {isLoading ? <LoadingSkeletonSingle height={28} /> :
                    <Group justify="flex-start" mb="30px">
                        <Tooltip position="bottom" label="Go back">
                            <ActionIcon
                                style={{
                                    marginRight: "auto"
                                }}
                                className="unify-button-subtle"
                                onClick={() => navigate(-1)}>
                                <IconArrowLeft size={22} />
                            </ActionIcon>
                        </Tooltip>

                        <Menu
                            shadow="md"
                            width={200}>
                            <Menu.Target>
                                <ActionIcon className="unify-button-subtle">
                                    <IconDots />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Purchase Order</Menu.Label>

                                <Tooltip position="right" label="Opens product page in a new tab">
                                    <Menu.Item component="a" leftSection={<IconExternalLink size={18} />} href={data?.hyperlink} target="_blank">
                                        Product Page
                                    </Menu.Item>
                                </Tooltip>

                                <MenuDivider />

                                <Menu.Label>Communication</Menu.Label>

                                <Tooltip position="right" label="Send user an email">
                                    <Menu.Item component="a" leftSection={<IconMail size={18} />} href={`mailto:${data?.email}`}>
                                        Send Email
                                    </Menu.Item>
                                </Tooltip>

                                <Tooltip position="right" label="Send user a teams message">
                                    <Menu.Item component="a" leftSection={<IconBrandTeams size={18} />} href={`sip:${data?.email}`}>
                                        Send Teams Message
                                    </Menu.Item>
                                </Tooltip>

                                <MenuDivider />

                                <Menu.Label>Invoice</Menu.Label>

                                <Tooltip position="right" label="Download invoice for this order">
                                    <Menu.Item component="a" leftSection={<IconReceipt size={18} />} href={invoiceUrl ?? ""} target="_blank" download disabled={data?.invoice_uploaded !== false ? false : true}>
                                        Download Invoice
                                    </Menu.Item>
                                </Tooltip>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                }
                
                <OrderTiles data={data ?? null} isLoading={isLoading} />

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
            <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <PDFViewer url={invoiceUrl ?? ""} />
                </Card>
            </Grid.Col>
        </Grid>
    )
}

export default PurchasingOrderViewPage;