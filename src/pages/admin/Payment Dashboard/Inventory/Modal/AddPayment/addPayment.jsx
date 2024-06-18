import * as React from 'react';
import './addPayment.css'
import CenteredModal from "../../../../../../components/Modal/modal";
import BasicTextField from "../../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../../components/Button/button";
import FileUpload from "../../../../../../components/Form Inputs/fileUpload";
import {useEffect, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../../../../components/Alert/alert";
import dayjs from "dayjs";
import CustomDatePicker from "../../../../../../components/DatePicker/datePicker";
import FormControl from "@mui/material/FormControl";
import {uploadFileToBlob} from "../../../../../Supplier/Inventory Dashboard/productBlobStorage";
import ComboBox from "../../../../../../components/Form Inputs/comboBox";

function AddPayment(props){
    const [formData, setFormData] = useState({
        supplierId: '',
        supplierName: '',
        date: '',
        itemsPurchased: '',
        billAmount: '',
        receipt: ''
    });

    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('accessToken');
    const [supplierPaymentReceipt, setSupplierPaymentReceipt] = useState(null);
    const [supplierIds, setSupplierIds] = useState([]);
    const [suppliers, setSuppliers] = useState({});

    const handleChange = (name, value) => {
        console.log(`handleChange - ${name}:`, value);
        if (name === 'receipt') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value[0]
            }));
        }else if(name === 'supplierId'){
            const selectedSupplier = suppliers[value];
            setFormData(prevState => ({
                ...prevState,
                supplierId: value,
                supplierName: selectedSupplier ? selectedSupplier.supplierName : ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFileUpload = (file) => {
        setSupplierPaymentReceipt(file);
        setFormData(prevState => ({
            ...prevState,
            receipt: file
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

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            try {
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const supplierDetails = response.data;
                console.log('Fetched supplier details:', supplierDetails);

                const supplierIds = supplierDetails.map(supplier => ({ label: supplier.id.toString(), value: supplier.id }));
                setSupplierIds(supplierIds);

                // Store suppliers details in state
                const supplierMap = supplierDetails.reduce((acc, supplier) => {
                    acc[supplier.id] = {
                        supplierName: supplier.username
                    };
                    return acc;
                }, {});
                setSuppliers(supplierMap);
                console.log('Supplier IDs:', supplierIds);
                console.log('Suppliers map:', supplierMap);

            } catch (error) {
                console.error('Error fetching supplier details:', error);
            }
        };
        fetchSupplierDetails();
    }, [token]);

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        const validationErrors = {};

        if (!formData.supplierId) {
            validationErrors.supplierId = " *This Field is required";
        }
        if (!formData.supplierName) {
            validationErrors.supplierName = " *This Field is required";
        }
        if (!formData.date) {
            validationErrors.date = " *This Field is required";
        }
        if (!formData.itemsPurchased) {
            validationErrors.itemsPurchased = " *This Field is required";
        }
        if (!formData.billAmount) {
            validationErrors.billAmount = " *This Field is required";
        }
        if (!formData.receipt) {
            validationErrors.receipt = " *This Field is required";
        }

        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            try {
                let imageUrl = '';
                if(supplierPaymentReceipt){
                    imageUrl = await uploadFileToBlob(supplierPaymentReceipt);
                }
                await axios.post('http://localhost:9000/payment/supplierPayment/create', {
                    supplierId: formData.supplierId,
                    supplierName: formData.supplierName,
                    date: formData.date,
                    itemsPurchased: formData.itemsPurchased,
                    billAmount: formData.billAmount,
                    receipt: imageUrl
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const response = await axios.get('http://localhost:9000/payment/supplierPayment/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const updatedPayments = response.data;

                props.onPaymentAdded(updatedPayments);
                handleClickSuccess();
                props.onClose(false);
            } catch (error) {
                console.error('Error adding Payment:', error);
                handleClickError();
            }
        }else{
            console.log("error");
        }
    };

    return(
        <CenteredModal>
            <FormControl onSubmit={handleSubmit}>
                <div className="addPaymentOuter">
                    <div className="addPaymentModel">
                        <h2>Add Payment</h2>
                        <div className="addPaymentForm">
                            <div className="form-fields">
                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Supplier Id:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <ComboBox
                                            value={formData.supplierId}
                                            onChange={(e) => handleChange("supplierId", e.target.value)}
                                            options={supplierIds}
                                            style={{width: '17.25em', height: '2em', marginRight: '0.5em'}}
                                            label="Supplier ID"
                                            size="small"
                                        />
                                    </div>
                                </div>
                                {errors.supplierId && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.supplierId}</span>}

                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Supplier Name:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <BasicTextField
                                            name="supplierName"
                                            type="text"
                                            size='small'
                                            value={formData.supplierName}
                                        />
                                    </div>
                                </div>
                                {errors.supplierName && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.supplierName}</span>}

                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Date:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <div className="addSupplierItemInput">
                                            <CustomDatePicker
                                                name="date"
                                                slotProps={{textField: {size: 'small'}}}
                                                sx={{
                                                    width: '17.5em',
                                                    height: '0.75em',
                                                    marginRight: '0.5em',
                                                    marginTop: '-0.5em'
                                                }}
                                                required
                                                onChange={(date) => {
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    console.log('Selected start date:', formattedDate);
                                                    handleChange("date", formattedDate);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {errors.date && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.date}</span>}

                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Purchased Item/s:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <BasicTextField
                                            name="itemsPurchased"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("itemsPurchased", e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errors.itemsPurchased && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.itemsPurchased}</span>}

                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Total Price:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <BasicTextField
                                            name="billAmount"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("billAmount", e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errors.billAmount && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.billAmount}</span>}

                                <div className="addPaymentformField">
                                    <div className="addPaymentidField">
                                        <h5>Payment Receipt:</h5>
                                    </div>
                                    <div className="addPaymentidInput">
                                        <FileUpload
                                            style={{display: 'flex', justifyContent: 'center', width: '100%', float: 'left'}}
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </div>
                                {/*{errors.billAmount && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.billAmount}</span>}*/}

                            </div>

                            <div className="addPaymentformFieldButtons">
                                <div className="addPaymentButton">
                                    <CustomizedButton
                                        onClick={handleSubmit}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            width: '8em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.5em',
                                            marginRight: '1.5em'
                                        }}>
                                        Add Payment
                                    </CustomizedButton>
                                </div>
                                <div className="addPaymentcancelButton">
                                    <CustomizedButton
                                        onClick={() => props.onClose(false)}
                                        hoverBackgroundColor="#e03a26"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#D41400',
                                            width: '8em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.5em',
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
    )
}

export default AddPayment;
