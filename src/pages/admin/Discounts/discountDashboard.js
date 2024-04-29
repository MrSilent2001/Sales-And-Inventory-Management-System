import "./discountDashboard.css";
import * as React from 'react';
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../layout/footer/footer";
import { useEffect, useState } from "react";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import AddDiscount from "./Modal/Add Discount/addDiscounts";
import { Modal } from "@mui/material";
import CustomizedAlert from "../../../components/Alert/alert";
import SearchBar from "../../../components/search bar/search bar";

const columns = [
    { id: 'id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'productName', label: 'Product Name', minWidth: 100, align: 'center' },
    { id: 'sellingPrice', label: 'Selling Price(\u20A8.)', minWidth: 170, align: 'center' },
    { id: 'discountRate', label: 'Discount(%)', minWidth: 170, align: 'center' },
    { id: 'actions', label: '', minWidth: 170, align: 'center' },
];

function DiscountDashboard() {
    const [visible, setVisible] = useState(false);
    const [discount, setDiscount] = useState([]);

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

    useEffect(() => {
        const fetchSearchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/discounts/getAll');
                setDiscount(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            }
        };
        fetchSearchDiscounts();
    }, []);

    let rows = discount;

    const handleButtonClick = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/discounts/delete/${id}`);

            // Fetching the updated list of discounts after deletion
            const response = await axios.get('http://localhost:9000/discounts/getAll');
            setDiscount(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error canceling discount:', error);
        }
    };

    const createCancelButton = (id) => {
        return (
            <CustomizedButton
                onClick={() => handleButtonClick(id)}
                hoverBackgroundColor="#f11717"
                style={{
                    color: '#ffffff',
                    backgroundColor: '#960505',
                    width: '8.5em',
                    height: '2.5em',
                    fontSize: '0.8em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.625em',
                    fontWeight: '550',
                    border: 'none',
                    marginTop: '0.625em',
                }}>
                Cancel
            </CustomizedButton>
        );
    };

    rows = rows.map(row => ({ ...row, actions: createCancelButton(row.id) }));

    const handleDiscountAdded = (updatedDiscounts) => {
        setDiscount(updatedDiscounts);
    };

    // Fetch discounts function with query parameter
    const fetchDiscounts = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/discounts/search?keyword=${query}`);
            setDiscount(response.data);
        } catch (error) {
            handleClickError();
            console.error('Error fetching discounts:', error);
        }
    };



    return (
        <>
            <SalesNavbar />
            <div className="discountDashboardOuter">
                <div className="discountDashboardInner">
                    <div className="discountTitleWithSearchbar">
                        <SearchBar
                            label="Search Products"
                            onKeyPress={fetchDiscounts}
                        />
                        <CustomizedButton
                            onClick={() => setVisible(true)}
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
                            style={{ width: '100%' }}
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

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Discount Canceled Successfully!"
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

export default DiscountDashboard;
