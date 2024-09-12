import { createSelector } from "@reduxjs/toolkit";
import { TFilterConfig } from "@/types";

const selectSortField = (_: any, field: string, _filterConfig: TFilterConfig) =>
    field;
const selectFilterConfig = (
    _: any,
    _field: string,
    filterConfig: TFilterConfig,
) => filterConfig;

export const selectSorted = createSelector(
    [
        (state, _field, _filterConfig: TFilterConfig) => state.items,
        selectSortField,
        selectFilterConfig,
    ],
    (items, field, filterConfig) => {
        let ids = Object.keys(items);

        if (filterConfig.length > 0) {
            const idsFiltered = ids.reduce((acc: string[], value) => {
                const item = items[value];

                const isMatch = filterConfig.reduce(
                    (match, [filterField, filterFunction]) => {
                        match = match && filterFunction(item[filterField]);

                        return match;
                    },
                    true,
                );

                if (isMatch) {
                    acc = [...acc, value];
                }

                return acc;
            }, []);

            ids = idsFiltered;
        }

        const isDescending = field.startsWith("-");
        if (isDescending) field = field.substring(1);

        let compare = 0;

        const isDateField = field === "createdAt" || field === "finishedAt";
        const isStringField = field === "name";

        const entries = ids.sort((a, b) => {
            let valueA = items[a][field];
            let valueB = items[b][field];

            if (isStringField) {
                compare = valueA.localeCompare(valueB);
            } else if (isDateField) {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
                compare = valueA - valueB;
            } else {
                valueA = +valueA;
                valueB = +valueB;
                compare = valueA - valueB;
            }

            return isDescending ? -1 * compare : compare;
        });

        return entries;
    },
);
