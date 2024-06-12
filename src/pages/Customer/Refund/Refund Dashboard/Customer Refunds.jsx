import './Customer Refunds.css';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Modal } from "@mui/material";
import UpdateItem from "../../../admin/View Inventory/Modals/Update Item/Update Item";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.7em',
        textAlign: 'center',
        height: '2em',
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

function CustomerRefundRequestTables({ rows }) {
    const [visible, setVisible] = useState(false);

    return (
        <TableContainer component={Paper}
                        sx={{ width: '88em', maxHeight: '25em', overflowY: 'auto', position: 'relative' }}>
            <Table sx={{ minWidth: '30em' }} aria-label="customized table">
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="right">{row.customerName}</StyledTableCell>
                            <StyledTableCell align="right">{row.contact}</StyledTableCell>
                            <StyledTableCell align="right">{row.item}</StyledTableCell>
                            <StyledTableCell align="right">{row.totalPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal open={visible}>
                <UpdateItem onClose={() => setVisible(false)}></UpdateItem>
            </Modal>
        </TableContainer>
    );
}

function CustomerRefunds() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            const customerId = decodedToken.customerId; // Adjust this according to your token structure

            axios.get(`/refund/customerRefund/getByCustomerId?customerId=${customerId}`)
                .then(response => {
                    setRows(response.data);
                })
                .catch(error => {
                    console.error('Error fetching refund requests:', error);
                });
        } else {
            console.error('No token found in local storage');
        }
    }, []);

    return (
        <>
            <CustomerNavbar />
            <div className="customerRefundsOuter">
                <div className="customerRefundsInner">
                    <div className="customerRefundTopicWithButton">
                        <div className="customerRefundTopic">
                            <h3>Refund Request</h3>
                        </div>
                        <div className="customerRefundRequestButton">
                            <Link to="/createrefund">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '12em',
                                        height: '2.9em',
                                        fontSize: '0.75em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Request Refund
                                </CustomizedButton>
                            </Link>
                        </div>
                    </div>
                    <div className="customerRefundTable">
                        <CustomerRefundRequestTables rows={rows} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CustomerRefunds;
