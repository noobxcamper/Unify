import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ActionIcon, Box, Container, Group, Menu, MenuDivider, Modal, Tooltip, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconBell, IconBrandTeams, IconDeviceFloppy, IconDots, IconEye, IconMail, IconReceipt } from "@tabler/icons-react";
import { LoadingSkeletonSingle } from "../components/LoadingSkeleton";
import { TableItemText, TableItemPill } from "../components/TableItems";
import { formatPrice } from "../utils/utilities";
import { backendAPI, powerAutomateApi } from "../utils/api";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import Stack from "../components/Stack";
import TextEditor from "../components/RichTextEditor";
import { useDisclosure } from "@mantine/hooks";
import PDFViewer from "../components/PDFViewer";

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

function FinanceOrderViewPage() {
    let { orderId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem(API_ACCESS_TOKEN) ?? "None";
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<IOrder>();
    const [editorText, setEditorText] = useState<string>();
    const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
    const [previewOpened, {open, close}] = useDisclosure(false);

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
        <Container>
            {/* Top row */}
            {isLoading ? <LoadingSkeletonSingle height={50} /> :
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

                    <Tooltip position="bottom" label="Save your private notes">
                        <ActionIcon
                            className="unify-button-subtle"
                            onClick={() => saveNotes({ token, orderId: data?.submission_id, notes: editorText })}>
                            <IconDeviceFloppy size={22} />
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

                            <Tooltip position="right" label="Preview the invoice for this order">
                                <Menu.Item leftSection={<IconEye size={18} />} onClick={open} disabled={data?.invoice_uploaded !== false ? false : true}>
                                    Preview Invoice
                                </Menu.Item>
                            </Tooltip>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            }

            {isLoading ? <LoadingSkeletonSingle height={200} /> :
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

            {isLoading ? <LoadingSkeletonSingle height={350} /> :
                <Box my="30px">
                    <TextEditor content={`${data?.private_notes}`} setText={setEditorText} />
                </Box>
            }

            <Modal opened={previewOpened} onClose={close} title="Invoice Preview" size={"auto"} >
                <PDFViewer url={invoiceUrl} />
            </Modal>
        </Container>
    )
}

export default FinanceOrderViewPage;