import { CircularProgress, SxProps } from "@mui/material";
import {
    useSort,
    usePagination,
    useAppDispatch,
    useAppSelector,
} from "@/hooks";
import React, { createContext } from "react";
import { IAdvertisment, IOrder } from "@/types";
import { ordersSliceActions, ordersSliceSelectors } from "@/store/orders";
import { ContentControls } from "@/components";
import { OrderItems } from "./orders-items";
import { OrdersStatusFilter } from "./orders-status-filter";
import { OrdersItemFilter } from "./orders-item-filter";
import { useLocation } from "react-router-dom";

const ordersSortConfig = {
    total: "сумма заказа",
    id: "идентификатор",
    finishedAt: "дата выполнения",
    createdAt: "дата создания",
    count: "количество объявлений",
};

const styles: Record<string, SxProps> = {
    pagination: {
        ml: "auto",
    },
};

export const OrdersContext = createContext<IOrder["id"][]>([]);

export const OrdersPage = () => {
    const location = useLocation();
    const itemFilter = location?.state?.itemFilter ?? "";
    const orderStatusFilter = location?.state?.orderStatus ?? "";

    const { status } = useAppSelector(ordersSliceSelectors.selectStatus);

    const [orderStatus, setOrderStatus] = React.useState(orderStatusFilter);
    const dispatch = useAppDispatch();
    const { Component: SortInput, sorting } = useSort(ordersSortConfig);
    const [itemName, setItemName] = React.useState(itemFilter);
    const ordersIds = useAppSelector(
        ordersSliceSelectors.selectOrdersSorted(sorting, [
            [
                "status",
                (item: IOrder["status"]) =>
                    orderStatus === "" || item == orderStatus,
            ],
            [
                "items",
                (item: IOrder["items"]) =>
                    (item as IAdvertisment[]).some(
                        (v) =>
                            v.name
                                .toLowerCase()
                                .includes(itemName.toLowerCase()) ||
                            v.id == itemName,
                    ),
            ],
        ]),
    );

    const {
        Component: Pagination,
        pageData,
        resetPage,
    } = usePagination<IOrder["id"]>(ordersIds);

    React.useEffect(() => {
        dispatch(ordersSliceActions.getOrders());
    }, [dispatch]);

    if (status == null || status == "pending") return <CircularProgress />;

    if (status === "rejected") return <h1>Не удалось получить заказы</h1>;

    return (
        <OrdersContext.Provider value={pageData}>
            <ContentControls>
                <SortInput />
                <OrdersStatusFilter
                    orderStatus={orderStatus}
                    setOrderStatus={setOrderStatus}
                    resetPage={resetPage}
                />
                <OrdersItemFilter
                    itemName={itemName}
                    resetPage={resetPage}
                    setItemName={setItemName}
                />
                <Pagination sx={styles.pagination} />
            </ContentControls>
            <OrderItems />
        </OrdersContext.Provider>
    );
};
