import * as Pages from "@/pages";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { theme } from "./theme";
import React from "react";
import { ordersSliceActions, ordersSliceSelectors } from "./store/orders";
import {
    advertisementsSliceActions,
    advertisementsSliceSelectors,
} from "./store/advertisements";
import { useAppDispatch, useAppSelector } from "./hooks";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages.ProfilePage />,
        children: [
            {
                path: "/",
                index: true,
                element: <Pages.MetricsPage />,
            },
            {
                path: "/orders",
                element: <Pages.OrdersPage />,
            },
            {
                path: "/advertisements/:id",
                element: <Pages.AdvertisementPage />,
            },
            {
                path: "/advertisements",
                element: <Pages.AdvertisementsPage />,
            },
        ],
    },
]);

function App() {
    const dispatch = useAppDispatch();
    const { status: advertisementsStatus } = useAppSelector(
        advertisementsSliceSelectors.selectStatus,
    );
    const { status: ordersStatus } = useAppSelector(
        ordersSliceSelectors.selectStatus,
    );

    React.useEffect(() => {
        dispatch(advertisementsSliceActions.getAdvertisements());
        dispatch(ordersSliceActions.getOrders());
    }, [dispatch]);

    if (ordersStatus == null || advertisementsStatus == null)
        return <CircularProgress />;

    if (ordersStatus == "rejected" || advertisementsStatus == "rejected")
        return (
            <h1>
                Не удалось загрузить личный кабинет. Вам может помочь
                техподержка, позвоните 911
            </h1>
        );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme>
                <RouterProvider router={router} />
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
