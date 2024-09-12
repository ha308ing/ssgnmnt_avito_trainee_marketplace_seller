import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { advertisementsSliceActions } from "../store/advertisements";
import { controller } from "../utils/api/controller";
import { IAdvertisment, TPostAdvertisement } from "../types";
import { useAppDispatch } from "./useAppDispatch";
import { ModalTextInput } from "../components";

export const useAdvertisementModal = (
    advertisement: IAdvertisment | null = null,
) => {
    const advertisementId = advertisement ? advertisement.id : null;
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = React.useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
                formData.entries(),
            ) as unknown as TPostAdvertisement;
            if (advertisementId == null) {
                await controller.postAdvertisement(formJson);
            } else {
                await controller.updateAdvertisement(advertisementId, {
                    ...advertisement,
                    ...formJson,
                });
            }
            dispatch(advertisementsSliceActions.getAdvertisements());

            handleClose();
        },
        [advertisement, advertisementId, dispatch],
    );

    const Component = () => (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>
                {advertisement ? advertisement.name : "Новое объявление"}
            </DialogTitle>
            <DialogContent>
                <ModalTextInput
                    autoFocus
                    id="name"
                    name="name"
                    label="Название"
                    required
                    defaultValue={advertisement?.name ?? ""}
                />
                <ModalTextInput
                    id="description"
                    name="description"
                    label="Описание"
                    multiline
                    defaultValue={advertisement?.description ?? ""}
                />
                <ModalTextInput
                    id="imageUrl"
                    name="imageUrl"
                    label="Ссылка на изображение"
                    defaultValue={advertisement?.imageUrl ?? ""}
                />
                <ModalTextInput
                    required
                    id="price"
                    name="price"
                    label="Цена"
                    type="number"
                    defaultValue={advertisement?.price ?? ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button type="submit">
                    {advertisement ? "Обновить" : "Создать"}
                </Button>
            </DialogActions>
        </Dialog>
    );

    return { handleClose, handleClickOpen, Component };
};
