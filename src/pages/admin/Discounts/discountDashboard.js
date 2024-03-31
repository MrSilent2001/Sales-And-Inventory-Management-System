import "./discountDashboard.css";
import * as React from 'react';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../layout/footer/footer";
import Searchbar from "../../../components/search bar/search bar";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import AddDiscounts from "./Modal/Add Discount/addDiscounts";
import { useState } from "react";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import discountDetails from "../../../data/data.json";

const columns = [
    { id: 'id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
    { id: 'discount', label: 'Discount', minWidth: 170, align: 'center' },
    { id: 'price', label: 'Selling Price (\u20A8.)', minWidth: 170, align: 'center' },
    { id: 'actions', label: '', minWidth: 170, align: 'center' },
];

const handleButtonClick = () => {
    alert("Discount Has been Closed");
};

let rows = discountDetails.discountDetails || [];

rows = rows.map(row => ({ ...row, actions: createCancelButton(handleButtonClick) }));

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
                fontFamily: 'inter',
                padding: '0.5em 0.625em',
                borderRadius: '0.625em',
                fontWeight: '550',
                border: 'none',
                marginTop: '0.625em',
                textTransform: 'none',
                textAlign: 'center',
            }}>
            Cancel
        </CustomizedButton>
    );
}

function DiscountDashboard() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <SalesNavbar />
            <div className="discountDashboardOuter">
                <div className="discountDashboardInner">
                    <div className="discountTitleWithSearchbar">
                        <h2 className="discountTitle">Discounted Items</h2>
                        <Link to="/AddDiscount">
                            <Searchbar />
                        </Link>
                    </div>
                    <div className="discount-dashboard">
                        <CustomizedTable
                            style={{width: '100%'}}
                            columns={columns}
                            rows={rows}
                        />
                    </div>
                </div>
                <Modal open={visible}>
                    <AddDiscounts onClose={(value) => { setVisible(false) }}></AddDiscounts>
                </Modal>
            </div>
            <Footer />
        </>
    );
}

export default DiscountDashboard;
