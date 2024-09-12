import { Button, Stack, SxProps } from "@mui/material";
import { FC, useContext } from "react";
import { useAdvertisementModal } from "../../hooks/useAdvertisementModal";
import { AdvertisementContext } from ".";
import { IAdvertisment } from "../../types";
import { NavLink } from "react-router-dom";

const styles: Record<string, SxProps> = {
    container: {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        alignItems: "end",
        gap: 1,
    },
};

interface IAdvertisementControlsProps {
    context?: React.Context<IAdvertisment>;
}

export const AdvertisementControls: FC<IAdvertisementControlsProps> = ({
    context = AdvertisementContext,
}) => {
    const advertisement = useContext(context);
    const { name } = advertisement;
    const { Component: AdvertisementModal, handleClickOpen } =
        useAdvertisementModal(advertisement);

    return (
        <>
            <Stack sx={styles.container}>
                <Button variant="contained" onClick={handleClickOpen}>
                    Редактировать
                </Button>
                <Button
                    variant="contained"
                    component={NavLink}
                    to="/orders"
                    state={{ itemFilter: name }}
                >
                    Заказы
                </Button>
            </Stack>
            <AdvertisementModal />
        </>
    );
};
