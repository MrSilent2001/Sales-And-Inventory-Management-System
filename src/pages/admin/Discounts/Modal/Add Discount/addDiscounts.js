import React, {useState} from "react";
import "./addDiscounts.css";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FormControl from "@mui/material/FormControl";

function AddDiscount(props) {
    const [productName, setProductName] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [discountRate, setDiscountRate] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        console.log("Success message should be displayed.");
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        console.log("Success message should be closed.");
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:9000/discounts/create', {
                productName: productName,
                sellingPrice: sellingPrice,
                discountRate: discountRate
            });

            // Fetch the updated list of suppliers
            const response = await axios.get('http://localhost:9000/discounts/getAll');
            const updatedDiscounts = response.data;

            // Update the state of suppliers in the ViewSupplier component
            props.onDiscountAdded(updatedDiscounts);

            console.log('Discount applied successfully');
            handleClickSuccess();

            // Close the modal
            props.onClose(false);
        } catch (error) {
            console.error('Error applying discount:', error);
            handleClickError();
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
                                        size="small"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Selling Price:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        value={sellingPrice}
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="addDiscountsFormField">
                                <div className="addDiscountsLabelField">
                                    <h5>Discount Rate:</h5>
                                </div>
                                <div className="addDiscountsInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        value={discountRate}
                                        onChange={(e) => setDiscountRate(e.target.value)}
                                    />
                                </div>
                            </div>

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
}

export default AddDiscount;
