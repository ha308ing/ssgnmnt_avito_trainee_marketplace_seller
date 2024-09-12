import { createSelector } from "@reduxjs/toolkit";

const selectStatusValue = <
    // T extends { status: "rejected" | "pending" | "fulfilled" | null },
    T extends { status: string | null },
>(
    state: T,
) => state.status;

const selectStatusMessage = <T extends { statusMessage: string }>(state: T) =>
    state.statusMessage;

export const selectStatus = createSelector(
    [selectStatusValue, selectStatusMessage],
    (status, statusMessage) => ({ status, statusMessage }),
);
