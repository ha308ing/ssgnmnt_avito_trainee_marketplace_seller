import { IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useAdvertisementModal } from "../../hooks/useAdvertisementModal";

export const AddAdvertisementButton = () => {
    const {
        Component: AdvertisementModal,
        handleClickOpen: openAdvertisementModal,
    } = useAdvertisementModal();

    return (
        <>
            <Tooltip title="Добавить объявление">
                <IconButton onClick={openAdvertisementModal} sx={{ p: 0 }}>
                    <AddCircleOutlineRoundedIcon
                        color="inherit"
                        fontSize="large"
                    />
                </IconButton>
            </Tooltip>
            <AdvertisementModal />
        </>
    );
};
