import { FC, useContext, useMemo, useRef } from "react";
import { SxProps, Typography } from "@mui/material";
import { useTruncated } from "../../hooks/useTruncated";
import { AdvertisementContext } from ".";

const stylesStatic: SxProps = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
};

export const AdvertisementDescription: FC = () => {
    const advertisement = useContext(AdvertisementContext);
    const { description } = advertisement;
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const { isShowMore, ButtonToggleTruncated } = useTruncated(descriptionRef);

    const styles = useMemo(
        () => ({
            ...stylesStatic,
            WebkitLineClamp: isShowMore ? "initial" : "2",
        }),
        [isShowMore],
    );

    if (!description) return null;

    return (
        <>
            <Typography
                variant="body2"
                ref={descriptionRef}
                component="div"
                sx={styles}
            >
                {description}
            </Typography>
            <ButtonToggleTruncated />
        </>
    );
};
