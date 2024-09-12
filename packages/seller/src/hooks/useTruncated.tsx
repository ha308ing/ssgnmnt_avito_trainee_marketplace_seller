import React, { RefObject } from "react";
import { Button } from "@mui/material";

export const useTruncated = (ref: RefObject<HTMLDivElement>) => {
    const [isTruncated, setIsTruncated] = React.useState<null | boolean>(null);
    const [isShowMore, setIsShowMore] = React.useState(false);

    React.useLayoutEffect(() => {
        if (!ref.current) return;

        const { offsetHeight, scrollHeight } = ref.current;

        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            if (isTruncated === null) {
                setIsTruncated(null);
            } else {
                setIsTruncated(false);
            }
        }
    }, [ref, isTruncated]);

    const toggleShowMore = React.useCallback(() => {
        setIsShowMore((current) => !current);
    }, []);

    const ButtonToggleTruncated = () => {
        return isTruncated === null ? null : (
            <Button
                size="small"
                color="secondary"
                onClick={toggleShowMore}
            >{`${isShowMore ? "Свернуть" : "Развернуть"} описание`}</Button>
        );
    };

    return { isTruncated, toggleShowMore, isShowMore, ButtonToggleTruncated };
};
