import { FavoriteBorder, VisibilityOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { IAdvertisment } from "../../types";
import { FC } from "react";

const styles = {
    metrics: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "start",
        gap: 2,
    },
    metric: {
        display: "flex",
        flexFlow: "row nowrap",
        gap: 1,
    },
};

export const AdvertisementMetrics: FC<
    Pick<IAdvertisment, "likes" | "views">
> = ({ likes, views }) => (
    <Box sx={styles.metrics}>
        <Box sx={styles.metric}>
            <FavoriteBorder />
            <Typography>{likes}</Typography>
        </Box>
        <Box sx={styles.metric}>
            <VisibilityOutlined />
            <Typography>{views}</Typography>
        </Box>
    </Box>
);
