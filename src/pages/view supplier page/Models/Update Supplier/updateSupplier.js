import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {useState} from "react";
import "./updateSupplier.css";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from "@mui/material/Box";

function BasicTextFields({id, variant, size, type}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: '#e9eeff'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.5em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id={id} variant={variant} size={size} type={type} margin='normal'/>
        </Box>
    );
}

const CancelButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#e03a26' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const UpdateSupplierButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const CenteredModal = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Make the container take the full height of the viewport
});

function UpdateSupplier(props) {
    const [data, setData] = useState({
        id: "1",
        name: "ABC.Perera",
        address: "No.123/A, Temple Road, Galle.",
        email: "supplier1@gmail.com",
        contact: "071-5642845",
        category: "Category 01",
    });

    const [editableData, setEditableData] = useState({...data});
    const [category, setCategory] = React.useState('');

    const handleChange = (field, value) => {
        setEditableData((prevData) => ({...prevData, [field]: value}));
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const updateSupplier = () => {
        setData({...editableData});
        console.log("Supplier Updated Successfully");
    }


    return (
        <CenteredModal>
            <div className="updateSupplierOuter">
                <div className="updateSupplierModel">
                    <h2>Update Supplier</h2>
                    <div className="updateSupplierForm">
                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Supplier Id:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextFields
                                    id="outlined-required"
                                    size="small"
                                    value={editableData.id}
                                    onChange={(e) => handleChange("id", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Address:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextFields
                                    id="outlined-textarea"
                                    size="small"
                                    value={editableData.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    maxRows={3}
                                    multiline
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Email:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextFields
                                    id="outlined-required"
                                    size="small"
                                    type="email"
                                    value={editableData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextFields
                                    id="outlined-required"
                                    size="small"
                                    value={editableData.contact}
                                    onChange={(e) => handleChange("contact", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Category:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <Select
                                    className="supplierInput"
                                    id="demo-select-small"
                                    value={editableData.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                    size="small"
                                    style={{width: "17.5em",left:"-.5em"}}
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Category01">Category 01</MenuItem>
                                    <MenuItem value="Category02">Category 02</MenuItem>
                                    <MenuItem value="Category03">Category 03</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Photo:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>} style={{width: "20em",left:"-.5em"}}>
                                    Upload Image
                                    <VisuallyHiddenInput type="file"/>
                                </Button>
                            </div>
                        </div>


                        <div className="updateSupplierformFieldButtons">
                            <div className="updateSuppliersButton">
                                <UpdateSupplierButton onClick={updateSupplier}>Update Supplier</UpdateSupplierButton>
                            </div>

                            <div className="updateSuppliercancelButton">
                                <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default UpdateSupplier;