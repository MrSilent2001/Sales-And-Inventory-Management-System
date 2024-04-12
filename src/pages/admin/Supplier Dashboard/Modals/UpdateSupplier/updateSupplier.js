import React, { forwardRef, useEffect, useState } from "react";
import "./updateSupplier.css";
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import axios from "axios";

const UpdateSupplier = forwardRef((props, ref) => {
    const [editableData, setEditableData] = useState(props.selectedSupplier || {});
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/supplier/getSupplier/${editableData.id}`);
                setEditableData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if (editableData.id) {
            fetchSupplier();
        }
    }, [editableData.id]);

    const handleChange = (field, value) => {
        setEditableData((prevData) => ({ ...prevData, [field]: value }));
    };

    const updateSupplier = () => {
        axios.put(`http://localhost:3001/supplier/update/${editableData.id}`, editableData)
            .then(response => {
                console.log("Supplier updated successfully:", response.data);
            })
            .catch(error => {
                console.error("Error updating supplier:", error);
            });
    };

    const options = [
        { value: 'Category 01', label: 'Category 01' },
        { value: 'Category 02', label: 'Category 02' },
        { value: 'Category 03', label: 'Category 03' }
    ];

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
                                <BasicTextField
                                    id="outlined-required"
                                    size="small"
                                    value={editableData.id}
                                    onChange={(e) => handleChange("id", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Supplier Name:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextField
                                    id="outlined-textarea"
                                    size="small"
                                    value={editableData.supplierName}
                                    onChange={(e) => handleChange("supplierName", e.target.value)}
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
                                <BasicTextField
                                    id="outlined-required"
                                    size="small"
                                    type="email"
                                    value={editableData.supplierEmail}
                                    onChange={(e) => handleChange("supplierEmail", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Supplier Address:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextField
                                    id="outlined-required"
                                    size="small"
                                    value={editableData.supplierAddress}
                                    onChange={(e) => handleChange("supplierAddress", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Supplier Contact:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <ComboBox
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{
                                        width: '17.5em',
                                        height: '2em',
                                        marginRight: '0.5em',
                                        border: '1px solid white'
                                    }}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className="updateSupplierformField">
                            <div className="updateSupplieridField">
                                <h5>Photo:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <FileUpload style={{ width: "20em" }} />
                            </div>
                        </div>

                        <div className="updateSupplierformFieldButtons">
                            <div className="updateSuppliersButton">
                                <CustomizedButton
                                    onClick={updateSupplier}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.75em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                    }}>
                                    Update
                                </CustomizedButton>
                            </div>

                            <div className="updateSuppliercancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.75em',
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
        </CenteredModal>
    );
});

export default UpdateSupplier;
