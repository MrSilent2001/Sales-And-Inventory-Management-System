import './view.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import {useNavigate, useParams} from 'react-router-dom';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import {useEffect, useState} from "react";
import axios from "axios";



function View() {
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
            <div className="ViewOrdersOuter">

                <div className="ViewOrdersInner">
                    <div className="customerProfile">

                        <div className="avatar">
                            <Avatar src="/broken-image.jpg" sx={{ 
                                width: 250,
                                 height: 250,
                                  border: 2,
                                   borderRadius: 3 ,
                                   marginLeft:24,
                                   marginBottom:7,
                            
                            
                            }} />
                        </div>



                    </div>

                    <div className="ViewOrdersForm">

                        <div className="formField">
                            <div className="textField">
                                <h4>Customer ID</h4>
                            </div>
                            <div className="inputData">
                                <h5>{customer.id}</h5>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h4>Address</h4>
                            </div>
                            <div className="inputData">
                                <h5>{customer.address}</h5>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h4>E-mail</h4>
                            </div>
                            <div className="inputData">
                                <h5>{customer.email}</h5>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h4>Contact</h4>
                            </div>
                            <div className="inputData">
                                <h5>{customer.contactNo}</h5>
                            </div>
                        </div>

                        <div className="ViewOrdersButtonField">
                            <div className="ViewOrdersButtons">
                                <CustomizedButton
                                    onClick={handleNavigate}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.85em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        marginTop: '0.625em',
                                        marginLeft: '12em'
                                    }}>
                                    View Orders
                                </CustomizedButton>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
        </>
    )
}

export default View;