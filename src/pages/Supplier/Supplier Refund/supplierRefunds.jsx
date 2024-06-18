import React, { useEffect, useMemo, useState } from 'react';
import "./supplierRefunds.css";
import axios from 'axios';
import SupplierNavbar from '../../../layout/navbar/Supplier Navbar/Supplier Navbar';
import DynamicTable from '../../../components/Table/customizedTable2';
import PageLoader from '../../../components/Page Loader/pageLoader';
import ComboBox from '../../../components/Form Inputs/comboBox';
import Footer from '../../../layout/footer/footer';

function SupplierRefunds() {
    const [refunds, setRefunds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('accessToken');

    const columns = useMemo(
        () => [
            { accessorKey: 'customerName', header: 'Name', size: 75 },
            { accessorKey: 'email', header: 'Email', size: 75 },
            { accessorKey: 'contactNo', header: 'Contact', size: 75 },
            { accessorKey: 'item', header: 'Purchased Products', size: 75 },
            { accessorKey: 'price', header: 'Bill Amount', size: 75 },
            { accessorKey: 'reason', header: 'Reason', size: 75 },
            { accessorKey: 'createdDate', header: 'Ordered Date', size: 75 },
        ],
        []
    );

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' },
    ];

    useEffect(() => {
        const fetchRefunds = async () => {
            setIsLoading(true);
            try {
                // Fetch supplier details
                const supplierResponse = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch all refunds and filter based on supplier ID
                const refundResponse = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredRefunds = refundResponse.data.filter(refund => refund.supplierId === id);
                setRefunds(filteredRefunds);
            } catch (error) {
                console.error('Error fetching refunds:', error);
                setOpenError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRefunds();
    }, [id, token]);

    const handleStatusChange = async (eventId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:9000/refund/inventoryRefund/update/${refunds[0].inventory_id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update local state with new status
            setRefunds(prevRefunds =>
                prevRefunds.map(refund =>
                    refund.id === eventId ? { ...refund, status: newStatus } : refund
                )
            );

            // Example of sending email on status change
            await axios.post(
                'http://localhost:9000/email/send/inventoryRefundStatus',
                {
                    receiverName: "Tradeasy Pvt Ltd",
                    emailSubject: "Refund Request Status Update!",
                    emailBody: `Your refund request under the Request Id: ${eventId} has been ${newStatus}. Thank You!`,
                    receiverEmail: "dmcoder01@gmail.com"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOpenSuccess(true);
        } catch (error) {
            console.error('Error updating refund status:', error);
            setOpenError(true);
        }
    };

    const createActions = (row,refund) => {
        const refundStatus = refund ? refund.status : 'Pending';
        return (
            <ComboBox
                onChange={(event) => handleStatusChange(event, row?.id)}
                style={{ width: '10em' }}
                options={options}
                label="Status"
                size="small"
                defaultValue={refundStatus}
            />
        );
    };

    return (
        <>
            <SupplierNavbar />
            <div className="supplierRefundManagementOuter">
                <div className="supplierRefundManagementInner">
                    <h2 className="supplierRefundManagement-title">Refunds</h2>
                    <div className="supplierRefundManagement">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={refunds}
                                createActions={createActions}
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

export default SupplierRefunds;
