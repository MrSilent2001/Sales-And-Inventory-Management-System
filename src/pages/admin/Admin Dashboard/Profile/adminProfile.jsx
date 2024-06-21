import React, { useEffect, useState } from "react";
import "./adminProfile.css";
import CustomizedButton from "../../../../components/Button/button";
import BasicTextField from "../../../../components/Form Inputs/textfield";
import FormControl from "@mui/material/FormControl";
import PasswordField from "../../../../components/Form Inputs/passwordField";
import axios from "axios";
import { uploadFileToBlob } from "../../../Supplier/Inventory Dashboard/productBlobStorage";
import { css } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import FileUpload from "../../../../components/Form Inputs/fileUpload";

function AdminProfile({ show, onClose }) {
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contactNo: "",
        password: "",
        profilePicture: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [adminImage, setAdminImage] = useState(null);

    const id = parseInt(localStorage.getItem("id"));
    const token = localStorage.getItem("accessToken");

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const imagePreviewUrl = URL.createObjectURL(file);
    //         setAdminImage(imagePreviewUrl);
    //         const imageUrl = await uploadFileToBlob(file);
    //         setFormData((prevState) => ({
    //             ...prevState,
    //             profilePicture: imageUrl,
    //         }));
    //     }
    // };

    const handleFileChange = async (file) => {
        setAdminImage(file);
        const imageUrl = await uploadFileToBlob(file);
        setFormData(prevState => ({
            ...prevState,
            profilePicture: imageUrl
        }));
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const customButtonStyles = css`
    color: red;
    font-size: 20px;
    right: 5%;
    `;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/admin/findAdmin/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        setFormData({
            username: user.username || "",
            contactNo: user.contactNo || "",
            email: user.email || "",
            password: user.password || "",
            profilePicture: user.profilePicture || "",
        });
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.profilePicture;
            if (adminImage) {
                imageUrl = await uploadFileToBlob(adminImage);
            }

            const passwordToSubmit = formData.password || user.password;

            await axios.put(
                `http://localhost:9000/admin/update/${id}`,
                {
                    username: formData.username,
                    email: formData.email,
                    contactNo: formData.contactNo,
                    password: passwordToSubmit,
                    profilePicture: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Admin updated successfully");
            onClose(true);
        } catch (error) {
            console.error("Error updating admin:", error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="adminProfile-modal-overlay">
            <div className="adminProfile-modal-content">
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <div className="adminProfileformField">
                                <div className="profileAvatar">
                                    <Avatar src={formData.profilePicture}
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                border: 2,
                                                borderRadius: 50,
                                                marginTop: '1em'
                                            }}/>

                                    <FileUpload
                                        text={"add"}
                                        style={{marginTop: '1em',display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                        onChange={handleFileChange}
                                    />
                                </div>
                        </div>

                        <div className="adminProfile-form-outline">
                            <label>Username:</label>
                            <BasicTextField
                                size="small"
                                type="text"
                                id="outlined-required"
                                value={formData.username}
                                onChange={(e) => handleChange("username", e.target.value)}
                                required
                            />
                        </div>
                        {errors.username && (
                            <div className="error-message">{errors.username}</div>
                        )}

                        <div className="adminProfile-form-outline">
                            <label>Email:</label>
                            <BasicTextField
                                size="small"
                                id="outlined-required"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>
                        {errors.email && <div className="error-message">{errors.email}</div>}

                        <div className="adminProfile-form-outline">
                            <label>Contact No:</label>
                            <BasicTextField
                                size="small"
                                id="outlined-required"
                                type="text"
                                value={formData.contactNo}
                                onChange={(e) => handleChange("contactNo", e.target.value)}
                                required
                            />
                        </div>
                        {errors.contactNo && (
                            <div className="error-message">{errors.contactNo}</div>
                        )}

                        <div className="adminProfile-form-outline">
                            <label>Password:</label>
                            <PasswordField
                                style={{
                                    width: "18.5em",
                                    marginLeft: "1.5em",
                                    height: "0.5em",
                                    borderRadius: "0.25em",
                                }}
                                size="small"
                                id="outlined-adornment-password"
                                onChange={(e) => handleChange("password", e.target.value)}
                                showPassword={showPassword}
                                handleClickShowPassword={handleClickShowPassword}
                                handleMouseDownPassword={handleMouseDownPassword}
                                toggleButtonStyles={customButtonStyles}
                            />
                        </div>
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}

                        <div className="buttonContainer">
                            <CustomizedButton
                                type="submit"
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#242F9B",
                                    width: "8em",
                                    height: "2.25em",
                                    fontSize: "0.95em",
                                    padding: "0.5em 0.625em",
                                    borderRadius: "0.625em",
                                    border: "none",
                                    marginTop: "0.625em",
                                }}
                            >
                                Update
                            </CustomizedButton>
                            <CustomizedButton
                                type="button"
                                onClick={onClose}
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#d32f2f",
                                    width: "8em",
                                    height: "2.25em",
                                    fontSize: "0.95em",
                                    padding: "0.5em 0.625em",
                                    borderRadius: "0.625em",
                                    border: "none",
                                    margin: "0.5em 0.625em",
                                }}
                            >
                                Cancel
                            </CustomizedButton>
                        </div>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default AdminProfile;

