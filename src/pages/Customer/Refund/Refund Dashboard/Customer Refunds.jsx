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
import { Box } from "@mui/material";

function CustomerRefunds() {
    const [rows, setRows] = useState([]);
    const [productMapping, setProductMapping] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const productMap = productResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});
                setProductMapping(productMap);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchRefundRequests = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const customerId = decodedToken.id;

                try {
                    const refundResponse = await axios.get(`http://localhost:9000/refund/customerRefund/getByCustomerId?customerId=${customerId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const refundData = refundResponse.data.map(refund => ({
                        ...refund,
                        item: productMapping[refund.item] || refund.item // Replace item ID with item name
                    }));
                    setRows(refundData);
                } catch (error) {
                    console.error('Error fetching refund requests:', error);
                }
            }
            setLoading(false);
        };

        fetchProductDetails().then(fetchRefundRequests);
    }, [productMapping]);

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
            height: '3em',
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
                    <div className="customerRefundPoliciesOuter">
                        <div className="customerRefundPolicies">
                            <p>
                                At Tradeasy, we strive to ensure your satisfaction with our construction materials. If you need to return a product, please note that we only accept returns for products that departed from our facility within the last 7 days. To be eligible for a refund, the item must be in its original, unused condition and the return request must be made within this 7-day period. Products that are returned outside of this timeframe or those that have been used or damaged are not eligible for a refund. To initiate a return, please contact our customer service team with your order details, and we will provide you with further instructions. Thank you for choosing Tradeasy!
                            </p>
                        </div>
                    </div>
                    <div className="customerRefundTable">
                        {loading ? (
                            <PageLoader />
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
