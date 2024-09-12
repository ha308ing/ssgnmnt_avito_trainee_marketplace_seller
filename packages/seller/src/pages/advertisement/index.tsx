import { useParams } from "react-router-dom";
import { advertisementsSliceSelectors } from "@/store/advertisements";
import {
    Box,
    CircularProgress,
    Container,
    SxProps,
    Typography,
} from "@mui/material";
import {
    Price,
    AdvertisementControls,
    AdvertisementMetrics,
} from "@/components";
import { createContext } from "react";
import { IAdvertisment } from "@/types";
import { useAppSelector } from "@/hooks";

const styles: Record<string, SxProps> = {
    container: {
        display: "grid",
        gap: 4,
        gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2,1fr)",
        },
    },
    advertisementImage: {
        position: "relative",
    },
    advertisementInfo: {
        display: "flex",
        flexFlow: "column nowrap",
        gap: 3,
    },
    price: {
        fontSize: "h4.fontSize",
        fontWeight: "bold",
    },
};

const stylesImage = {
    width: "100%",
};

// const AdvertisementBig = styled(Advertisement)(({ theme }) => ({
//     color: "pink",
// }))

const AdvertisementContext = createContext<IAdvertisment>({
    createdAt: "",
    id: "0",
    likes: 0,
    name: "",
    price: 0,
    views: 0,
    description: "",
    imageUrl: "",
});

export const AdvertisementPage = () => {
    const { id } = useParams();
    const advertisements = useAppSelector(
        advertisementsSliceSelectors.selectItems,
    );
    const { status } = useAppSelector(
        advertisementsSliceSelectors.selectStatus,
    );

    const advertisement = id == null ? null : advertisements[id];

    if (status == null || status == "pending") return <CircularProgress />;

    if (advertisement == null) return <h1>Объявление не найдено</h1>;

    const { name, imageUrl, price, views, likes, description } = advertisement;

    return (
        <AdvertisementContext.Provider value={advertisement}>
            <Container sx={styles.container}>
                <Box sx={styles.advertisementImage}>
                    <img src={imageUrl} alt={name} style={stylesImage} />
                    {/* <CardMedia component="img" height={300} image={image} alt={name} title={name} /> */}
                    <AdvertisementControls context={AdvertisementContext} />
                </Box>

                <Box sx={styles.advertisementInfo}>
                    <Typography variant="h1">{name}</Typography>
                    <Typography variant="body1">{description}</Typography>
                    <AdvertisementMetrics likes={likes} views={views} />
                    <Typography sx={styles.price} component="div">
                        <Price value={price} />
                    </Typography>
                </Box>
            </Container>
        </AdvertisementContext.Provider>
    );
};
