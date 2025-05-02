import React, { useState } from "react"
import IconText from "./IconText"
import { Card, Divider, Group, Stack, Text } from "@mantine/core"
import { LoadingSkeletonSingle } from "./LoadingSkeleton"
import { IconAddressBook, IconArrowsShuffle, IconBox, IconCalendar, IconClock, IconCurrencyDollar, IconHash, IconLink, IconMail, IconNote, IconPackages, IconSitemap, IconTruckDelivery, IconUser } from "@tabler/icons-react"
import { formatPrice } from "../utils/utilities"
import { getOrderStatusText } from "../constants/enums"
import IOrder from "../interfaces/IOrder"

type Props = {
    data: IOrder | null;
    isLoading: boolean;
}

const OrderTiles = ({ data, isLoading }: Props) => {
    return (
        <>
            <Group grow align="stretch">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="24px" fw={500}>Employee Details</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <Stack>
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconCalendar />} text={data?.submission_date} tooltip="Submission Date" />
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

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="24px" fw={500}>Product Details</Text>

                    <Card.Section my="md">
                        <Divider />
                    </Card.Section>

                    <Stack>
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconBox />} text={data?.items} tooltip="Product" />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconArrowsShuffle />} text={data?.variation === "" ? "No variation" : data?.variation} tooltip="Variation" />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconPackages />} text={data?.quantity} tooltip="Quantity" />
                        }
                        {isLoading ? <LoadingSkeletonSingle height={25} /> :
                            <IconText icon={<IconCurrencyDollar />} text={formatPrice(data?.price ?? 0)} tooltip="Price" />
                        }
                    </Stack>
                </Card>
            </Group>

            <Card shadow="sm" padding="lg" radius="md" mt="sm" withBorder>
                <Text size="24px" fw={500}>Order Details</Text>

                <Card.Section my="md">
                    <Divider />
                </Card.Section>

                <Stack>
                    {isLoading ? <LoadingSkeletonSingle height={25} /> :
                        <IconText icon={<IconHash />} text={data?.submission_id} tooltip="Order Number" />
                    }
                    {isLoading ? <LoadingSkeletonSingle height={25} /> :
                        <IconText icon={<IconClock />} text={getOrderStatusText(data?.status ?? 0)} tooltip="Status" />
                    }
                    {isLoading ? <LoadingSkeletonSingle height={25} /> :
                        <IconText icon={<IconLink />} text={data?.hyperlink} tooltip="Product Page" />
                    }
                    {isLoading ? <LoadingSkeletonSingle height={25} /> :
                        <IconText icon={<IconTruckDelivery />} text={data?.tracking_url === "" ? "No tracking URL provided" : data?.tracking_url} tooltip="Tracking URL" />
                    }
                    {isLoading ? <LoadingSkeletonSingle height={25} /> :
                        <IconText icon={<IconNote />} text={data?.notes === "" ? "No notes provided" : data?.notes} tooltip="Notes" />
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
        </>
    )
}

export default OrderTiles;