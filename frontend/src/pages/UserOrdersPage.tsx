import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ActionIcon, Box, Button, Container, Group, Text, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { LoadingSkeletonSingle } from "../components/LoadingSkeleton";
import { TableItemText, TableItemPill } from "../components/TableItems";
import { formatPrice } from "../utils/utilities";
import { backendAPI } from "../utils/api";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import Stack from "../components/Stack";
import { Dropzone, FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { useAccount } from "@azure/msal-react";
import axios from "axios";

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

function UserOrdersPage() {
    let { orderId } = useParams();
    const account = useAccount();
    const navigate = useNavigate();
    const token = localStorage.getItem(API_ACCESS_TOKEN) ?? "None";
    const [data, setData] = useState<IOrder>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);

    const uploadFile = () => {
        if (uploadedFile !== null) {
            backendAPI(token).get(`/files/upload?filename=PO${data?.submission_id}-final-invoice.pdf`)
                .then((response) => {
                    console.log(response.data.upload_url);

                    axios.put(response.data.upload_url, uploadedFile, {
                        headers: {
                            "x-ms-blob-type": "BlockBlob"
                        },
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round(
                                (progressEvent.loaded * 100) / (progressEvent.total || 1)
                            );
                            console.log(`Uploading: ${progress}%`);
                        }
                    })
                });

            backendAPI(token).patch(`/orders/${orderId}`, { "invoice_uploaded": true })
        } else {
            console.log("No file has been selected, please select a file first");
        }
    };

    useEffect(() => {
        setIsLoading(true);

        backendAPI(token).get(`/orders/user/?email=${account?.username}&id=${orderId}`)
            .then(response => {
                setData(response.data[0]);
                setIsLoading(false);
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
                <Box>
                    <Dropzone
                        onDrop={(files) => setUploadedFile(files[0])}
                        onReject={(files) => console.log('rejected files: ' + files)}
                        maxSize={5 * 1024 ** 2}
                        accept={PDF_MIME_TYPE}
                        my="md"
                    >
                        <Group>
                            <Dropzone.Accept>
                                <IconUpload size={52} />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX size={52} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconPhoto size={52} />
                            </Dropzone.Idle>
                            <Box>
                                <Text size="xl" inline>
                                    Drag the purchase invoice here or click to select files
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text>
                            </Box>
                        </Group>
                    </Dropzone>

                    <Group my="md">
                        <Text>{uploadedFile?.name ?? "No file selected"}</Text>
                        <Button leftSection={<IconUpload size={20} />} onClick={uploadFile}>Upload File</Button>
                    </Group>
                </Box>
            }
        </Container>
    )
}

export default UserOrdersPage;