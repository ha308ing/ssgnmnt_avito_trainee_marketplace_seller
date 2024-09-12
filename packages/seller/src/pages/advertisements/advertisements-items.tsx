import React, { useContext } from "react";
import {
    advertisementsSliceActions,
    advertisementsSliceSelectors,
} from "@/store/advertisements";
import { CircularProgress } from "@mui/material";
import { Advertisement, ContentGrid } from "@/components";
import { AdvertisementsContext } from ".";
import { useAppDispatch, useAppSelector } from "@/hooks";

export const AdvertisementsItems = () => {
    const { status } = useAppSelector(
        advertisementsSliceSelectors.selectStatus,
    );
    const dispatch = useAppDispatch();
    const advertisements = useAppSelector(
        advertisementsSliceSelectors.selectItems,
    );
    const count = useAppSelector(advertisementsSliceSelectors.selectItemsCount);
    const pageData = useContext(AdvertisementsContext);

    React.useEffect(() => {
        dispatch(advertisementsSliceActions.getAdvertisements());
    }, [dispatch]);

    if (status == null || status === "pending" || pageData == null)
        return <CircularProgress />;

    if (count > 0 && pageData.length == 0)
        return <h1>Объявлений не найдено</h1>;

    return (
        <ContentGrid>
            {pageData.map((id) => (
                <Advertisement key={id} advertisement={advertisements[id]} />
            ))}
        </ContentGrid>
    );
};
