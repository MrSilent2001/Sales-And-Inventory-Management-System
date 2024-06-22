import React, { forwardRef, useEffect, useState } from "react";
import "./addDiscounts.css";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";
import dayjs from "dayjs";
import ComboBox from "../../../../../components/Form Inputs/comboBox";

const AddDiscount = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        sellingPrice: '',
        discountRate: '',
        startDate: '',
        endDate: ''
    });

    const [errors, setErrors] = useState({});
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState({});

    const handleChange = (name, value) => {
        console.log(`handleChange called with name: ${name}, value: ${value}`);
        if (name === "productId") {
            const selectedProduct = products[value];
            console.log('Selected product:', selectedProduct);
            setFormData(prevState => ({
                ...prevState,
                productId: value,
                productName: selectedProduct ? selectedProduct.productName : '',
                sellingPrice: selectedProduct ? selectedProduct.sellingPrice : ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

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

    const token = localStorage.getItem('accessToken');

    const disablePastDates = (date) => {
        return date < dayjs().startOf('day');
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const productDetails = response.data;
                console.log('Fetched product details:', productDetails);

                const productIds = productDetails.map(product => ({ label: product.id.toString(), value: product.id }));
                setProductIds(productIds);

                // Store products details in state
                const productsMap = productDetails.reduce((acc, product) => {
                    acc[product.id] = {
                        productName: product.productName,
                        sellingPrice: product.productSellingPrice

                    };
                    return acc;
                }, {});
                setProducts(productsMap);
                console.log('Products map:', productsMap);

            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.productId) {
            validationErrors.productId = " *This Field is required";
        }
        if (!formData.productName) {
            validationErrors.productName = " *This Field is required";
        }
        if (!formData.sellingPrice) {
            validationErrors.sellingPrice = " *This Field is required";
        }
        if (!formData.discountRate) {
            validationErrors.discountRate = " *This Field is required";
        }
        if (!formData.startDate) {
            validationErrors.startDate = " *This Field is required";
        }
        if (!formData.endDate) {
            validationErrors.endDate = " *This Field is required";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.post('http://localhost:9000/discounts/create', {
                    productId: formData.productId,
                    productName: formData.productName,
                    sellingPrice: formData.sellingPrice,
                    discountRate: formData.discountRate,
                    startDate: formData.startDate,
                    endDate: formData.endDate
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const response = await axios.get('http://localhost:9000/discounts/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const updatedDiscounts = response.data;

                props.onDiscountAdded(updatedDiscounts);
                handleClickSuccess();
                setTimeout(() => {
                    props.onClose(false);
                }, 1000);
            } catch (error) {
                console.error('Error applying discount:', error);
                handleClickError();
            }
        } else {
            console.log("Validation errors:", validationErrors);
        }
    };

    return (
        <CenteredModal>
            <form onSubmit={handleSubmit}>
                <div className="addDiscountsOuter">
                    <div className="addDiscountsModel">
                        <h2>Add Discounts</h2>
                        <div className="addDiscountsForm">
                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Product Id:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <ComboBox
                                        value={formData.productId}
                                        onChange={(e) => handleChange("productId", e.target.value)}
                                        options={productIds}
                                        style={{width: '17.25em', height: '2em', marginRight: '0.5em'}}
                                        label="Category"
                                        size="small"
                                    />
                                </div>
                            </div>
                            {errors.productId && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.productId}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Product Name:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        disabled={true}
                                        name="productName"
                                        size="small"
                                        type="text"
                                        value={formData.productName}
                                    />
                                </div>
                            </div>
                            {errors.productName && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.productName}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Selling Price:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        disabled={true}
                                        id="outlined-required"
                                        name="sellingPrice"
                                        size="small"
                                        type="number"
                                        value={formData.sellingPrice}
                                    />
                                </div>
                            </div>
                            {errors.sellingPrice && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.sellingPrice}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Discount Rate:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="discountRate"
                                        size="small"
                                        type="number"
                                        onChange={(e) => handleChange("discountRate", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.discountRate && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.discountRate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Start Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker
                                        name="startDate"
                                        slotProps={{textField: {size: 'small'}}}
                                        sx={{
                                            width: '17.5em',
                                            height: '0.15em',
                                            marginRight: '0.5em',
                                            marginTop: '-0.5em'
                                        }}
                                        shouldDisableDate={disablePastDates}
                                        required
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            console.log('Selected start date:', formattedDate);
                                            handleChange("startDate", formattedDate);
                                        }}
                                    />
                                </div>
                            </div>
                            {errors.startDate && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.startDate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>End Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker
                                        name="endDate"
                                        slotProps={{textField: {size: 'small'}}}
                                        sx={{width: '17.5em', height: '0.75em', marginRight: '0.5em', marginBottom: '1em'}}
                                        required
                                        shouldDisableDate={disablePastDates}
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            console.log('Selected end date:', formattedDate);
                                            handleChange("endDate", formattedDate);
                                        }}
                                    />
                                </div>
                            </div>
                            {errors.endDate && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.endDate}</span>}
                        </div>
                        <div className="addDiscountsFormFieldButtons">
                            <div className="addDiscountsButton">
                                <CustomizedButton
                                    type="submit"
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        margin: '0.625em 1.5em 0 2.5em',
                                    }}>
                                    Apply
                                </CustomizedButton>
                            </div>

                            <div className="addDiscountscancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        margin: '0.625em 0 0 2.5em'
                                    }}>
                                    Cancel
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Discount Added Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </CenteredModal>
    );
});

export default AddDiscount;
