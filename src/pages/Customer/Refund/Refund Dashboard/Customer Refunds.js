import './Customer Refunds.css'
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Modal} from "@mui/material";
import UpdateItem from "../../../admin/View Inventory/Modals/Update Item/Update Item";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import customerRefunds from "../../../../data/data.json";
import CustomizedTable from "../../../../components/Table/Customized Table/customizedTable";
import axios from "axios";





function CustomerRefunds() {

    const [refundData, setRefundData] = useState([]);
    const [status, setStatus] = useState('');

    const getAllCustomerRefundData = () => {
        let url = 'http://localhost:9000/refund/customerRefund/getAll';
        /*if(status === 'pending'){
            url = 'http://localhost:9000/refund/customerRefund/getRefundByStatus?refundStatus=pending';
        }else if(status === 'approved'){
            url = 'http://localhost:9000/refund/customerRefund/getRefundByStatus?refundStatus=approved';
        }else{
            url = 'http://localhost:9000/refund/customerRefund/getRefundByStatus?refundStatus=rejected';
        }*/

        axios.get(url).then(res=>{
            setRefundData(res.data);
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })

    }

    const columns = [
        { columnId: 'orderId', label: 'Order Id', minWidth: 70, align: 'center' },
        { columnId: 'item', label: 'Purchased Item', minWidth: 180, align: 'center' },
        { columnId: 'reason', label: 'Reason', minWidth: 200, align: 'center' },
        { columnId: 'quantity', label: 'Item Quantity', minWidth: 120, align: 'center' },
        { columnId: 'totalPrice', label: 'Price', minWidth: 100, align: 'center' },
        { columnId: 'date', label: 'Date', minWidth: 170, align: 'center' },
        { columnId: 'status', label: 'Status', minWidth: 100, align: 'center' },
    ];

    const mappedData = refundData.map(customerRefund => ({
        ...customerRefund
    }));

    useEffect(() => {
        getAllCustomerRefundData()
    }, []);

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

                    <div className="customerRefundInstructions">
                        <div className="customerRefundInstructionsTopic">
                            <h3>Our Policies</h3>
                        </div>
                        <div className="customerRefundInstructionsParagraph">
                            <p>
                                At Tradeasy, we strive to ensure your complete satisfaction with every purchase.
                                Our 30-day return policy allows you to return unused and unopened products within 30 days of delivery for a full refund or exchange.
                                Should you receive a defective or damaged item, please contact us within 48 hours for prompt assistance.
                                While customers are responsible for return shipping costs, we expedite refunds to the original payment method upon receipt of returned items.
                                Certain non-refundable or specialized products may be subject to restocking fees. Rest assured, your satisfaction is our priority, and we are always available to address any questions or concerns regarding our policies
                            </p>
                        </div>
                    </div>

                    <div className="customerRefundTable">
                       <CustomizedTable
                           columns={columns}
                           rows={mappedData}
                       />
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CustomerRefunds;