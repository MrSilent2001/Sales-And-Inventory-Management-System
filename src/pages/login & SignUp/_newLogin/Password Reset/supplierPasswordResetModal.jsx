import React, { forwardRef, useState } from "react";
import "./resetPassword.css";
import BasicTextField from "../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../components/Button/button";
import CenteredModal from "../../../../components/Modal/modal";
import axios from "axios";
import CustomizedAlert from "../../../../components/Alert/alert";

const SupplierResetModal = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        email: ''
    });

    const [errors, setErrors] = useState({});

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const token = localStorage.getItem('accessToken');

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

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.email) {
            validationErrors.email = " *This Field is required";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const supplier = await axios.get(`http://localhost:9000/supplier/findSupplierByEmail/${formData.email}`);

                const id = supplier.data.id;
                const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
                const password = `Trade${randomFourDigitNumber}`;

                await axios.put(`http://localhost:9000/supplier/reset/${id}`, {
                    password: password
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                axios.post('http://localhost:9000/email/send/resetPassword', {
                    receiverName: supplier.data.username,
                    emailSubject: 'Reset Password',
                    emailBody: `Your password has been reset. This is your temporary password - ${password}. Please change this password after you signed in to the system`,
                    receiverEmail: formData.email,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                handleClickSuccess();
                setTimeout(() => {
                    setOpenSuccess(false);
                    props.onClose();
                }, 750);
            } catch (error) {
                console.error('Error applying discount:', error);
                handleClickError();
            }
        } else {
            console.log("email", formData.email);
            console.log("Validation errors:", validationErrors);
        }
    };

    return (
        <CenteredModal>
            <form onSubmit={handleSubmit}>
                <div className="ResetPasswordModal">
                    <div className="ResetPasswordFormField">
                        <div className="ResetPasswordLabelField">
                            <h5>Enter your E-mail:</h5>
                        </div>
                        <div className="ResetPasswordInput">
                            <BasicTextField
                                name="email"
                                size="small"
                                type="email"
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                        {errors.email && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.email}</span>}
                    </div>

                    <div className="ResetPasswordFormButtons">
                        <div className="ResetPasswordcancelButton">
                            <CustomizedButton
                                onClick={() => props.onClose(false)}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#960505',
                                    width: '8em',
                                    height: '2.5em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                    margin: '0 1em 0 0'
                                }}>
                                Cancel
                            </CustomizedButton>
                        </div>
                        <div className="ResetPasswordButton">
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
                                    margin: '0 0 0 1em',
                                }}>
                                Submit
                            </CustomizedButton>
                        </div>
                    </div>
                </div>
            </form>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Temporary Password Generated Successfully!"
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

export default SupplierResetModal;
