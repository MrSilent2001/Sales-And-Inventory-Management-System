import "./remove customers.css";
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
import TextField from '@mui/material/TextField';

const SendWarningButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '13.625em',
        height: '3.5em'
    },
    fontSize: '0.75em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const RemoveButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ff0000'),
    backgroundColor: '#ff0000',
    '&:hover': {
        backgroundColor: '#CA3433'
    },
    '&.MuiButton-root': {
        width: '13.625em',
        height: '3.5em'
    },
    fontSize: '0.75em',
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
        id: 'actions1',
        label: '',
        minWidth: 170,
        align: 'center',
        format: () => (
            <Button/>
        ),
    },
    {
        id: 'actions2',
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

function createData(id,name,address,actions1, actions2) {

    return {
        id,
        name,
        address,
        actions1,
        actions2
    };
}

const rows = [
    createData('0001', 'Finn Allen', 'No.65, Yorkshire, England', <SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0002', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0003', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0004', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0005', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0006', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0007', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0008', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0009', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0010', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0011', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0012', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0013', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0014', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>),
    createData('0015', 'Finn Allen', 'No.65, Yorkshire, England',<SendWarningButtons>Send Warning</SendWarningButtons>, <RemoveButtons>Remove</RemoveButtons>)
];

function RemoveCustomers() {

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
        <div className="removeCustomersOuter">
            <div className="removeCustomersInner">
            <div className="removeCustomersTopicWithButton">
                    <div className="removeCustomersTopic">
                        <h2>Customers</h2>
                    </div>

                   <div className="removeCustomersTextfield">
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
    );
}

export default RemoveCustomers;
