import { createSlice } from "@reduxjs/toolkit";
import { IAdvertisementsState, initialState } from "./initial-state";
import { getAdvertisements } from "./thunks";
import * as commonSelectors from "@/store/selectors";
import * as selectors from "./selectors";
import { makeSelectSorted } from "@/store/selectors/make-select-sorted";

export const advertisementsSlice = createSlice({
    name: "advertisements",
    initialState,
    selectors: {
        ...commonSelectors,
        ...selectors,
        selectItems: commonSelectors.selectItems<IAdvertisementsState>,
        selectIds: commonSelectors.selectIds<IAdvertisementsState>,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdvertisements.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAdvertisements.fulfilled, (state, action) => {
                state.status = "fulfilled";
                const { ids, advertisements } = action.payload;
                state.items = advertisements;
                state.ids = ids;
            })
            .addCase(getAdvertisements.rejected, (state, action) => {
                state.status = "rejected";
                state.statusMessage = action.error.message ?? "";
            });
    },
});

export const advertisementsSliceActions = {
    getAdvertisements,
    ...advertisementsSlice.actions,
};

export const selectAdvertisementsSorted = makeSelectSorted(
    advertisementsSlice.selectors.selectSorted,
);

interface ISelectorState {
    [advertisementsSlice.reducerPath]: IAdvertisementsState;
}

const selectTopLikes = (state: ISelectorState) =>
    advertisementsSlice.selectors.selectTop(state, "likes");
const selectTopViews = (state: ISelectorState) =>
    advertisementsSlice.selectors.selectTop(state, "views");

export const advertisementsSliceSelectors = {
    ...advertisementsSlice.selectors,
    selectAdvertisementsSorted,
    selectTopLikes,
    selectTopViews,
};
