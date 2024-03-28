import "./discountDashboard.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../layout/footer/footer";
import Searchbar from "../../../layout/search bar/search bar";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import AddDiscounts from "./Modal/Add Discount/addDiscounts";
import { useState } from "react";
import CustomizedButton from "../../../components/Button/button";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#273031",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
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
    { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
    { id: 'discount', label: 'Discount', minWidth: 170, align: 'center' },
    { id: 'price', label: 'Selling Price (\u20A8.)', minWidth: 170, align: 'center' },
    { id: 'actions', label: '', minWidth: 170, align: 'center' },
];

const handleButtonClick = () => {
    alert("Discount Has been Closed");
};

function createData(id, product, discount, price) {
    return { id, product, discount, price };
}

function createCancelButton(handleClick) {
    return (
        <CustomizedButton
            hoverBackgroundColor="#f11717"
            style={{
                color: '#ffffff',
                backgroundColor: '#960505',
                width: '8.5em',
                height: '3em',
                fontSize: '0.95em',
                fontFamily: 'inter',
                padding: '0.5em 0.625em',
                borderRadius: '0.625em',
                fontWeight: '550',
                border: 'none',
                marginTop: '0.625em',
                textTransform: 'none',
                textAlign: 'center',
            }}>
            Cancel
        </CustomizedButton>
    );
}

const rows = [
    createData('I001', 'Holcim-Cement Bag 50kg', '10%', 2750.00),
    createData('I002', 'Holcim-Cement Bag 50kg', '10%', 1250.00),
    createData('I004', 'Holcim-Cement Bag 50kg', '10%', 3000.00),
    // Add more rows here...
].map(row => ({ ...row, actions: createCancelButton(handleButtonClick) }));

function DiscountDashboard() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [visible, setVisible] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <SalesNavbar />
            <div className="discountDashboardOuter">
                <div className="discountDashboardInner">
                    <div className="discountTitleWithSearchbar">
                        <h2 className="discountTitle">Discounted Items</h2>
                        <Link to="/AddDiscount">
                            <Searchbar />
                        </Link>
                    </div>
                    <div className="discount-dashboard">
                        <Paper sx={{ width: '75%', overflow: 'hidden' }}>
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
                <Modal open={visible}>
                    <AddDiscounts onClose={(value) => { setVisible(false) }}></AddDiscounts>
                </Modal>
            </div>
            <Footer />
        </>
    );
}

export default DiscountDashboard;
