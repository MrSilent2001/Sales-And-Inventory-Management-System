import React from "react";
import "./addDiscounts.css";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import SalesNavbar from "../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../layout/footer/footer";

function AddDiscount(){

    //There should be a useEffect hook for display the inventory values in the component

    return(
        <>
            <SalesNavbar/>
            <div className="addDiscountsOuter">
                <div className="addDiscountsInner">
                    <div className="discountForm">
                        <form>
                            <div className="row">
                                <label>Product Id: </label>
                                <TextField className="input" size="small" id="outlined-required" label="Product Id" required />
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Selling Price: </label>
                                <TextField className="input" size="small" type="number" id="outlined-required" label="Selling Price"  required/>
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Discount Percentage:  </label>
                                <TextField className="input" size="small" type="number" id="outlined-required" label="Discount Percentage" required/>
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>Start Date: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="input" slotProps={{ textField: { size: 'small' } }}/>
                                </LocalizationProvider>
                            </div>

                            <br/><br/>

                            <div className="row">
                                <label>End Date: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="input" slotProps={{ textField: { size: 'small' } }}/>
                                </LocalizationProvider>
                            </div>

                            <br/><br/>

                            <div className="btn-row">
                                <Button className="btn" variant="contained">Apply</Button>
                                <Button className="btn" variant="contained">Cancel</Button>
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