import * as React from 'react';
import "./supplierRefunds.css";
import Footer from "../../../layout/footer/footer";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";
import {useNavigate} from "react-router-dom";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import CustomizedButton from "../../../components/Button/button";

function SupplierRefunds() {
    const [refunds, setRefunds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const navigate = useNavigate();

    const columns = useMemo(() => [
        { accessorKey: 'username', header: 'Name', size: 75 },
        { accessorKey: 'email', header: 'Email', size: 75  },
        { accessorKey: 'contactNo', header: 'Contact', size: 75  },
        { accessorKey: 'address', header: 'Address', size: 75  },
        { accessorKey: 'lastLogin', header: 'Last Login', size: 75  }
    ], []);

    const token = localStorage.getItem('accessToken');

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    useEffect(() => {
        const fetchRefunds = async () => {
            setIsLoading(true);
            try {
                const supplierResponse = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const supplierName = supplierResponse.data.username;

                const refundResponse = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Filter orders based on supplier name
                const filteredRefunds = refundResponse.data.filter(refund => refund.supplier === supplierName);
                setRefunds(filteredRefunds);
                console.log(filteredRefunds.data)
            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRefunds();
    }, [token]);

    let rows = refunds;

    const createActionButtons = (id) => {
        return (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => handleUpdate(id)}
                    hoverBackgroundColor="#2d3ed2"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#242F9B',
                        width: '8.5em',
                        height: '2.5em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.625em',
                        fontWeight: '550',
                        border: 'none',
                        margin: '0.625em 2em 0 0'
                    }}>
                    View
                </CustomizedButton>

            </div>
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

export default SupplierRefunds;
