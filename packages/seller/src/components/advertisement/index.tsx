import { Card, CardContent, CardMedia, styled } from "@mui/material";
import React, { createContext, FC } from "react";
import { AdvertisementHeader } from "./advertisement-header";
import { AdvertisementDescription } from "./advertisement-description";
import { AdvertisementControls } from "./advertisement-controls";
import { IAdvertisment } from "../../types";

const StyledCard = styled(Card)(() => ({
    minWidth: 275,
    position: "relative",
}));

interface IAdvertisementProps {
    advertisement: IAdvertisment;
}

export const AdvertisementContext = createContext<IAdvertisment>({
    createdAt: "",
    id: "0",
    name: "",
    likes: 0,
    price: 0,
    views: 0,
    description: "",
    imageUrl: "",
});

export const Advertisement: FC<IAdvertisementProps> = React.memo(
    ({ advertisement }) => {
        const { name = "название объявления", imageUrl } = advertisement;
        const image =
            imageUrl == ""
                ? `https://placehold.co/600x400?text=${name.replaceAll(" ", "+")}`
                : imageUrl;

        return (
            <AdvertisementContext.Provider value={advertisement}>
                <StyledCard>
                    <CardMedia
                        component="img"
                        height={300}
                        image={image}
                        alt={name}
                        title={name}
                    />
                    <CardContent>
                        <AdvertisementHeader />
                        <AdvertisementDescription />
                    </CardContent>
                    <AdvertisementControls />
                </StyledCard>
            </AdvertisementContext.Provider>
        );
    },
);
