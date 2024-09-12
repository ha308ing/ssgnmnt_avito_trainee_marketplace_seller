import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
} from "@mui/material";
import { IOrder, OrderStatus } from "@/types";
import { translateOrderStatus } from "@/utils/translateOrderStatus";
import { FC } from "react";

const styles: SxProps = {
    minWidth: "20ch",
};

interface IOrdersStatusFilterProps {
    orderStatus: IOrder["status"];
    setOrderStatus: (value: IOrder["status"]) => void;
    resetPage: () => void;
}

export const OrdersStatusFilter: FC<IOrdersStatusFilterProps> = ({
    orderStatus,
    setOrderStatus,
    resetPage,
}) => {
    const handleChange = (event: SelectChangeEvent<IOrder["status"]>) => {
        setOrderStatus(event.target.value as IOrder["status"]);
        resetPage();
    };

    return (
        <FormControl variant="outlined" sx={styles}>
            <InputLabel id="order-status-filter-label">
                Статус заказа
            </InputLabel>
            <Select
                labelId="order-status-filter-label"
                id="order-status-filter"
                value={orderStatus}
                label="Статус заказа"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Убрать фильтр</em>
                </MenuItem>
                ,
                {Object.values(OrderStatus).map((status) => (
                    <MenuItem value={status} key={status}>
                        {translateOrderStatus(status)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
