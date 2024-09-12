import { useContext } from "react";
import { OrderContext } from ".";
import { Box, SxProps } from "@mui/material";
import { translateOrderStatus } from "../../utils/translateOrderStatus";
import { Price } from "../price";

const styles: Record<string, SxProps> = {
    container: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: "h5.fontSize",
        mb: 2,
    },
};

export const OrderStatusPrice = () => {
    const { status, total } = useContext(OrderContext);

    return (
        <Box sx={styles.container}>
            <span>{translateOrderStatus(status)}</span>
            <Price value={total} />
        </Box>
    );
};
