import { IAdvertisment } from "@/types";

export interface IAdvertisementsState {
    items: Record<IAdvertisment["id"], IAdvertisment>;
    ids: IAdvertisment["id"][];
    status: null | string;
    statusMessage: string;
}

export const initialState: IAdvertisementsState = {
    items: {},
    ids: [],
    status: null,
    statusMessage: "",
};
