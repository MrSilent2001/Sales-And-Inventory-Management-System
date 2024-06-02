import "./customerDashboard.css";
import * as React from 'react';
import Searchbar from "../../../components/search bar/search bar";
import Footer from "../../../layout/footer/footer";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DialogBox from "../../../components/Dialog Box/DialogBox";
import DynamicTable from "../../../components/Table/customizedTable2";

function CustomerDashboard() {
    const [customer, setCustomer] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

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

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSendWarning = async(id) => {
        console.log("Please Login to the system", id);
        try {
            const customer = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of customers after deletion
            const response = await axios.post('http://localhost:9000/email/send/customerWarning',{
                receiverName: customer.data.username,
                emailSubject: "Account Termination Warning!",
                emailBody: "It is monitored that you have not been logged into your account for a while. Please signed-in or otherwise the account will be terminated without any prior notice.",
                receiverEmail: customer.data.email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error deleting customer:', error);
            handleClickError();
        }
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/customer/getAllCustomers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomer(response.data);
                console.log(response.data)
            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomers();
    }, [token]);

    const handleRemove = async (id) => {
        setSelectedCustomerId(id);
        setOpenDialog(true);
    }

    const handleAgree = async() => {
        try {
            const customer = await axios.get(`http://localhost:9000/customer/findCustomer/${selectedCustomerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of customers after deletion
            const email = await axios.post('http://localhost:9000/email/send/customerTermination',{
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

            await axios.delete(`http://localhost:9000/customer/delete/${selectedCustomerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of customers after deletion
            const response = await axios.get('http://localhost:9000/customer/getAllCustomers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomer(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error deleting customer:', error);
            handleClickError();
        }finally {
            handleDialogClose();
        }
    };

    const handleDisagree = () => {
        handleDialogClose();
    };

    const isDateMoreThanMonthsAgo = (date, months) => {
        const givenDate = new Date(date);
        const currentDate = new Date();
        const monthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - months));
        return givenDate < monthsAgo;
    }

    const isDateMoreThanYearsAgo = (date, years) => {
        const givenDate = new Date(date);
        const currentDate = new Date();
        const yearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - years));
        return givenDate < yearsAgo;
    }

    let rows = customer;

    const createActions = (id, lastLogin) => {
        const enableWarning = isDateMoreThanMonthsAgo(lastLogin, 6);
        const enableRemove = isDateMoreThanYearsAgo(lastLogin, 1);

        const buttonStyle = (enabled, defaultColor, hoverColor) => ({
            color: enabled ? '#ffffff' : '#a9a9a9',
            backgroundColor: enabled ? defaultColor : '#d3d3d3',
            border: enabled ? `1px solid ${defaultColor}` : '1px solid #d3d3d3',
            width: '8.5em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            marginTop: '0.625em',
            marginRight: '1.5em',
            cursor: enabled ? 'pointer' : 'not-allowed',
        });

        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CustomizedButton
                    key={`sendWarning-${id}`}
                    onClick={() => handleSendWarning(id)}
                    hoverBackgroundColor="#2d3ed2"
                    disabled={!enableWarning}
                    style={buttonStyle(enableWarning, '#242F9B', '#2d3ed2')}
                >
                    Send Warning
                </CustomizedButton>

                <CustomizedButton
                    key={`remove-${id}`}
                    onClick={() => handleRemove(id)}
                    hoverBackgroundColor="#f11717"
                    disabled={!enableRemove}
                    style={buttonStyle(enableRemove, '#960505', '#f11717')}
                >
                    Remove
                </CustomizedButton>
            </div>
        );
    };

    rows = rows.map(row => ({
        ...row,
        actions: createActions(row.id, row.lastLogin)
    }));

    const searchCustomers = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:9000/customer/search?keyword=${query}`);
            setCustomer(response.data);
        } catch (error) {
            handleClickError();
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SalesNavbar />
            <div className="CustomerManagementOuter">
                <div className="CustomerManagementInner">

                    <div className="customerManagementTitleWithButton">

                        <h2 className="customerManagement-title">Customers</h2>

                        <div className="CustomerManagementBtnWithSearchbar">
                            <Searchbar
                                label="Search Customers"
                                onKeyPress={searchCustomers}
                            />
                        </div>

                    </div>

                    <div className="CustomerManagement">
                        {/*{isLoading ? (*/}
                        {/*    <PageLoader />*/}
                        {/*) : (*/}
                        {/*    <CustomizedTable*/}
                        {/*        columns={columns}*/}
                        {/*        rows={rows}*/}
                        {/*        style={{ width: '85%' }}*/}
                        {/*    />*/}
                        {/*)}*/}
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                        <DynamicTable
                            columns={columns}
                            data={customer}
                            createActions={createActions}
                            includeProfile={true}
                        />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Warning sent Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />

            <DialogBox
                open={openDialog}
                onClose={handleDialogClose}
                title="Customer Account Termination"
                content="Are you really want to terminate this customer?"
                onAgree={handleAgree}
                onDisagree={handleDisagree}
            />
        </>
    );
}

export default CustomerDashboard;
