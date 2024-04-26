import "./discountDashboard.css";
import * as React from 'react';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../layout/footer/footer";
import Searchbar from "../../../components/search bar/search bar";
import {useEffect, useState} from "react";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import AddDiscount from "./Modal/Add Discount/addDiscounts";
import {Modal} from "@mui/material";

const columns = [
    { id: 'id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'productName', label: 'Product Name', minWidth: 100, align: 'center' },
    { id: 'sellingPrice', label: 'Selling Price(\u20A8.)', minWidth: 170, align: 'center' },
    { id: 'discountRate', label: 'Discount(%)', minWidth: 170, align: 'center' },
    { id: 'actions', label: '', minWidth: 170, align: 'center' },
];

const handleButtonClick = () => {
    alert("Discount Has been Closed");
};

function createCancelButton(handleButtonClick) {
    return (
        <CustomizedButton
            onClick={handleButtonClick}
            hoverBackgroundColor="#f11717"
            style={{
                color: '#ffffff',
                backgroundColor: '#960505',
                width: '8.5em',
                height: '3em',
                fontSize: '0.95em',
                padding: '0.5em 0.625em',
                borderRadius: '0.625em',
                fontWeight: '550',
                border: 'none',
                marginTop: '0.625em',
            }}>
            Cancel
        </CustomizedButton>
    );
}

function DiscountDashboard() {
    const [visible, setVisible] = useState(false);
    const [discount, setDiscount] = useState([]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/discounts/getAll');
                setDiscount(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchDiscounts();
    }, []);

    let rows = discount;

    rows = rows.map(row => ({ ...row, actions: createCancelButton(handleButtonClick) }));

    const handleDiscountAdded = (updatedDiscounts) => {
        setDiscount(updatedDiscounts);
    };

    return (
        <>
            <SalesNavbar />
            <div className="discountDashboardOuter">
                <div className="discountDashboardInner">
                    <div className="discountTitleWithSearchbar">
                        <Searchbar />
                        <CustomizedButton
                            onClick={() => {
                                setVisible(true);
                            }}

                            hoverBackgroundColor="#2d3ed2"
                            style={{
                                backgroundColor: '#242F9B',
                                border: '1px solid #242F9B',
                                width: '9.5em',
                                height: '2.5em',
                                fontSize: '0.75em',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550',
                                marginRight: '1.5em',
                            }}>
                            Add Discount
                        </CustomizedButton>
                    </div>
                    <div className="discount-dashboard">
                        <CustomizedTable
                            style={{width: '100%'}}
                            columns={columns}
                            rows={rows}
                        />
                    </div>
                </div>
            </div>
            <Footer />

            <Modal open={visible}>
                <AddDiscount
                    onClose={() => setVisible(false)}
                    onDiscountAdded={handleDiscountAdded}
                />
            </Modal>
        </>
    );
}

export default DiscountDashboard;
