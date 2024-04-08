import * as React from 'react';
import './Add Item.css';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";

function AddItem(props){
    return(
        <CenteredModal>
            <div className="addItemOuter">
                <div className="addItemModel">
                    <h2>Add Item</h2>
                    <div className="addItemForm">
                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Inventory Id</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Item Description</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Manufacture Dated</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformField">
                            <div className="addItemidField">
                                <h5>Expire Date</h5>
                            </div>
                            <div className="addItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addItemformFieldButtons">
                            <div className="addItemButton">
                                <CustomizedButton
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
                                        fontWeight: '500',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Add Item
                                </CustomizedButton>
                            </div>
                            <div className="addItemcancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '8em',
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

export default AddItem;