import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useTitle } from "../../hooks/useTitle";
import { NavLink as RouterLink } from "react-router-dom";
import { Link, SxProps } from "@mui/material";
import { AddAdvertisementButton } from "./button-add-advertisement";

const pages = [
    ["/", "Личный кабинет"],
    ["/advertisements", "Объявления"],
    ["/orders", "Заказы"],
];

const styles: Record<string, SxProps> = {
    appbar: {
        marginBlockEnd: 3,
    },
    title: {
        flexGrow: 1,
        fontFamily: "monospace",
        fontWeight: 700,
        color: "inherit",
        textDecoration: "none",
    },
    buttonsContainer: {
        flexGrow: 0,
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
    },
};

const stylesMenuLink = {
    textDecoration: "inherit",
    color: "inherit",
};

export const ResponsiveAppBar = React.memo(() => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const title = useTitle();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" sx={styles.appbar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map(([url, title]) => (
                                <RouterLink
                                    to={url}
                                    key={title}
                                    style={stylesMenuLink}
                                    end
                                >
                                    {({ isActive }) => (
                                        <MenuItem
                                            selected={isActive}
                                            onClick={handleCloseNavMenu}
                                        >
                                            {title}
                                        </MenuItem>
                                    )}
                                </RouterLink>
                            ))}
                        </Menu>
                    </Box>
                    <Typography variant="h5" noWrap sx={styles.title}>
                        {title}
                    </Typography>
                    <Box sx={styles.buttonsContainer}>
                        <AddAdvertisementButton />
                        <Tooltip title="Личный кабинет">
                            <IconButton sx={{ p: 0 }} component={Link} href="/">
                                <AccountCircleOutlinedIcon
                                    color="inherit"
                                    fontSize="large"
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
});
