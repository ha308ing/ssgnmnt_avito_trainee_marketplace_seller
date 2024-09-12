import React, { useContext } from "react";
import { OrderContext } from ".";
import { FormControlLabel, Switch, SxProps, Tooltip } from "@mui/material";
import { ItemsList } from "./order-items-list";

const styles: SxProps = {
    display: "flex",
    flexFlow: "row-reverse",
    justifyContent: "space-between",
    ml: 0,
};

export const OrderItems = () => {
    const { items } = useContext(OrderContext);

    const [isItems, setIsItems] = React.useState(false);

    const toggleItems = () => {
        setIsItems((current) => !current);
    };

    const label = isItems ? "скрыть товары" : "показать товары";

    return (
        <>
            <Tooltip title={label} followCursor>
                <FormControlLabel
                    sx={styles}
                    labelPlacement="start"
                    onChange={toggleItems}
                    control={<Switch />}
                    value={isItems}
                    label={`Товаров: ${items.length}`}
                />
            </Tooltip>
            {isItems && <ItemsList />}
        </>
    );
};
