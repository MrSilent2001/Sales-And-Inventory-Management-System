import './Customer Refunds.css';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

import React, { useEffect, useMemo, useState } from "react";
import DynamicTable from '../../../../components/Table/customizedTable2';
import PageLoader from "../../../../components/Page Loader/pageLoader";
import {Box} from "@mui/material";

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
        { accessorKey: 'orderId', header: 'Order Id', size: 100, align: 'center' },
        { accessorKey: 'item', header: 'Item', size: 100, align: 'center' },
        { accessorKey: 'totalPrice', header: 'Total Price', size: 100, align: 'center' },
        { accessorKey: 'createdDate', header: 'Created Date', size: 100, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 100, align: 'center' }
    ], []);

    const createToolbarButton = () => {
        const buttonStyle = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '11em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            marginRight: '1em'
        };

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    marginBottom: 2
                }}
            >
                <Link to="/eligibleOrdersForRefund">
                    <CustomizedButton
                        hoverBackgroundColor="#2d3ed2"
                        style={buttonStyle}
                    >
                        Request Refund
                    </CustomizedButton>
                </Link>
            </Box>
        );
    };
    return (
        <>
            <CustomerNavbar />
            <div className="customerRefundsOuter">
                <div className="customerRefundsInner">
                    <div className="customerRefundTopicWithButton">
                        <div className="customerRefundTopic">
                            <h3>Refund Request</h3>
                        </div>

                    </div>
                    <div className="customerRefundTable">
                        {loading ? (
                            <PageLoader/>
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={rows}
                                includeProfile={false}
                                renderToolbarItems={createToolbarButton}
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

