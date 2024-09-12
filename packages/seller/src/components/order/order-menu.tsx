import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { OrderContext } from ".";
import { controller } from "../../utils/api/controller";
import { ordersSliceActions } from "../../store/orders";
import { useAppDispatch } from "../../hooks";
import { IOrder } from "../../types";

export const OrderMenu = () => {
    const order = useContext(OrderContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeOrder = async (order: IOrder) => {
        await controller.closeOrder(order);
        dispatch(ordersSliceActions.getOrders());
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="order actions"
                aria-controls="menu-order"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="menu-order"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        closeOrder(order);
                    }}
                >
                    Завершить заказ
                </MenuItem>
            </Menu>
        </div>
    );
};
