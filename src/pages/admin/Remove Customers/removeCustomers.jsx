import "./removeCustomers.css";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from "../../../layout/footer/footer";
import SearchBar from "../../../components/search bar/search bar";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from "../../../components/Button/button";
import customerData from "../../../data/data.json";

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
    {id: 'name', label: 'Name', minWidth: 170, align: 'center'},
    {id: 'email', label: 'Email', minWidth: 250, align: 'center'},
    {id: 'contact', label: 'Contact', minWidth: 170, align: 'center'},
    {id: 'address', label: 'Address', minWidth: 300, align: 'center'},
    {id: 'actions', label: 'Actions', minWidth: 170, align: 'center'},
];

function RemoveCustomers() {

    const handleSendWarningButtonClick = () => {
        alert("Please Login to the Account");
    };

    const handleRemoveButtonClick = (id) => {
        // Handle removal logic here
        console.log(`Removing customer with id ${id}`);
    };

    const createActions = (id) => ({
        sendWarningButton:
            <CustomizedButton
                key={`sendWarning_${id}`}
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
                key={`removeButton_${id}`}
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

    const rows = customerData.customerData || [];

    return (
        <>
            <SalesNavbar/>
            <div className="removeCustomersOuter">
                <div className="removeCustomersInner">
                    <div className="removeCustomersTopicWithButton">
                        <div className="removeCustomersTopic">
                            <h2>Customers</h2>
                        </div>
                        <div className="removeCustomersBtnWithSearchBar">
                        <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '12.25em',
                                        height: '2.25em',
                                        fontSize: '0.9em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Inactive Customers
                                </CustomizedButton>
                                
                            <SearchBar/>
                        </div>
                    </div>
                    <Paper sx={{width: '80%', overflow: 'hidden'}}>
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
                                        .map((row) => (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {column.id === 'actions'
                                                            ? <div style={{display: 'flex'}}>
                                                                {createActions(row.id).sendWarningButton}
                                                                {createActions(row.id).removeButton}
                                                            </div>
                                                            : row[column.id]}
                                                    </StyledTableCell>
                                                ))}
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default RemoveCustomers;
