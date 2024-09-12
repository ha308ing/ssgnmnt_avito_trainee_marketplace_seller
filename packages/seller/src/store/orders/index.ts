import { createSlice } from "@reduxjs/toolkit";
import { getOrdersThunk } from "./thunks";
import { initialState } from "./initial-state";
import * as commonSelectors from "@/store/selectors";
import * as selectors from "./selectors";
import { makeSelectSorted } from "@/store/selectors/make-select-sorted";

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    selectors: {
        ...commonSelectors,
        ...selectors,
        selectItems: commonSelectors.selectItems,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.statusMessage = action?.error?.message ?? "";
            })
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                const { ids, items } = action.payload;
                state.ids = ids;
                state.items = items;
                state.status = "fulfilled";
            });
    },
});

export const ordersSliceSelectors = {
    ...ordersSlice.selectors,
    selectOrdersSorted: makeSelectSorted(ordersSlice.selectors.selectSorted),
};
export const ordersSliceActions = {
    ...ordersSlice.actions,
    getOrders: getOrdersThunk,
};
