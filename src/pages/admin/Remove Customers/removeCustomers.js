import "./removeCustomers.css";
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
import Footer from "../../../layout/footer/footer";
import SearchBar from "../../../layout/search bar/search bar";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from "../../../components/Button/button";

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const columns = [
    {id: 'id', label: 'ID', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Name', minWidth: 100, align: 'center'},
    {id: 'address', label: 'Address', minWidth: 170, align: 'center'},
    {id: 'actions', label: 'Actions', minWidth: 340, align: 'center'},
];

const createData = (id, name, address) => ({
    id,
    name,
    address,
});


const handleSendWarningButtonClick = () => {
    alert("Please Login to the Account");
};

const handleRemoveButtonClick = (id) => {
    alert(`Customer ${id} has been Removed`);
};

const createActions = (id) => ({
    sendWarningButton:
        <CustomizedButton
            onClick={handleSendWarningButtonClick}
            hoverBackgroundColor="#2d3ed2"
            style={{
                color: '#ffffff',
                backgroundColor: '#242F9B',
                border: '1px solid #242F9B',
                width: '11em',
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
            Send Warning
        </CustomizedButton>,
    removeButton:
        <CustomizedButton
            onClick={() => handleRemoveButtonClick(id)}
            hoverBackgroundColor="#f11717"
            style={{
                color: '#ffffff',
                backgroundColor: '#960505',
                width: '11em',
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
            Remove
        </CustomizedButton>,
});

const rows = [
    createData('0001', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0002', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0003', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0004', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0005', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0006', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0007', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0008', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0009', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0010', 'Finn Allen', 'No.65, Yorkshire, England'),
    createData('0011', 'Finn Allen', 'No.65, Yorkshire, England'),
].map(({id, name, address}) => ({
    ...createData(id, name, address),
    ...createActions(id),
}));


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

    return (
        <>
            <SalesNavbar/>
            <div className="removeCustomersOuter">
                <div className="removeCustomersInner">
                    <div className="removeCustomersTopicWithButton">
                        <div className="removeCustomersTopic">
                            <h2>Customers</h2>
                        </div>
                        <div className="removeCustomersTextfield">
                            <SearchBar/>
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
                                        .map((row) => (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {column.id === 'actions'
                                                            ? <>
                                                                {row.sendWarningButton}
                                                                {row.removeButton}
                                                            </>
                                                            : row[column.id]}
                                                    </StyledTableCell>
                                                ))}
                                            </StyledTableRow>
                                        ))}
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

export default RemoveCustomers;
