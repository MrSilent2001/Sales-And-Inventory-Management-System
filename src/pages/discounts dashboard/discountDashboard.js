import "./discountDashboard.css";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
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
    {id: 'product', label: 'Product Name', minWidth: 100, align: 'center'},
    {
        id: 'discount',
        label: 'Discount',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Selling Price (\u20A8.)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: '',
        minWidth: 170,
        align: 'center',
        format: () => (
            <Button/>
        ),
    }
];

const handleButtonClick = () => {
    console.log('Button clicked for row:');
};

function createData(id, product, discount, price, actions) {

    return {
        id,
        product,
        discount,
        price,
        actions
    };
}

const rows = [
    createData('I001', 'Holcim-Cement Bag 50kg', '10%', 2750.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I002', 'Holcim-Cement Bag 50kg', '10%', 1250.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I004', 'Holcim-Cement Bag 50kg', '10%', 3000.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I005', 'Holcim-Cement Bag 50kg', '10%', 1200.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I006', 'Holcim-Cement Bag 50kg', '10%', 1560.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I007', 'Holcim-Cement Bag 50kg', '5%', 1225.50, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I008', 'Holcim-Cement Bag 50kg', '5%', 1550.50, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I009', 'Holcim-Cement Bag 50kg', '12%', 750.50, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I010', 'Holcim-Cement Bag 50kg', '10%', 7542.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I011', 'Holcim-Cement Bag 50kg', '12%', 8510.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I012', 'Holcim-Cement Bag 50kg', '5%', 3800.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I013', 'Holcim-Cement Bag 50kg', '12%', 1250.00, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I014', 'Holcim-Cement Bag 50kg', '10%', 375.25, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>),
    createData('I015', 'Holcim-Cement Bag 50kg', '5%', 999.99, <Button variant="contained" onClick={() => handleButtonClick()}>Cancel</Button>)
];

function DiscountDashboard() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <>
            <SalesNavbar/>
        <div className="discountDashboardOuter">
            <div className="discountDashboardInner">
                <h2 className="title">Discounted Items</h2>
                <Paper sx={{width: '90%', overflow: 'hidden'}}>
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
            <Footer/>
        </>
    );
}

export default DiscountDashboard;