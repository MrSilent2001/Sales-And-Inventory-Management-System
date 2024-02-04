import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {useState} from "react";
import "./updateSupplier.css";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UpdateSupplier(){

    const [data, setData] = useState({
        id: "1",
        name: "ABC.Perera",
        address: "No.123/A, Temple Road, Galle.",
        email: "supplier1@gmail.com",
        contact: "071-5642845",
        category: "Category 01",
    });

    const [editableData, setEditableData] = useState({ ...data });
    const handleChange = (field,value) => {
        setEditableData((prevData) => ({ ...prevData, [field]: value }));
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

    const updateSupplier = () =>{
        setData({ ...editableData });
        console.log("Supplier Updated Successfully");
    }

    const cancelSupplier = () =>{
        setEditableData({ ...data });
        console.log("Cancelled");
    }

    return(
        <div className="updateSupplierOuter">
            <div className="updateSupplierInner">
                <div className="supplierForm">
                    <form>
                        <div className="row">
                            <label>Supplier Id: </label>
                            <TextField
                                className="supplierInput"
                                size="small"
                                id="outlined-required"
                                value={editableData.id}
                                onChange={(e) => handleChange("id", e.target.value)}
                                required
                            />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Address: </label>
                            <TextField
                                className="supplierInput"
                                id="outlined-textarea"
                                size="small"
                                value={editableData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                maxRows={3}
                                multiline
                                required
                            />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Email:  </label>
                            <TextField
                                className="supplierInput"
                                type="email"
                                size="small"
                                id="outlined-required"
                                value={editableData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Contact Number: </label>
                            <TextField
                                className="supplierInput"
                                size="small"
                                type="tel"
                                id="outlined-required"
                                value={editableData.contact}
                                onChange={(e) => handleChange("contact", e.target.value)}
                                required
                            />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Category: </label>
                            <Select
                                className="supplierInput"
                                id="demo-select-small"
                                value={editableData.category}
                                onChange={(e) => handleChange("category", e.target.value)}
                                size="small"
                            >
                                <MenuItem value="None">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Category01">Category 01</MenuItem>
                                <MenuItem value="Category02">Category 02</MenuItem>
                                <MenuItem value="Category03">Category 03</MenuItem>
                            </Select>
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Photo: </label>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{width:"22.75em"}}  >
                                Upload Image
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </div>

                        <br/><br/>

                        <div className="btn-row">
                            <Button className="btn" variant="contained" onClick={updateSupplier}>Update</Button>
                            <Button className="btn" variant="contained" color="error" onClick={cancelSupplier}>Cancel</Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateSupplier;

