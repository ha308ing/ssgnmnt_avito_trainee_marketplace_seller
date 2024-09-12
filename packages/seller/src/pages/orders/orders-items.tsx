import { CircularProgress } from "@mui/material";
import { ordersSliceSelectors } from "@/store/orders";
import { useContext } from "react";
import { OrdersContext } from ".";
import { ContentGrid, Order } from "@/components";
import { useAppSelector } from "@/hooks";

export const OrderItems = () => {
    const { status } = useAppSelector(ordersSliceSelectors.selectStatus);
    const pageData = useContext(OrdersContext);
    const orders = useAppSelector(ordersSliceSelectors.selectItems);

    if (status == null) return <CircularProgress />;

    if (pageData.length < 1) return <h1>Заказов не найдено</h1>;

    return (
        <ContentGrid>
            {pageData.map((id) => (
                <Order key={id} order={orders[id]} />
            ))}
        </ContentGrid>
    );
};
