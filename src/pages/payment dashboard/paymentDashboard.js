import "./paymentDashboard.css";
import {styled} from '@mui/material/styles';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SalesNavbar from "../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../layout/footer/footer";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#273031",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    {id: 'id', label: 'Id', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Name', minWidth: 100, align: 'center'},
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'items',
        label: 'Purchased Items',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Total Amount (\u20A8.)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(id, name, address, items, amount) {
    return {id, name, address, items, amount};
}

const rows = [
    createData('000001', 'Chris Gayle', 'No.132, Kingston, Jamaica', ['I004', 'I002'], 3287263),
    createData('000002', 'Stuart Broad', 'No.62, Worwickshire, England', ['I001', 'I002'], 9596961),
    createData('000003', 'James Anderson', 'No.62, Yorkshire, England', ['I001', 'I002'], 301340),
    createData('000004', 'Finn Allen', 'No.22, Auckland, New Zealand', ['I001', 'I008'], 9833520),
    createData('000005', 'Jason Holder', 'No.325, Basseterri, Barbados', ['I001', 'I002'], 9984670),
    createData('000006', 'Shaun Marsh', 'No.132, Kingston, Jamaica', ['I001', 'I002'], 7692024),
    createData('000007', 'Mitchell Starc', 'No.72, Sydney, Australia', ['I001', 'I002'], 357578),
    createData('000008', 'Josh Hazelwood', 'No.92, Melbourne, Australia', ['I005', 'I002'], 70273),
    createData('000009', 'Joe Root', 'No.52, Lankanshire, England', ['I001', 'I002'], 1972550),
    createData('000010', 'Harry Brook', 'No.26, Derbyshire, England', ['I001', 'I006'], 377973),
    createData('000011', 'Fabian Allen', 'No.12, St.Georges Park, Guyana', ['I001', 'I002'], 640679),
    createData('00012', 'Ross Taylor', 'No.252, Wellington, New Zealand', ['I001', 'I002'], 242495),
    createData('00013', 'Nat Sciver', 'No.23, Essex, England', ['I001', 'I002'], 17098246),
    createData('00014', 'Catherine Brunt', 'No.3, Sussex, England', ['I001', 'I003'], 923768),
    createData('00015', 'Sarah Taylor', 'No.33, London, England', ['I001', 'I002'], 8515767),
];

function PaymentDashboard() {

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
        <>
            <SalesNavbar/>
        <div className="paymentDashboardOuter">
            <div className="paymentDashboardInner">

                <div className="payment-title">
                    <h2 className="paymentTitle">Payments</h2>
                </div>

                <div className="paymentDashboard">
                    <Paper sx={{width: '75%', overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <StyledTableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
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
                </div>
            </div>
        </div>
            <Footer/>
        </>
    );
}

export default PaymentDashboard;