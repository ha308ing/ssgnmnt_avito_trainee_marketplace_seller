import { Clear } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    SxProps,
} from "@mui/material";
import React, { ChangeEvent, FC } from "react";

const styles: SxProps = {
    minWidth: "37ch",
};

interface IEndAdornmentProps {
    itemName: string;
    clearItemName: () => void;
}

const EndAdornment: FC<IEndAdornmentProps> = ({ itemName, clearItemName }) => {
    if (itemName.length == 0) return null;

    return (
        <InputAdornment position="end" onClick={clearItemName}>
            <IconButton>
                <Clear />
            </IconButton>
        </InputAdornment>
    );
};

interface IOrdersItemFilterProps {
    itemName: string;
    setItemName: (value: string) => void;
    resetPage: () => void;
}

export const OrdersItemFilter: FC<IOrdersItemFilterProps> = ({
    itemName,
    setItemName,
    resetPage,
}) => {
    const clearItemName = React.useCallback(() => {
        setItemName("");
    }, [setItemName]);

    const handleInputChange = React.useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setItemName(event.target.value);
            resetPage();
        },
        [setItemName, resetPage],
    );

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="filter-item">
                Фильтр по товару (название или id)
            </InputLabel>
            <OutlinedInput
                sx={styles}
                id="filter-item"
                endAdornment={
                    <EndAdornment
                        itemName={itemName}
                        clearItemName={clearItemName}
                    />
                }
                label="Фильтр по товару (название или id)"
                value={itemName}
                onChange={handleInputChange}
            />
        </FormControl>
    );
};
