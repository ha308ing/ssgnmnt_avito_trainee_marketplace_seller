import { Box, Link, Typography } from "@mui/material";
import { useContext } from "react";
import { OrderContext } from ".";

export const OrderTitle = () => {
    const order = useContext(OrderContext);

    const { createdAt, id } = order;
    const date = new Date(createdAt).toLocaleDateString("RU");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography
                component={Link}
                href={`/orders/${id}`}
                sx={{ fontSize: "h5.fontSize", fontWeight: "bold" }}
            >{`#${id}`}</Typography>
            <Typography sx={{ fontSize: "h6.fontSize", fontWeight: "bold" }}>
                {date}
            </Typography>
        </Box>
    );
};
