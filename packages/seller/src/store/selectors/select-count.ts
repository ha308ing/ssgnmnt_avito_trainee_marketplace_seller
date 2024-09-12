import { createSelector } from "@reduxjs/toolkit";

export const selectItemsCount = createSelector(
    [(state) => state.ids],
    (ids) => ids.length,
);
