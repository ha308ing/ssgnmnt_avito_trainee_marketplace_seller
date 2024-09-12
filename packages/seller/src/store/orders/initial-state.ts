import { IOrder } from "@/types";

export interface IOrdersState {
    ids: IOrder["id"][];
    items: Record<IOrder["id"], IOrder>;
    status: null | "rejected" | "pending" | "fulfilled";
    statusMessage: string;
}

export const initialState: IOrdersState = {
    ids: [],
    items: {},
    status: null,
    statusMessage: "",
};
