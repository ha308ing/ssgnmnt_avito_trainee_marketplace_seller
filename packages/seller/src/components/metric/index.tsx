import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface IMetricProps {
    description: string;
    link: string;
    label: string | number;
    state?: Record<string, string | number> | null;
}

const styles = {
    cardContent: {
        display: "flex",
        flexFlow: "column nowrap",
    },
    metricLabel: {
        fontSize: "4rem",
        fontWeight: 500,
        paddingBlock: "2rem",
        textAlign: "center",
    },
    metricDescription: {
        fontSize: "1.5rem",
        fontWeight: 500,
        textAlign: "end",
    },
};

export const Metric: FC<IMetricProps> = ({
    description,
    label,
    link,
    state = null,
}) => (
    <Card>
        <CardActionArea component={Link} to={link} state={state}>
            <CardContent sx={styles.cardContent}>
                <Typography sx={styles.metricLabel}>{label}</Typography>
                <Typography sx={styles.metricDescription}>
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);
