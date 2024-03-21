import './customersProfileDetails.css';
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
import TextField from '@mui/material/TextField';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";


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
    {id: 'id', label: 'ID', minWidth: 170, align: 'center'},
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
        label: 'Items',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(id, name, address,items,amount) {
    return {id, name, address,items,amount};
}

const rows = [
    createData('OI0000', 'James Anderson', 'No.22, Auckland, New Zealand', ['7111,2323'], 'Rs.311,000'),
    createData('OI0001', 'James Anderson', 'No.22, Auckland, New Zealand', ['1959,6961'], 'Rs.311,000'),
    createData('OI0002', 'James Anderson', 'No.22, Auckland, New Zealand',['1944,6987'] ,'Rs.311,000'),
    createData('OI0003', 'James Anderson', 'No.22, Auckland, New Zealand',['7111,2323'], 'Rs.311,000'),
    createData('OI0004', 'James Anderson', 'No.22, Auckland, New Zealand', ['4000,7896'], 'Rs.311,000'),
    createData('OI0005', 'James Anderson', 'No.22, Auckland, New Zealand', ['7111,2323'], 'Rs.311,000'),
    createData('OI0006', 'James Anderson', 'No.22, Auckland, New Zealand',['7111,2323'] ,'Rs.311,000'),
    createData('OI0007', 'James Anderson', 'No.22, Auckland, New Zealand',['7111,2323'] , 'Rs.311,000'),
    createData('OI0008', 'James Anderson', 'No.22, Auckland, New Zealand', ['4000,7896'],'Rs.311,000'),

];
function CustomersProfileDetails() {

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
            <CustomerNavbar/>
            <div className="CustomerProfileOuter">
                <div className="CustomerProfileInner">
                    <h2 className="title">James Anderson</h2>

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

export default CustomersProfileDetails;