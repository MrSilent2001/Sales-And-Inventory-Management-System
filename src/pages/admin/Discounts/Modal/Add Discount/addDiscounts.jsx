import React, { forwardRef, useState } from "react";
import "./addDiscounts.css";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FormControl from "@mui/material/FormControl";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";
import dayjs from "dayjs";

const AddDiscount = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        sellingPrice: '',
        discountRate: '',
        startDate: '',
        endDate: ''
    });

    const [errors, setErrors] = useState();

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
        if(Object.keys(validationErrors).length === 0){
            try {
                await axios.post('http://localhost:9000/discounts/create', {
                    productId: formData.productId,
                    productName: formData.productName,
                    sellingPrice: formData.sellingPrice,
                    discountRate: formData.discountRate,
                    startDate: formData.startDate,
                    endDate: formData.endDate
                });

                const response = await axios.get('http://localhost:9000/discounts/getAll',  {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                const updatedDiscounts = response.data;

                props.onDiscountAdded(updatedDiscounts);
                handleClickSuccess();
                props.onClose(false);
            } catch (error) {
                console.error('Error applying discount:', error);
                handleClickError();
            }
        }else{
            console.log("error");
        }


    };

    return (
        <CenteredModal>
            <FormControl onSubmit={handleSubmit}>
                <div className="addDiscountsOuter">
                    <div className="addDiscountsModel">
                        <h2>Add Discounts</h2>
                        <div className="addDiscountsForm">
                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Product Id:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="productId"
                                        size="small"
                                        type="text"
                                        onChange={(e) => handleChange("productId", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.productId && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.productName}</span>}


                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Product Name:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        name="productName"
                                        size="small"
                                        type="text"
                                        onChange={(e) => handleChange("productName", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.productName && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.productName}</span>}


                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Selling Price:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="sellingPrice"
                                        size="small"
                                        type="number"
                                        onChange={(e) => handleChange("sellingPrice", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.sellingPrice && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.sellingPrice}</span>}


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
                            {errors.discountRate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Start Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker
                                        name="startDate"
                                        slotProps={{ textField: { size: 'small' } }}
                                        required
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            console.log(formattedDate);
                                            handleChange("startDate",formattedDate);
                                        }}
                                    />
                                </div>
                            </div>
                            {errors.startDate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>End Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker
                                        name="endDate"
                                        slotProps={{ textField: { size: 'small' }}}
                                        required
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            console.log(formattedDate);
                                            handleChange("endDate",formattedDate);
                                        }}
                                    />
                                </div>
                            </div>
                            {errors.endDate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}


                            <div className="addDiscountsFormFieldButtons">
                                <div className="addDiscountsButton">
                                    <CustomizedButton
                                        onClick={handleSubmit}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '8em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            margin:'0.625em 1.5em 0 2.5em',
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
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            margin:'0.625em 0 0 2.5em'
                                        }}>
                                        Cancel
                                    </CustomizedButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormControl>
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Supplier Added Successfully!"
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
