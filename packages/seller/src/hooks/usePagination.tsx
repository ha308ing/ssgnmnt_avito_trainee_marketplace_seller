import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { SxProps } from "@mui/material";

export const usePagination = <T = unknown,>(data: T[]) => {
    const count = data.length;
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);

    const dataPaged = React.useMemo(() => {
        const temp = [];

        let i = 0;

        while (i < count) {
            const slice = data.slice(i, i + itemsPerPage);
            temp.push(slice);
            i += itemsPerPage;
        }

        return temp;
    }, [data, itemsPerPage, count]);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const Component: React.FC<{ sx?: SxProps }> = React.memo(({ sx = {} }) => (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Обявлений на странице"
            rowsPerPageOptions={[3, 10, 25, 50, 100]}
            sx={sx}
        />
    ));

    const resetPage = React.useCallback(() => {
        if (!dataPaged[page]) return setPage(0);

        const maxPage = Math.round(dataPaged[page].length / itemsPerPage);
        if (page > maxPage) setPage(maxPage);
    }, [page, setPage, dataPaged, itemsPerPage]);

    return {
        page,
        itemsPerPage,
        Component: React.memo(Component),
        setPage,
        dataPaged,
        resetPage,
        pageData: (dataPaged[page] as T[]) ?? [],
    };
};
