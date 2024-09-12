import {
    NavLink as RouterLink,
    NavLinkProps as RouterLinkProps,
} from "react-router-dom";
import React from "react";

export const Link = React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & {
        href: RouterLinkProps["to"];
        children: RouterLinkProps["children"];
    }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});
