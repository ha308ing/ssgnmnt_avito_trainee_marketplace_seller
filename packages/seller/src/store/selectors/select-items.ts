export const selectItems = <T extends { items: any }>(state: T) =>
    state.items as T["items"];
