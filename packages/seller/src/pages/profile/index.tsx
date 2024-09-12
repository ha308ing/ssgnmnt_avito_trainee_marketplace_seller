import { Container } from "@mui/material";
import { ResponsiveAppBar } from "@/components";
import { Outlet } from "react-router-dom";

export const ProfilePage = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </>
    );
};
