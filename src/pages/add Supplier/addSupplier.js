import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from "react";
import "./addSupplier.css";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddSupplier(){
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
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

    const addSupplier = () =>{
        console.log("Supplier Added Successfully");
    }

    const cancelSupplier = () =>{
        console.log("Cancelled");
    }
    return(
        <div className="addSupplierOuter">
            <div className="addSupplierInner">
                <div className="supplierForm">
                    <form>
                        <div className="row">
                            <label>Supplier Id: </label>
                            <TextField className="supplierInput" size="small" id="outlined-required" label="Supplier Id" required />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Address: </label>
                            <TextField className="supplierInput" id="outlined-textarea" label="Address" size="small" multiline maxRows={3} required/>
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Email:  </label>
                            <TextField  className="supplierInput" type="email" size="small" id="outlined-required" label="Email" required/>
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Contact Number: </label>
                            <TextField className="supplierInput" size="small" type="tel" id="outlined-required" label="Contact Number" required />
                        </div>

                        <br/><br/>

                        <div className="row">
                            <label>Category: </label>
                            <Select
                                className="supplierInput"
                                id="demo-select-small"
                                value={category}
                                onChange={handleChange}
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
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{width:"22.75em"}}>
                                Upload Image
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </div>

                        <br/><br/>

                        <div className="btn-row">
                            <Button className="btn" variant="contained" onClick={addSupplier}>Add</Button>
                            <Button className="btn" variant="contained" color="error" onClick={cancelSupplier}>Cancel</Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSupplier;