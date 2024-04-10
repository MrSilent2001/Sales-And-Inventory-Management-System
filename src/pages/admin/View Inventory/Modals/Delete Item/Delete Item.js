import * as React from 'react';
import './Delete Item.css'
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CenteredModal from "../../../../../components/Modal/modal";
import CustomizedButton from "../../../../../components/Button/button";

function DeleteItem(props){
    return(
        <CenteredModal>
            <div className="deleteItemOuter">
                <div className="deleteItemModel">
                    <h2>Delete Item</h2>
                    <div className="deleteItemForm">
                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Inventory Id</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Item Description</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Manufacture Dated</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformField">
                            <div className="deleteItemidField">
                                <h5>Expire Date</h5>
                            </div>
                            <div className="deleteItemidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="deleteItemformFieldButtons">
                            <div className="deleteItemsaveButton">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
                                    }}>
                                    Delete Item
                                </CustomizedButton>
                            </div>
                            <div className="deleteItemcancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
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

export default DeleteItem;