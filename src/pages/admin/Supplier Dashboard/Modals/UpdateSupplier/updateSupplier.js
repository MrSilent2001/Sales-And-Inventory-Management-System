import React, {useState} from "react";
import "./updateSupplier.css";
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";
import ComboBox from "../../../../../components/Form Inputs/comboBox";

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
    const [category, setCategory] = useState('');

    const handleChange = (field, value) => {
        setEditableData((prevData) => ({...prevData, [field]: value}));
    };

    const updateSupplier = () => {
        setData({...editableData});
        console.log("Supplier Updated Successfully");
    }

    const options = [
        {value: 'Category 01', label: 'Category 01'},
        {value: 'Category 02', label: 'Category 02'},
        {value: 'Category 03', label: 'Category 03'}
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
                                <h5>Address:</h5>
                            </div>
                            <div className="updateSupplieridInput">
                                <BasicTextField
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
                                <BasicTextField
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
                                <BasicTextField
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
                                <FileUpload style={{width:"20em"}}/>
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
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                    }}>
                                    Update Supplier
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
        </CenteredModal>
    )
}

export default UpdateSupplier;