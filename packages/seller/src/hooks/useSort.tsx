import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Divider,
    ListSubheader,
    SxProps,
} from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";

type TSortConfig = Record<string, string>;

const ascendingString = "по возрастанию";
const decendingString = "по убыванию";

const styles: Record<string, SxProps> = {
    container: { minWidth: 240 },
};

export const useSort = (sortConfig: TSortConfig) => {
    const menuItems = React.useMemo(() => {
        const entries = Object.entries(sortConfig);
        return entries.reduce(
            (items: ReactNode[], [configKey, label], index) => {
                items = [
                    ...items,
                    <ListSubheader key={`subheader-${label}`}>
                        {label}
                    </ListSubheader>,
                    <MenuItem value={configKey} key={`asc-${label}`}>
                        {ascendingString}
                    </MenuItem>,
                    <MenuItem value={`-${configKey}`} key={`desc-${label}`}>
                        {decendingString}
                    </MenuItem>,
                    index < entries.length - 1 ? (
                        <Divider key={`div-${label}`} />
                    ) : null,
                ];
                return items;
            },
            [],
        );
    }, [sortConfig]);

    const [sorting, setSorting] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setSorting(event.target.value as string);
    };

    const renderValue = useCallback(
        (value: string) => {
            {
                let configKey = value;
                let isAscending = true;
                if (value.startsWith("-")) {
                    configKey = value.substring(1);
                    isAscending = false;
                }
                return `${sortConfig[configKey]}: ${isAscending ? ascendingString : decendingString}`;
            }
        },
        [sortConfig],
    );

    const Component = () => (
        <Box sx={styles.container}>
            <FormControl fullWidth>
                <InputLabel id="select-sort-label">Сортировка</InputLabel>
                <Select
                    labelId="select-sort-label"
                    id="select-sort"
                    value={sorting}
                    label="Сортировка"
                    onChange={handleChange}
                    renderValue={renderValue}
                >
                    {menuItems}
                </Select>
            </FormControl>
        </Box>
    );

    return { sorting, Component, setSorting };
};
