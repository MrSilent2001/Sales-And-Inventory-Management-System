import "./customerDashboard.css";
import * as React from 'react';
import Searchbar from "../../../components/search bar/search bar";
import Footer from "../../../layout/footer/footer";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import customerData from "../../../data/data.json";
import {Paper, TableContainer} from "@mui/material";
import DefaultTable from "../../../components/Table/Default Table/defaultTable";

const columns = [
    {id: 'id', label: 'Id', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Name', minWidth: 100, align: 'center'},
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phone',
        label: 'Contact',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];


const rows = customerData.customerDetails || [];

function CustomerDashboard() {

    const mappedData = rows.map(row => ({
        id: row.id,
        name: row.name,
        address: row.address,
        phone: row.phone,
        email: row.email
    }));

    return (
        <>
            <SalesNavbar/>
            <div className="CustomerManagementOuter">
                <div className="CustomerManagementInner">

                    <div className="customerManagementTitleWithButton">

                        <h2 className="customerManagement-title">Customers</h2>

                        <div className="CustomerManagementBtnWithSearchbar">
                            <Link to="/removeCustomers">
                                <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '12.25em',
                                        height: '2.25em',
                                        fontSize: '0.9em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Inactive Customers
                                </CustomizedButton>
                            </Link>

                            <Searchbar />
                        </div>

                    </div>

                    <div className="CustomerManagement">
                        <TableContainer component={Paper} style={{ maxHeight: 500, width: '75%'}}>
                            <DefaultTable
                                columns={columns}
                                data={mappedData}
                            />
                        </TableContainer>
                    </div>
                    </div>
            </div>

            <Footer/>
        </>

    );
}

export default CustomerDashboard;