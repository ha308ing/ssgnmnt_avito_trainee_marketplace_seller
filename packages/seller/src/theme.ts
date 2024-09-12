import { createTheme, LinkProps } from "@mui/material";
import { Link } from "./components/link";

const noUserSelect = {
    styleOverrides: {
        root: {
            userSelect: "none",
        },
    },
} as const;

export const theme = createTheme({
    palette: {
        primary: {
            main: "#00aaf6",
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    userSelect: "none",
                },
            },
        },
        MuiToolbar: noUserSelect,
        MuiTablePagination: noUserSelect,
        MuiLink: {
            defaultProps: {
                component: Link,
            } as LinkProps,
            styleOverrides: {
                root: {
                    textDecoration: "inherit",
                    color: "inherit",
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: Link,
            },
        },
    },
});
