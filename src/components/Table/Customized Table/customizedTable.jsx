import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

function CustomizedTable({ columns, rows, style }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#010a33',
            color: theme.palette.common.white,
            fontSize: '0.75em',
            fontWeight: 500,
            textAlign: 'center',
            padding: '4px',
            position: 'sticky',
            top: 0,
            zIndex: 1,
        },

        [`&.${tableCellClasses.body}`]: {
            fontSize: '0.70em',
            textAlign: 'center',
            color: 'black',
            backgroundColor: 'white',
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:hover': {
            backgroundColor: '#656363',
        },
    }));

    const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
        backgroundColor: '#010a33',
        color: theme.palette.common.white,
        fontSize: '0.75em',
        fontWeight: 500,
        textAlign: 'center',
        padding: '2px 0',
        '& .MuiTablePagination-actions button': {
            color: theme.palette.common.white,
        },
    }));

    // Calculate the rows to display based on the current page and rows per page
    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ overflow: 'auto', maxHeight: '400px', ...style }}>
            <TableContainer component="div" style={{ maxHeight: '400px' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.columnId}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <StyledTableRow key={row.id} style={{ cursor: 'pointer' }}>
                                {columns.map((column) => {
                                    const value = row[column.columnId];
                                    return (
                                        <StyledTableCell key={`${row.id}-${column.columnId}`} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <StyledTablePagination
                rowsPerPageOptions={[7, 14, 21]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default CustomizedTable;
