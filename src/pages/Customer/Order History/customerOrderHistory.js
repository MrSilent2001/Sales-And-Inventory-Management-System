import './customerOrderHistory.css';
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
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";


/*const CustomerOrdersButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
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
}));*/

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
        id: 'totalAmount',
        label: 'Total Amount',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(id, name, address,items,totalAmount) {
    return {id, name, address,items,totalAmount};
}

const rows = [
    createData('000000', 'Chris Gayle', 'No.132, Kingston, Jamaica', ['7111,2323'], 'Rs.311,000'),
    createData('000001', 'Stuart Broad', 'No.62, Worwickshire, England', ['1959,6961'], 'Rs.311,000'),
    createData('000002', 'Regina Percil', 'No.13,Ludwigsburg , Germany',['1944,6987'] ,'Rs.311,000'),
    createData('000003', 'James Anderson', 'No.65, Yorkshire, England',['7111,2323'], 'Rs.311,000'),
    createData('000004', 'Finn Allen', 'No.22, Auckland, New Zealand', ['4000,7896'], 'Rs.311,000'),
    createData('000005', 'Jason Holder', 'No.325, Basseterri, Barbados', ['7111,2323'], 'Rs.311,000'),
    createData('000006', 'Shaun Marsh', 'No.132, Kingston, Jamaica',['7111,2323'] ,'Rs.311,000'),
    createData('000007', 'Mitchell Starc', 'No.72, Sydney, Australia',['7111,2323'] , 'Rs.311,000'),
    createData('000008', 'Josh Hazelwood', 'No.92, Melbourne, Australia', ['4000,7896'],'Rs.311,000'),
    createData('000009', 'Joe Root', 'No.52, Lankanshire, England',['7111,2323'] , 'Rs.311,000'),
    createData('000010', 'Harry Brook', 'No.26, Derbyshire, England', ['4040,7896'], 'Rs.311,000'),
    createData('000011', 'Fabian Allen', 'No.12, St.Georges Park, Guyana',['7111,2323'] , 'Rs.311,000'),
    createData('00012', 'Ross Taylor', 'No.252, Wellington, New Zealand', ['7195,9661'], 'Rs.311,000'),
    createData('00013', 'Nat Sciver', 'No.23, Essex, England', '1959,6961', 'Rs.311,000'),
    createData('00014', 'Catherine Brunt', 'No.3, Sussex, England', ['0740,0078'],'Rs.311,000'),
    createData('00015', 'Sarah Taylor', 'No.33, London, England', ['1959,6501'], 'Rs.311,000'),
];
function CustomerOrderHistory() {

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
            <div className="CustomerOrdersOuter">
                <div className="CustomerOrdersInner">
                    <div className="customerOrdersTopicWithTextfield">
                        <div className="customerOrdersTopic">
                            <h2>Orders</h2>
                        </div>

                        <div className="customerOrdersTextField">
                            <TextField id="outlined-search" label="Search" type="search" />
                        </div>
                    </div>




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

export default CustomerOrderHistory;