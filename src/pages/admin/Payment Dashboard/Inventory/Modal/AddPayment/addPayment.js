import * as React from 'react';
import './addPayment.css'
import CenteredModal from "../../../../../../components/Modal/modal";
import BasicTextField from "../../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../../components/Button/button";
import ComboBox from "../../../../../../components/Form Inputs/comboBox";

const options = [
    { value: 'Supplier 1', label: 'Supplier 1' },
    { value: 'Supplier 2', label: 'Supplier 2' },
    { value: 'Supplier 3', label: 'Supplier 3' },
];
function AddPayment(props){

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const addPayment = () =>{
        alert("Payment Completed Successfully.");
    }
    return(
        <CenteredModal>
            <div className="addPaymentOuter">
                <div className="addPaymentModel">
                    <h2>Add Payment</h2>
                    <div className="addPaymentForm">
                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <ComboBox
                                    value={category}
                                    onChange={(event) => handleChange(event)}
                                    style={{width: '17.5em', marginRight:'0.5em'}}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Item:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Address:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Total Price:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextField/>
                            </div>
                        </div>


                        <div className="addPaymentformFieldButtons">
                            <div className="addPaymentButton">
                                <CustomizedButton
                                    onClick={addPayment}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '2em',
                                        marginRight: '1.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Add Payment
                                </CustomizedButton>
                            </div>
                            <div className="addPaymentcancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#e03a26"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#D41400',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '2em',
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

export default AddPayment;