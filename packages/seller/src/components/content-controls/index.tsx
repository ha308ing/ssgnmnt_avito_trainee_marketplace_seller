import { Stack, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";

interface IContentControlsProps {
    children: ReactNode;
}

const styles: SxProps = {
    gap: 2,
    mb: 2,
    flexWrap: "wrap",
};

export const ContentControls: FC<IContentControlsProps> = ({ children }) => {
    return (
        <Stack direction="row" sx={styles}>
            {children}
        </Stack>
    );
};
