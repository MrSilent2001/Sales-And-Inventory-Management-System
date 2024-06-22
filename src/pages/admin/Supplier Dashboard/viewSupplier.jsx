import React, {useEffect, useMemo, useState} from "react";
import "./viewSupplier.css";
import { Modal } from "@mui/material";
import AddSupplier from "./Modals/AddSupplier/addSupplier";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DialogBox from "../../../components/Dialog Box/DialogBox";
import DynamicTable from "../../../components/Table/customizedTable2";

function ViewSupplier() {
    const [visible, setVisible] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'Supplier Id', size: 100, align: 'center' },
        // { accessorKey: 'username', header: 'Supplier Name', size: 150, align: 'center' },
        { accessorKey: 'email', header: 'E-mail', size: 120, align: 'center' },
        { accessorKey: 'nic', header: 'NIC', size: 100, align: 'center' },
        // { accessorKey: 'address', header: 'Address', size: 170, align: 'center' },
        { accessorKey: 'contactNo', header: 'Contact No.', size: 100, align: 'center' }
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
    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!token) {
                console.error('No access token found');
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuppliers(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - perhaps the token is invalid or expired');
                } else {
                    console.error('Error fetching suppliers:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleRemove = async (id) => {
        setSelectedSupplierId(id);
        setOpenDialog(true);
    }

    const handleAgree = async() => {
        try {
            const customer = await axios.get(`http://localhost:9000/supplier/getSupplier/${selectedSupplierId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const email = axios.post('http://localhost:9000/email/send/supplierTermination',{
                receiverName: customer.data.username,
                emailSubject: "Account Termination!",
                emailBody: "Your account has been terminated by Tradeasy!",
                receiverEmail: customer.data.email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(email.data);

            await axios.delete(`http://localhost:9000/supplier/delete/${selectedSupplierId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of customers after deletion
            const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuppliers(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error deleting supplier:', error);
            handleClickError();
        }finally {
            handleDialogClose();
        }
    };

    const handleDisagree = () => {
        handleDialogClose();
    };


    // Fetch supplier function with query parameter
    const fetchSuppliersWithQuery = async (query) => {
        try {
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await axios.get(`http://localhost:9000/supplier/search?keyword=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuppliers(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - perhaps the token is invalid or expired');
            } else {
                console.error('Error fetching suppliers:', error);
            }
            handleClickError();
        }
    };

    const createActions = (rowId) => {
        const buttonStyle = {
            backgroundColor: '#960505',
            width: '8em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
        };

        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CustomizedButton
                    key={`delete-${rowId}`}
                    onClick={() => handleRemove(rowId)}
                    hoverBackgroundColor="#f11717"
                    style={buttonStyle}
                >
                    Delete
                </CustomizedButton>
            </div>
        );
    };

    const createAddSupplierButton = () => {
        const buttonStyle = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '9.5em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
        };

        return (
            <CustomizedButton
                onClick={() => setVisible(true)}
                hoverBackgroundColor="#2d3ed2"
                style={buttonStyle}
            >
                Add Supplier
            </CustomizedButton>
        );
    };

    const handleSupplierAdded = (updatedSuppliers) => {
        setSuppliers(updatedSuppliers);
    };

    return (
        <>
            <InventoryNavbar />

            <div className="viewSupplierOuter">
                <div className="viewSupplierInner">
                    <div className="title">
                        <h3>Suppliers</h3>
                    </div>
                    <div className="itemTable" style={{paddingBottom: '2em'}}>

                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={suppliers}
                                createActions={createActions}
                                renderToolbarItems={createAddSupplierButton}
                                includeProfile={true}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Model */}
            <Modal open={visible}>
                <AddSupplier
                    onClose={() => setVisible(false)}
                    onSupplierAdded={handleSupplierAdded}
                />
            </Modal>

            {/* Alerts */}
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Supplier Removed successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something went wrong!"
            />

            <DialogBox
                open={openDialog}
                onClose={handleDialogClose}
                title="Supplier Account Termination"
                content="Are you really want to terminate this Supplier?"
                onAgree={handleAgree}
                onDisagree={handleDisagree}
            />

            <Footer />
        </>
    );
}

export default ViewSupplier;
