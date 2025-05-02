import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "@mantine/core";
import { backendAPI } from "../utils/api";
import { API_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import { useAccount } from "@azure/msal-react";
import IOrder from "../interfaces/IOrder";
import OrderTiles from "../components/OrderTiles";

function UserOrdersPage() {
    let { orderId } = useParams();
    const account = useAccount();
    const token = localStorage.getItem(API_ACCESS_TOKEN) ?? "None";
    const [data, setData] = useState<IOrder>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
            <OrderTiles data={data ?? null} isLoading={isLoading} />
        </Container>
    )
}

export default UserOrdersPage;