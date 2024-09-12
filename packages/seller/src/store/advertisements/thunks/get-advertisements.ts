import { createAsyncThunk } from "@reduxjs/toolkit";
import { controller } from "@/utils/api/controller";
import { IAdvertisment } from "@/types";

interface IFormattedAdvertisements {
    ids: IAdvertisment["id"][];
    advertisements: Record<IAdvertisment["id"], IAdvertisment>;
}

export const getAdvertisements = createAsyncThunk(
    "advertisements/get",
    async () => {
        const { data } = await controller.getAdvertisements();

        if (data == null) throw Error("не удалось получить объявления");

        const formattedData = data.reduce(
            (acc: IFormattedAdvertisements, value: IAdvertisment) => {
                acc.ids = [...acc.ids, value.id];
                acc.advertisements[value.id] = value;

                return acc;
            },
            { ids: [], advertisements: {} },
        );

        return formattedData;
    },
);
