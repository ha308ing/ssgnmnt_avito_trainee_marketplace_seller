import { createSelector } from "@reduxjs/toolkit";
import { selectItems } from "@/store/selectors";
import { IOrder } from "@/types";

type TOrdersByStatusCount = Record<string, number>;

export const selectMetrics = createSelector(
    [selectItems],
    (items: Record<IOrder["id"], IOrder>) => {
        const orderStatusStrings = [
            "Заказов создано",
            "Заказов оплачено",
            "Заказов в доставке",
            "Заказов в пункте выдачи",
            "Заказов получено",
            "Заказов в архиве",
            "Заказов к возврату",
        ];

        const ordersByStatus = orderStatusStrings.reduce(
            (acc: TOrdersByStatusCount, value: string, index) => {
                acc[value] = Object.values(items).filter(
                    (order) => order.status === index,
                ).length;

                return acc;
            },
            {},
        );

        return ordersByStatus;
    },
);
