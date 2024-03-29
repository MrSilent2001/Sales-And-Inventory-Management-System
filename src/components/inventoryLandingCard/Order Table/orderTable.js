import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CustomizedButton from "../../Button/button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    root: {
        backgroundColor: "#273031",
        color: theme.palette.common.white,
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'name', label: 'Customer Name', minWidth: 170, align: 'center' },
    {
        id: 'amount',
        label: 'Amount(\u20A8.)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: '',
        minWidth: 200,
        align: 'center',
        format: (accept, reject) => (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => { alert("Order has been Accepted") }}
                    hoverBackgroundColor="#2d3ed2"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#242F9B',
                        border: '1px solid #242F9B',
                        width: '6em',
                        height: '2.5em',
                        fontSize: '0.95em',
                        fontFamily: 'inter',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.35em',
                        fontWeight: '550',
                        marginTop: '0.625em',
                        marginRight: '1.5em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    Accept
                </CustomizedButton>

                <CustomizedButton
                    hoverBackgroundColor="#f11717"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#960505',
                        width: '6em',
                        height: '2.5em',
                        fontSize: '0.95em',
                        fontFamily: 'inter',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.35em',
                        fontWeight: '550',
                        marginTop: '0.625em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    Reject
                </CustomizedButton>
            </div>
        ),
    }
];

function createData(id, name, amount) {
    return { id, name, amount };
}

const rows = [
    createData('OID001', 'WAP Saman Perera', 100000),
    createData('OID002', 'WAP Saman Perera', 100000),
    createData('OID004', 'WAP Saman Perera', 100000),
    createData('OID005', 'WAP Saman Perera', 100000),
    createData('OID006', 'WAP Saman Perera', 100000),
    createData('OID007', 'WAP Saman Perera', 100000),
    createData('OID008', 'WAP Saman Perera', 100000),
    createData('OID009', 'WAP Saman Perera', 100000),
    createData('OID010', 'WAP Saman Perera', 100000),
];

function OrderTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '90%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.id === 'actions' ? column.format() : column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default OrderTable;
