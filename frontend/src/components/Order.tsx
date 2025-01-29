import React from "react";
import { useParams } from "react-router";

export default function Order() {
    let { orderId } = useParams();

    return (
        <>
            <h1>Hello Order #{orderId}</h1>
        </>
    )
}