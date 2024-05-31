import React, {useEffect, useState} from 'react'
import './adminPanel.css';
import
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
    from 'react-icons/bs'
import
{ BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import axios from "axios";

function Home() {
    const [no0fCustomers, setNoOfCustomers] = useState(0);
    const [no0fRefunds, setNoOfRefunds] = useState(0);
    const [no0fCategories, setNoOfCategories] = useState(0);
    const [no0fProducts, setNoOfProducts] = useState(0);

    const [dailySale, setDailySale] = useState(0);
    const [monthlySale, setMonthlySale] = useState(0);
    const [stockLevel, setStockLevel] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    const data = [
        {
        }
    ];

    const token = localStorage.getItem('accessToken');

    const Items = async() =>{
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

    const sale = async() =>{
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

    const stock = async() =>{
        try {
            const response = await axios.get('http://localhost:9000/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStockLevel(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const revenue = async() =>{
        try {
            const response = await axios.get('http://localhost:9000/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMonthlyRevenue(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const customers = async() =>{
        try {
            const response = await axios.get('http://localhost:9000/customer/activeCustomers',{
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

    const refunds = async() =>{
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

    const categories = async() =>{
        try {
            const response = await axios.get('http://localhost:9000/product/getProductsCategoryCount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNoOfCategories(response.data);
        } catch (error) {
            console.error('Error fetching Payment data:', error);
        }
    }

    const products = async() =>{
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
        categories();
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
                <div className='admin-panel-card'>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{no0fProducts}</h1>
                </div>
                <div className='admin-panel-card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{no0fCategories}</h1>
                </div>
                <div className='admin-panel-card'>
                    <div className='card-inner'>
                        <h3>ACTIVE CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{no0fCustomers}</h1>
                </div>
                <div className='admin-panel-card'>
                    <div className='card-inner'>
                        <h3>REFUND REQUEST</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>{no0fRefunds}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    {/*Daily sale of Items*/}
                    <BarChart
                        width={500}
                        height={300}
                        data={dailySale}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Item" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    {/*Monthly Sale*/}
                    <LineChart
                        width={500}
                        height={300}
                        data={monthlySale}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="month" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    {/*Stock level of Items*/}
                    <BarChart
                        width={500}
                        height={300}
                        data={stockLevel}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Item" fill="#82ca9d" />
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Month" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default Home