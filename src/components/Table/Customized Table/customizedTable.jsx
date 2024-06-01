import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

function CustomizedTable({ columns, rows, style }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedRows, setSelectedRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 14));
        setPage(0);
    };

    const handleSort = (columnId) => {
        if (sortBy === columnId) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnId);
            setSortDirection('asc');
        }
    };

    const sortedRows = rows.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleRowClick = (event, row) => {
        const selectedIndex = selectedRows.indexOf(row);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected);
    };

    const isSelected = (row) => selectedRows.indexOf(row) !== -1;

    const handleClickAllRows = (event) => {
        if (event.target.checked) {
            const newSelectedRows = rows.filter(row => !isSelected(row));
            setSelectedRows([...selectedRows, ...newSelectedRows]);
        } else {
            setSelectedRows([]);
        }
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
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                                    onClick={() => handleSort(column.columnId)}
                                >
                                    {column.label}
                                    {sortBy === column.columnId && (
                                        <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                    )}

                                    <Checkbox
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                        checked={selectedRows.length === rows.length}
                                        onChange={handleClickAllRows}
                                    />
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <StyledTableRow key={row.id} style={{ cursor: 'pointer' }} selected={isSelected(row)} onClick={(event) => handleRowClick(event, row)}>
                                <StyledTableCell>
                                    <Checkbox checked={isSelected(row)}/>
                                </StyledTableCell>
                                {columns.map((column) => {
                                    const value = row[column.columnId];
                                    return (
                                        <StyledTableCell key={`${row.id}-${column.columnId}`} align={column.align} >
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
