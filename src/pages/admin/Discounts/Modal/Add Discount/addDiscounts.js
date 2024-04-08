import React from "react";
import "./addDiscounts.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";

function AddDiscount(){

    return(
        <>
            <SalesNavbar/>
            <div className="addDiscountsOuter">
                <div className="addDiscountsInner">
                    <div className="discountForm">
                        <form>
                            <div className="row">
                                <label>Product Id: </label>
                                <BasicTextField
                                    className="input"
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    label="Product Id"
                                />
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Selling Price: </label>
                                <BasicTextField
                                    className="input"
                                    size="small"
                                    type="number"
                                    id="outlined-required"
                                    label="Selling Price"
                                />
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Discount Percentage:  </label>
                                <BasicTextField
                                    className="input"
                                    size="small"
                                    type="number"
                                    id="outlined-required"
                                    label="Discount Percentage"
                                />
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Start Date: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="input" slotProps={{ textField: { size: 'small' } }} required/>
                                </LocalizationProvider>
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>End Date: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="input" slotProps={{ textField: { size: 'small' } }} required/>
                                </LocalizationProvider>
                            </div>

                            <br/><br/>

                            <div className="btn-row">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Apply
                                </CustomizedButton>
                                <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
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

                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddDiscount;