import "./customerDashboard.css";
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
import Button from '@mui/material/Button';
import Searchbar from "../../../layout/search bar/search bar";
import Footer from "../../../layout/footer/footer";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import {Link} from "react-router-dom";

const CustomerManagementButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: 'red',
    '&:hover': {
        backgroundColor: '#2d3ed2'

    },
    '&.MuiButton-root': {
        width: '13.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

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
        id: 'contact',
        label: 'Contact',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(id, name, address, contact, email) {
    return {id, name, address, contact, email};
}

const rows = [
    createData('000000', 'Chris Gayle', 'No.132, Kingston, Jamaica', '0771112323', 'chrisgayle@gmail.com'),
    createData('000001', 'Stuart Broad', 'No.62, Worwickshire, England', '0719596961', 'stuartbroad@gmail.com'),
    createData('000002', 'Regina Percil', 'No.13,Ludwigsburg , Germany', '0719446987', 'reginapercil@gmail.com'),
    createData('000003', 'James Anderson', 'No.65, Yorkshire, England', '0771112323', 'Jamesanderson@gmail.com'),
    createData('000004', 'Finn Allen', 'No.22, Auckland, New Zealand', '0740007896', 'Finnallen@gmail.com'),
    createData('000005', 'Jason Holder', 'No.325, Basseterri, Barbados', '0771112323', 'JasonHolder@gmail.com'),
    createData('000006', 'Shaun Marsh', 'No.132, Kingston, Jamaica', '0771112323', 'ShaunMarsh@gmail.com'),
    createData('000007', 'Mitchell Starc', 'No.72, Sydney, Australia', '0771112323', 'MitchellStarc@gmail.com'),
    createData('000008', 'Josh Hazelwood', 'No.92, Melbourne, Australia', '0740007896', 'JoshHazelwood@gmail.com'),
    createData('000009', 'Joe Root', 'No.52, Lankanshire, England', '0771112323', 'JoeRoot@gmail.com'),
    createData('000010', 'Harry Brook', 'No.26, Derbyshire, England', '0740007896', 'HarryBrook@gmail.com'),
    createData('000011', 'Fabian Allen', 'No.12, St.Georges Park, Guyana', '0771112323', 'FabianAllen@gmail.com'),
    createData('00012', 'Ross Taylor', 'No.252, Wellington, New Zealand', '0719596961', 'RossTaylor@gmail.com'),
    createData('00013', 'Nat Sciver', 'No.23, Essex, England', '0719596961', 'NatSciver@gmail.com'),
    createData('00014', 'Catherine Brunt', 'No.3, Sussex, England', '0740007896', 'CatherineBrunt@gmail.com'),
    createData('00015', 'Sarah Taylor', 'No.33, London, England', '0719596961', 'SarahTaylor@gmail.com'),
];

function CustomerDashboard() {

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
            <div className="CustomerManagementOuter">
                <div className="CustomerManagementInner">

                    <div className="customerManagementTitleWithButton">

                        <h2 className="customerManagement-title">Customers</h2>

                        <div className="CustomerManagementBtnWithSearchbar">
                            <Link to="/removeCustomers">
                                <CustomerManagementButton>Inactive Customers</CustomerManagementButton>
                            </Link>

                            <Searchbar/>
                        </div>

                    </div>

                    <div className="CustomerManagement">
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

export default CustomerDashboard;