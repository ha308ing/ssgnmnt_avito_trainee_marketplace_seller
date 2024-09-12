import { Metric, ContentGrid } from "@/components";
import { CircularProgress } from "@mui/material";
import { advertisementsSliceSelectors } from "@/store/advertisements";
import { ordersSliceSelectors } from "@/store/orders";
import { useAppSelector } from "@/hooks";

export const MetricsPage = () => {
    const metrics = useAppSelector(ordersSliceSelectors.selectMetrics);

    const { status } = useAppSelector(
        advertisementsSliceSelectors.selectStatus,
    );
    const advertisements = useAppSelector(
        advertisementsSliceSelectors.selectItems,
    );
    const advIdTopLikes = useAppSelector(
        advertisementsSliceSelectors.selectTopLikes,
    );
    const advIdTopViews = useAppSelector(
        advertisementsSliceSelectors.selectTopViews,
    );

    return status == null || status == "pending" ? (
        <CircularProgress />
    ) : (
        <ContentGrid>
            <Metric
                description="Лидер лайков"
                label={advertisements[advIdTopLikes].name}
                link={`/advertisements/${advertisements[advIdTopLikes].id}`}
            />
            <Metric
                description="Лидер просмотров"
                label={advertisements[advIdTopViews].name}
                link={`/advertisements/${advertisements[advIdTopViews].id}`}
            />
            {Object.entries(metrics).map(([description, value], index) => {
                return (
                    <Metric
                        key={index}
                        description={description}
                        label={value}
                        link="/orders"
                        state={{ orderStatus: index }}
                    />
                );
            })}
        </ContentGrid>
    );
};
