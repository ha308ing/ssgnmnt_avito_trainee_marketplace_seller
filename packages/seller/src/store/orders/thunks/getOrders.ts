import { createAsyncThunk } from "@reduxjs/toolkit";
import { controller } from "@/utils/api/controller";
import { IOrder } from "@/types";

interface IOrdersFormatted {
    ids: IOrder["id"][];
    items: Record<IOrder["id"], IOrder>;
}

export const getOrdersThunk = createAsyncThunk("orders/get", async () => {
    const { data } = await controller.getOrders();

    if (data == null) throw Error("не удалось получить заказы");

    const { ids, items } = data.reduce(
        (acc: IOrdersFormatted, order) => {
            const id = order.id;
            acc.ids.push(id);
            acc.items[id] = order;

            return acc;
        },
        { ids: [], items: {} },
    );

    return { ids, items };
});
