import React, { forwardRef, useState } from "react";
import "./addDiscounts.css";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FormControl from "@mui/material/FormControl";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";

const AddDiscount = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        productName: '',
        sellingPrice: '',
        discountRate: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.productName) {
            validationErrors.productName = " *Product Name is required";
        }
        if (!formData.sellingPrice) {
            validationErrors.sellingPrice = " *Selling Price is required";
        }
        if (!formData.discountRate) {
            validationErrors.discountRate = " *Discount Rate is required";
        }

        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            try {
                await axios.post('http://localhost:9000/discounts/create', {
                    productName: formData.productName,
                    sellingPrice: formData.sellingPrice,
                    discountRate: formData.discountRate
                });

                const response = await axios.get('http://localhost:9000/discounts/getAll');
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
                                    <h5>Product Name:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="productName"
                                        size="small"
                                        type="text"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {errors.discountRate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Start Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker slotProps={{ textField: { size: 'small' } }} required/>
                                </div>
                            </div>
                            {errors.discountRate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>End Date: </h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <CustomDatePicker slotProps={{ textField: { size: 'small' }}} required/>
                                </div>
                            </div>
                            {errors.discountRate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.discountRate}</span>}


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
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight: '1.5em',
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
                                            fontWeight: '500',
                                            marginTop: '0.625em',
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
