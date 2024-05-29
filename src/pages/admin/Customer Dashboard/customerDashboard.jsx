import "./customerDashboard.css";
import * as React from 'react';
import Searchbar from "../../../components/search bar/search bar";
import Footer from "../../../layout/footer/footer";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import {useEffect, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";

const columns = [
    {id: 'id', label: 'Customer Id', minWidth: 100, align: 'center'},
    {id: 'username', label: 'Name', minWidth: 150, align: 'center'},
    {id: 'email', label: 'Email', minWidth: 120, align: 'center'},
    {id: 'contactNo', label: 'Contact', minWidth: 120, align: 'center'},
    {id: 'address', label: 'Address', minWidth: 200, align: 'center'},
    {id: 'lastLogin', label: 'Last Login', minWidth: 150, align: 'center'},
    {id: 'actions', label: '', minWidth: 170, align: 'center'},
];

function CustomerDashboard() {
    const [customer, setCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

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

    const handleSendWarning = (id) => {
        console.log("Please Login to the system");
    }

    const token = localStorage.getItem('accessToken');

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
                console.log(customer)
            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomers();
    }, [token]);


    const handleRemove = async(id) => {
        try {
            await axios.delete(`http://localhost:9000/customer/delete/${id}`, {
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
        }
    }


    let rows = customer;

    const createActions = (id) => ({
        sendWarningButton:
            <CustomizedButton
                onClick={() => handleSendWarning(id)}
                hoverBackgroundColor="#2d3ed2"
                style={{
                    color: '#ffffff',
                    backgroundColor: '#242F9B',
                    border: '1px solid #242F9B',
                    width: '11em',
                    height: '2.5em',
                    fontSize: '0.95em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '550',
                    marginTop: '0.625em',
                    marginRight: '1.5em',
                }}>
                Send Warning
            </CustomizedButton>,
        removeButton:
            <CustomizedButton
                onClick={() => handleRemove(id)}
                hoverBackgroundColor="#f11717"
                style={{
                    color: '#ffffff',
                    backgroundColor: '#960505',
                    width: '11em',
                    height: '2.5em',
                    fontSize: '0.95em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '550',
                    marginTop: '0.625em',
                    marginRight: '1.5em',
                }}>
                Remove
            </CustomizedButton>,
    });

    rows = rows.map(row => ({...row, actions: createActions(row.id)}));

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
            <SalesNavbar/>
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
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <CustomizedTable
                                columns={columns}
                                rows={rows}
                                style={{ width: '85%' }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Customer Removed Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>

    );
}

export default CustomerDashboard;
