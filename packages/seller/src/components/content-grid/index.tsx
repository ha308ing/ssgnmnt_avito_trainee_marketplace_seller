import { Box, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";

const styles: Record<string, SxProps> = {
    grid: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
        },
        gap: 4,
        paddingBlockEnd: 3,
    },
};

interface IContentGridProps {
    children: ReactNode;
}

export const ContentGrid: FC<IContentGridProps> = ({ children }) => (
    <Box sx={styles.grid}>{children}</Box>
);
