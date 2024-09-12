import { TFilterConfig } from "@/types";

export const makeSelectSorted =
    (selector: any) =>
    (field: string, sortConfig: TFilterConfig = []) =>
    (state: any) =>
        selector(state, field, sortConfig);
