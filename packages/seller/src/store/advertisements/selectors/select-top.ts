import { createSelector } from "@reduxjs/toolkit";
import { selectIds, selectItems } from "@/store/selectors";
import { IAdvertisment } from "@/types";

export const selectTop = createSelector(
    [selectIds, selectItems, (_, property: keyof IAdvertisment) => property],
    (ids, items, property) => {
        const sortedIds = [...ids].sort((a, b) =>
            (items[a] as IAdvertisment)[property]! >
            (items[b] as IAdvertisment)[property]!
                ? -1
                : (items[a] as IAdvertisment)[property]! <
                    (items[b] as IAdvertisment)[property]!
                  ? 1
                  : 0,
        );

        return sortedIds[0];
    },
);
