import { Search } from "@mui/icons-material";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    SxProps,
} from "@mui/material";
import { usePagination, useSort, useAppSelector } from "@/hooks";
import * as React from "react";
import { advertisementsSliceSelectors } from "@/store/advertisements";
import { AdvertisementsItems } from "./advertisements-items";
import { ContentControls } from "@/components";
import { IAdvertisment } from "@/types";

const advertisementsSortConfig = {
    likes: "лайки",
    views: "просмотры",
    price: "цена",
    createdAt: "дата",
    name: "названиие",
};

const styles: Record<string, SxProps> = {
    pagination: {
        ml: "auto",
    },
};

export const AdvertisementsContext = React.createContext<
    null | IAdvertisment["id"][]
>(null);

export const AdvertisementsPage = () => {
    const { sorting, Component: SelectSort } = useSort(
        advertisementsSortConfig,
    );
    const [search, setSearch] = React.useState("");
    const searchName = React.useCallback(
        (item: IAdvertisment["name"]) => {
            return item.toLowerCase().includes(search.toLowerCase());
        },
        [search],
    );
    const data = useAppSelector(
        advertisementsSliceSelectors.selectAdvertisementsSorted(sorting, [
            ["name", searchName],
        ]),
    );
    const {
        Component: Pagination,
        page,
        setPage,
        pageData,
    } = usePagination<IAdvertisment["id"]>(data);

    return (
        <AdvertisementsContext.Provider value={pageData}>
            <ContentControls>
                <SelectSort />

                <FormControl variant="outlined">
                    <InputLabel htmlFor="advertisements-search">
                        Поиск объявлений
                    </InputLabel>
                    <OutlinedInput
                        id="advertisements-search"
                        endAdornment={
                            <InputAdornment component={Search} position="end" />
                        }
                        label="Поиск объявлений"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            if (page != 0) setPage(0);
                        }}
                    />
                </FormControl>

                <Pagination sx={styles.pagination} />
            </ContentControls>
            <AdvertisementsItems />
        </AdvertisementsContext.Provider>
    );
};
