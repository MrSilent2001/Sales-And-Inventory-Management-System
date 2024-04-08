import Button from "@mui/material/Button";
import React from "react";
import "./addSupplier.css";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";

function AddSupplier(props){
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'Category 01', label: 'Category 01' },
        { value: 'Category 02', label: 'Category 02' },
        { value: 'Category 03', label: 'Category 03' }
    ];

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
        alert("Supplier Added Successfully");
    }

    return(
        <CenteredModal>
            <div className="addSupplierOuter">
                <div className="addSupplierModel">
                    <h2>Add Supplier</h2>
                    <div className="addSupplierForm">
                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Supplier Id:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <BasicTextField id="outlined-required" size="small"/>
                            </div>
                        </div>

                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Address:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <BasicTextField id="outlined-textarea" size="small"/>
                            </div>
                        </div>

                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Email:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <BasicTextField id="outlined-required" size="small" type="email"/>
                            </div>
                        </div>

                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <BasicTextField id="outlined-required" size="small"/>
                            </div>
                        </div>

                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Category:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <ComboBox
                                    value={category}
                                    onChange={(event) => handleChange(event)}
                                    style={{width: '17.5em', marginRight: '0.5em'}}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className="addSupplierformField">
                            <div className="addSupplieridField">
                                <h5>Photo:</h5>
                            </div>
                            <div className="addSupplieridInput">
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{width:"20em",left:"-.5em"}}>
                                    Upload Image
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                        </div>


                        <div className="addSupplierformFieldButtons">
                            <div className="addSupplierButton">
                                <CustomizedButton
                                    onClick={addSupplier}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Add Supplier
                                </CustomizedButton>
                            </div>

                            <div className="addSuppliercancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Cancel
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default AddSupplier;