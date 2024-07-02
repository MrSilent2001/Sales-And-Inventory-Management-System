import React, { useEffect, useState } from 'react';
import "./supplierRefunds.css";
import Footer from "../../../layout/footer/footer";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import ComboBox from "../../../components/Form Inputs/comboBox";

const columns = [
    { accessorKey: 'email', header: 'Email', size: 75 },
    { accessorKey: 'contactNo', header: 'Contact', size: 75 },
    { accessorKey: 'item', header: 'Purchased Products', size: 75 },
    { accessorKey: 'price', header: 'Bill Amount', size: 75 },
    { accessorKey: 'reason', header: 'Reason', size: 75 },
    { accessorKey: 'createdDate', header: 'Ordered Date', size: 75 },
    { accessorKey: 'status', header: 'Refund Status', size: 100 }
];

function SupplierRefunds() {
    const [refunds, setRefunds] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    useEffect(() => {
        const fetchRefunds = async () => {
            setIsLoading(true);
            try {
                const supplierResponse = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const refundResponse = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredRefunds = refundResponse.data.filter(refund => String(refund.supplierId) === String(id));
                setRefunds(filteredRefunds);
                setStatuses(filteredRefunds.map(refund => refund.status));
            } catch (error) {
                setOpenError(true);
                console.error('Error fetching refunds:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRefunds();
    }, [token, id]);

    const handleStatusChange = async (event, refundId, index) => {
        const newStatus = event.target.value;
        const newStatuses = [...statuses];
        newStatuses[index] = newStatus;
        setStatuses(newStatuses);

        try {
            await axios.put(`http://localhost:9000/refund/inventoryRefund/update/${refundId}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRefunds(prevRefunds =>
                prevRefunds.map(refund =>
                    refund.id === refundId ? { ...refund, status: newStatus } : refund
                )
            );

            const refund = refunds.find(refund => refund.id === refundId);
            await axios.post('http://localhost:9000/email/send/inventoryRefundStatus', {
                receiverName: "Tradeasy Pvt Ltd",
                emailSubject: "Refund Request Status Update!",
                emailBody: `Your refund request under the Request Id: ${refundId} has been ${newStatus}. Thank You!`,
                receiverEmail: 'tradeasy.official01@gmail.com'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpenSuccess(true);
        } catch (error) {
            setOpenError(true);
            console.error('Error updating refund status:', error);
        }
    };

    const options = [
        { value: 'Pending', label: 'Pending', backgroundColor: 'orange' },
        { value: 'Accepted', label: 'Accepted', backgroundColor: 'blue' },
        { value: 'Rejected', label: 'Rejected', backgroundColor: 'red' }
    ];

    const mappedData = refunds.map((refund, index) => ({
        ...refund,
        status: (
            <ComboBox
                value={statuses[index]}
                onChange={(event) => handleStatusChange(event, refund.id, index)}
                style={{ width: '10em' }}
                options={options}
                label="Status"
                size="small"
                defaultValue={refund.status}
            />
        )
    }));

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
                                data={mappedData}
                                initialShowGlobalFilter={true}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <CustomizedAlert
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                severity="success"
                message="Refund status updated successfully!"
            />
            <CustomizedAlert
                open={openError}
                onClose={() => setOpenError(false)}
                severity="error"
                message="Error updating refund status."
            />
        </>
    );
}

export default SupplierRefunds;

