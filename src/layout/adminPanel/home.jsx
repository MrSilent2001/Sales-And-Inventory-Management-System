import React, {useEffect, useState} from 'react'
import './adminPanel.css';
import
{BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
    from 'react-icons/bs'
import
{BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line}
    from 'recharts';
import axios from "axios";
import {parseISO, format} from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [no0fCustomers, setNoOfCustomers] = useState(0);
    const [no0fRefunds, setNoOfRefunds] = useState(0);
    const [no0fOrders, setNoOfOrders] = useState(0);
    const [no0fProducts, setNoOfProducts] = useState(0);

    const [dailySale, setDailySale] = useState(0);
    const [monthlySale, setMonthlySale] = useState(0);
    const [stockLevel, setStockLevel] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    const token = localStorage.getItem('accessToken');

    const Items = async () => {
        try {
            const response = await axios.get('http://localhost:9000/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDailySale(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const sale = async () => {
        try {
            const response = await axios.get('http://localhost:9000/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMonthlySale(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const stock = async () => {
        try {
            const response = await axios.get('http://localhost:9000/product/getAllProducts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const formattedData = response.data.map(item => ({
                name: item.productName,
                qty: item.productQuantity
            }));
            setStockLevel(formattedData);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const revenue = async () => {
        try {
            const response = await axios.get('http://localhost:9000/payment/customerPayment/getAllCustomerPayments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const rawData = response.data;

            const aggregatedData = rawData.reduce((acc, item) => {
                const date = parseISO(item.date);
                const month = format(date, 'yyyy-MM');

                if (!acc[month]) {
                    acc[month] = 0;
                }

                acc[month] += parseFloat(item.totalAmount);

                return acc;
            }, {});

            const formattedData = Object.keys(aggregatedData).map((month) => {
                const date = new Date(`${month}-01`);
                const formattedMonth = format(date, 'MMM yyyy');
                return {
                    month: formattedMonth,
                    totalAmount: aggregatedData[month],
                };
            });

            setMonthlyRevenue(formattedData);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const customers = async () => {
        try {
            const response = await axios.get('http://localhost:9000/customer/activeCustomers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setNoOfCustomers(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const refunds = async () => {
        try {
            const response = await axios.get('http://localhost:9000/refund/customerRefundCount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNoOfRefunds(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const salesOrders = async () => {
        try {
            const response = await axios.get('http://localhost:9000/order/getOrdersCount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNoOfOrders(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const products = async () => {
        try {
            const response = await axios.get('http://localhost:9000/product/getProductsCount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNoOfProducts(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    useEffect(() => {
        customers();
        refunds();
        salesOrders();
        products();
        Items();
        sale();
        stock();
        revenue();
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='admin-panel-card' onClick={() => handleNavigation('/viewInventory')}>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{no0fProducts}</h1>
                </div>

                <div className='admin-panel-card' onClick={() => handleNavigation('/pendingOrders')}>
                    <div className='card-inner'>
                        <h3>SALES ORDERS</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{no0fOrders}</h1>
                </div>

                <div className='admin-panel-card' onClick={() => handleNavigation('/customerdashboard')}>
                    <div className='card-inner'>
                        <h3>ACTIVE CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{no0fCustomers}</h1>
                </div>

                <div className='admin-panel-card' onClick={() => handleNavigation('/viewRefundRequests')}>
                    <div className='card-inner'>
                        <h3>REFUND REQUEST</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>{no0fRefunds}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    {/*Stock level of Items*/}
                    <BarChart
                        data={stockLevel}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" scale="point" padding={{left: 50, right: 50}} interval={0} angle={-15} textAnchor="end" tick={{ fontSize: 12 }}/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="qty" fill="#8884d8" barSize={30}/>
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    {/*Monthly Income*/}
                    <LineChart
                        width={500}
                        height={300}
                        data={monthlyRevenue}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 3"/>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="totalAmount" stroke="#82ca9d"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default Home