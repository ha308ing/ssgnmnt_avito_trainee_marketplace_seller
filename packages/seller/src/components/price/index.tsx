import { Box, SxProps } from "@mui/material";
import React from "react";

const currencies = {
    rub: "\u20bd",
};

interface IPriceProps {
    currency?: keyof typeof currencies;
    value: number;
}

const styles: SxProps = {
    display: "flex",
    flexFlow: "row nowrap",
    gap: 1,
    fontSize: "inherit",
    fontWeight: "inherit",
};

export const Price: React.FC<IPriceProps> = React.memo(
    ({ currency = "rub", value }) => {
        return (
            <Box sx={styles}>
                <span>{currencies[currency]}</span>
                <span>{value}</span>
            </Box>
        );
    },
);
