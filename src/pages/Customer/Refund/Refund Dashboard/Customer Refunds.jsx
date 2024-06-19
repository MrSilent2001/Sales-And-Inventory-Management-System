import './Customer Refunds.css';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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
import {jwtDecode} from 'jwt-decode'; 

import React, { useEffect, useMemo, useState } from "react";
import DynamicTable from '../../../../components/Table/customizedTable2';

function CustomerRefunds() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const customerId = decodedToken.id;

            axios.get(`http://localhost:9000/refund/customerRefund/getByCustomerId?customerId=${customerId}`)
                .then(response => {
                    console.log('API Response:', response.data);
                    setRows(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching refund requests:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const columns = useMemo(() => [
        { accessorKey: 'customerName', header: 'Customer Name', size: 100, align: 'center' },
        { accessorKey: 'contact', header: 'Contact', size: 100, align: 'center' },
        { accessorKey: 'item', header: 'Item', size: 100, align: 'center' },
        { accessorKey: 'totalPrice', header: 'Total Price', size: 100, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 100, align: 'center' }
    ], []);

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
                            <Link to="/eligibleOrdersForRefund">
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
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={rows}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CustomerRefunds;

