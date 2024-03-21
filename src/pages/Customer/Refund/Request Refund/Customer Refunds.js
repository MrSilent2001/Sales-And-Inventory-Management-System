import './Customer Refunds.css'
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Modal} from "@mui/material";
import UpdateItem from "../../../Inventory/View Inventory Page/Models/Update Item/Update Item";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";

const CustomerRefundRequestButton = styled(Button)(({theme}) => ({
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
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.7em',
        textAlign: 'center',
        height: '2em',
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

function createData(customerName, mobileNumber, itemId, payment, refundStatus) {
    return {customerName, mobileNumber, itemId, payment, refundStatus};
}

const rows = [
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
    createData('WAP Saman Perera', '0771112234', 'I0001', 100000, 'Refunded'),
];

function CustomerRefundRequestTables() {
    const [visible, setVisible] = useState(false)

    return (
        <TableContainer component={Paper}
                        sx={{width: '70em', maxHeight: '25em', overflowY: 'auto', position: 'relative'}}>
            <Table sx={{minWidth: '30em'}} aria-label="customized table">
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="right">{row.customerName}</StyledTableCell>
                            <StyledTableCell align="right">{row.mobileNumber}</StyledTableCell>
                            <StyledTableCell align="right">{row.itemId}</StyledTableCell>
                            <StyledTableCell align="right">{row.payment}</StyledTableCell>
                            <StyledTableCell align="right">{row.refundStatus}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal open={visible}>
                <UpdateItem onClose={(value) => {
                    setVisible(false)
                }}></UpdateItem>
            </Modal>
        </TableContainer>
    );
}

function CustomerRefunds() {
    return (
        <>
            <CustomerNavbar/>
            <div className="customerRefundsOuter">
                <div className="customerRefundsInner">

                    <div className="customerRefundTopicWithButton">
                        <div className="customerRefundTopic">
                            <h3>Refund Request</h3>
                        </div>

                        <div className="customerRefundRequestButton">
                            <Link to="/createrefund">
                            <CustomerRefundRequestButton>Request Refund</CustomerRefundRequestButton>
                            </Link>
                        </div>
                    </div>

                    <div className="customerRefundTable">
                        <CustomerRefundRequestTables></CustomerRefundRequestTables>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CustomerRefunds;