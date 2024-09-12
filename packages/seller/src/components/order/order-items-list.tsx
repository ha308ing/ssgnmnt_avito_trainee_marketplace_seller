import { useContext } from "react";
import { OrderContext } from ".";
import { Grid2, Link, SxProps } from "@mui/material";
import { advertisementsSliceSelectors } from "../../store/advertisements";
import { Price } from "../price";
import { useAppSelector } from "../../hooks";

const styles: Record<string, SxProps> = {
    container: { display: "flex", alignItems: "center" },
    name: { pl: 1 },
    count: { display: "flex", justifyContent: "end" },
    price: { display: "flex", justifyContent: "end" },
};

const stylesImage = { maxWidth: "100%" };

export const ItemsList = () => {
    const { items } = useContext(OrderContext);

    const advertisements = useAppSelector(
        advertisementsSliceSelectors.selectItems,
    );

    return (
        <Grid2 container columns={12}>
            {items.map((orderItem) => {
                const { count, id } = orderItem;
                const item = advertisements[id];
                return (
                    <Grid2
                        component={Link}
                        href={`/advertisements/${id}`}
                        container
                        size={12}
                        sx={styles.container}
                        key={id}
                    >
                        <Grid2 size={2}>
                            <img
                                src={item.imageUrl}
                                style={stylesImage}
                                alt={item.name}
                            />
                        </Grid2>
                        <Grid2 size="grow" sx={styles.name}>
                            {item.name}
                        </Grid2>
                        <Grid2 size="grow" sx={styles.count}>
                            x{count}
                        </Grid2>
                        <Grid2 size="grow" sx={styles.price}>
                            <Price value={item.price} />
                        </Grid2>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};
