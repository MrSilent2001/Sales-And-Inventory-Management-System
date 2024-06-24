import React, {useEffect, useMemo, useState} from 'react';
import "./discountDashboard.css";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";
import AddDiscount from "./Modal/Add Discount/addDiscounts";
import { Modal } from "@mui/material";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";


function DiscountDashboard() {
    const [visible, setVisible] = useState(false);
    const [discount, setDiscount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const columns = useMemo(() => [
        { accessorKey: 'productId', header: 'Product Id', size: 20, align: 'center' },
        { accessorKey: 'productName', header: 'Product Name', size: 120, align: 'center' },
        { accessorKey: 'sellingPrice', header: 'Selling Price(₹)', size: 50, align: 'center' },
        { accessorKey: 'discountRate', header: 'Discount(%)', size: 20, align: 'center' },
        { accessorKey: 'startDate', header: 'Start Date', size: 75, align: 'center' },
        { accessorKey: 'endDate', header: 'End Date', size: 75, align: 'center' }
    ], []);


    const handleClickSuccess = () => setOpenSuccess(true);
    const handleClickError = () => setOpenError(true);
    const handleCloseSuccess = () => setOpenSuccess(false);
    const handleCloseError = () => setOpenError(false);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSearchDiscounts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/discounts/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiscount(response.data);
            } catch (error) {
                handleClickError();
                console.error('Error fetching discounts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearchDiscounts();
    }, [token]);

    const handleButtonClick = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/discounts/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const response = await axios.get('http://localhost:9000/discounts/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDiscount(response.data);
            handleClickSuccess();
        } catch (error) {
            console.error('Error canceling discount:', error);
        }
    };

    const createCancelButton = (id) => {
        const buttonStyle = {
            color: '#ffffff',
            backgroundColor: '#960505',
            width: '7.5em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.625em',
            fontWeight: '550',
            border: 'none',
            marginTop: '0.625em',
            cursor: 'pointer',
        };

        return (
            <CustomizedButton
                onClick={() => handleButtonClick(id)}
                hoverBackgroundColor="#f11717"
                style={buttonStyle}
            >
                Cancel
            </CustomizedButton>
        );
    };

    const createAddDiscountButton = () => {
        const buttonStyle = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '9.5em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
        };

        return (
            <CustomizedButton
                onClick={() => setVisible(true)}
                hoverBackgroundColor="#2d3ed2"
                style={buttonStyle}
            >
                Add Discount
            </CustomizedButton>
        );
    };


    const handleDiscountAdded = (updatedDiscounts) => setDiscount(updatedDiscounts);

    const fetchDiscounts = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:9000/discounts/search?keyword=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDiscount(response.data);
        } catch (error) {
            handleClickError();
            console.error('Error fetching discounts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const rows = discount.map((row) => ({
        ...row,
        actions: createCancelButton(row.id),
    }));

    return (
        <>
            <SalesNavbar />
            <div className="discountDashboardOuter">
                <div className="discountDashboardInner">
                    <div className="searchContainer">
                        <h3>Discounts</h3>
                    </div>
                    <div className="discount-dashboard">
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={discount}
                                createActions={createCancelButton}
                                renderToolbarItems={createAddDiscountButton}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            <Modal open={visible} onClose={() => setVisible(false)}>
                <AddDiscount onClose={() => setVisible(false)} onDiscountAdded={handleDiscountAdded} />
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
