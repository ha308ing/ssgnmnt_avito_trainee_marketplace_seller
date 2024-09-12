import { FC, useContext } from "react";
import { Box, Link, SxProps, Typography } from "@mui/material";
import { AdvertisementContext } from ".";
import { Price } from "../price";
import { AdvertisementMetrics } from "./advertisement-metrics";

const styles: Record<string, SxProps> = {
    container: {
        display: "flex",
        flexFlow: "row nowrap",
        mb: 2,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
    },
    titleContainer: {
        display: "flex",
        flexFlow: "column nowrap",
    },
    title: {
        fontSize: "h4.fontSize",
        lineHeight: 1,
        paddingBlockEnd: 1,
    },
    price: {
        fontWeight: "bold",
        fontSize: "h5.fontSize",
    },
};

export const AdvertisementHeader: FC = () => {
    const advertisement = useContext(AdvertisementContext);

    const { id, name, likes, views, price } = advertisement;

    return (
        <Box sx={styles.container}>
            <Box sx={styles.titleContainer}>
                <Typography
                    component={Link}
                    href={`/advertisements/${id}`}
                    sx={styles.title}
                >
                    {name}
                </Typography>
                <AdvertisementMetrics likes={likes} views={views} />
            </Box>
            <Typography sx={styles.price} component="div">
                <Price value={price} />
            </Typography>
        </Box>
    );
};
