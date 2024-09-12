import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { advertisementsSliceSelectors } from "../store/advertisements";
import { useAppSelector } from "./useAppSelector";

export const useTitle = () => {
    const advertisementMatch = useMatch("/advertisements/:id");
    const advertisements = useAppSelector(
        advertisementsSliceSelectors.selectItems,
    );
    const { status } = useAppSelector(
        advertisementsSliceSelectors.selectStatus,
    );

    let title = "";

    const advertisementId = advertisementMatch?.params.id;
    if (
        status == "fulfilled" &&
        advertisementMatch != null &&
        advertisementId != null
    ) {
        const advertisement = advertisements[advertisementId];
        if (advertisement != null && advertisement.name != null) {
            title = `Объявление | ${advertisement.name}`;
        }
    }

    const { pathname } = useLocation();

    let htmlTitle = "Маркетплейс";
    switch (pathname) {
        case "/":
            title = "Личный кабинет";
            break;
        case "/advertisements":
            title = "Объявления";
            break;
        case "/orders":
            title = "Заказы";
            break;
    }

    htmlTitle = title ? `${htmlTitle} | ${title}` : htmlTitle;

    useEffect(() => {
        document.title = htmlTitle;
    }, [htmlTitle]);

    return title;
};
