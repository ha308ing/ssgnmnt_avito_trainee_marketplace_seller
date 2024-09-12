import { Card, CardContent, CardHeader } from "@mui/material";
import { IOrder } from "../../types";
import React, { createContext } from "react";
import { OrderMenu } from "./order-menu";
import { OrderTitle } from "./order-title";
import { OrderItems } from "./order-items";
import { OrderStatusPrice } from "./order-status-price";

interface IOrderProps {
    order: IOrder;
}

export const OrderContext = createContext<IOrder>({
    createdAt: "",
    deliveryWay: "",
    id: "",
    items: [],
    status: 0,
    total: 0,
    finishedAt: "",
});

export const Order: React.FC<IOrderProps> = ({ order }) => {
    return (
        <OrderContext.Provider value={order}>
            <Card>
                <CardHeader title={<OrderTitle />} action={<OrderMenu />} />
                <CardContent>
                    <OrderStatusPrice />
                    <OrderItems />
                </CardContent>
            </Card>
        </OrderContext.Provider>
    );
};
