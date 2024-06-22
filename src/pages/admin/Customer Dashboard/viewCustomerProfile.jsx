import './viewCustomerProfile.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import {useNavigate, useParams} from 'react-router-dom';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import {useEffect, useState} from "react";
import axios from "axios";

function ViewCustomerProfile() {
    const [customer, setCustomer] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomer(response.data);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchCustomers();
    }, [token]);

    const handleNavigate = () =>{
        navigate(`/orderHistory/${customer.id}`);
    }
    return (
        <>
            <SalesNavbar/>
            <div className="CustomerOrderProfileOuter">
                <div className="CustomerOrderProfileInner">
                    <div className="CustomerOrderProfile">
                        <div className="profileAvatar">
                            <Avatar src={customer.profilePicture}
                                    sx={{width: 275, height: 275, border: 2, borderRadius: 50, marginTop: '-0.8em'}}
                            />
                            <h2>{customer.username}</h2>
                        </div>
                    </div>

                    <div className="CustomerOrderProfileForm">
                        <form>
                            <div className="CustomerOrderProfileFormField" style={{marginTop: '3em'}}>
                                <div className="CustomerOrderProfileField">
                                    <span className="title">Customer Id:</span>
                                </div>
                                <div className="CustomerOrderProfileInput">
                                    <span>{customer.id}</span>
                                </div>
                            </div>

                            <div className="CustomerOrderProfileFormField">
                                <div className="CustomerOrderProfileField">
                                    <span className="title">Address:</span>
                                </div>
                                <div className="CustomerOrderProfileInput">
                                    <span>{customer.address}</span>
                                </div>
                            </div>

                            <div className="CustomerOrderProfileFormField">
                                <div className="CustomerOrderProfileField">
                                    <span className="title">E-mail:</span>
                                </div>
                                <div className="CustomerOrderProfileInput">
                                    <span>{customer.email}</span>
                                </div>
                            </div>

                            <div className="CustomerOrderProfileFormField">
                                <div className="CustomerOrderProfileField">
                                    <span className="title">Contact No:</span>
                                </div>
                                <div className="CustomerOrderProfileInput">
                                    <span>{customer.contactNo}</span>
                                </div>
                            </div>

                            <div className="CustomerOrderProfileFormField">
                                <div className="CustomerOrderProfileField">
                                    <span className="title">Last Login:</span>
                                </div>
                                <div className="CustomerOrderProfileInput">
                                    <span>{customer.lastLogin}</span>
                                </div>
                            </div>

                            <div className="CustomerOrderProfileButtonField">
                                <div className="CustomerOrderProfileButtons">
                                    <CustomizedButton
                                        onClick={handleNavigate}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '9em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            marginTop: '0.625em',
                                            marginRight: '2.5em',
                                        }}>
                                        View Orders
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ViewCustomerProfile;