import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { advertisementsSlice } from "./advertisements";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: combineSlices(advertisementsSlice, ordersSlice),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
