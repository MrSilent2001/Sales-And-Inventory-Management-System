import './customerProfile management.css'
import * as React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';

const customerProfileManagementButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '12.625em',
        height: '2.5em'
    },
    fontSize: '0.6em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));
function CustomerProfileManagement(){
    return(
        <div className="customerProfileManagementOuter">
            <div className="customerProfileManagementInner">

                
            <div className="avatar">
            <Avatar src="/broken-image.jpg"  sx={{ width: 230, height: 230,border:2 ,borderRadius:3}} />
            <h2>Saman Perera</h2>
            </div>
                <div className="customerProfileManagementDetails">

                    <div className="formField">
                        <div className="textField">
                            <h4>Customer ID</h4>
                        </div>
                        <div className="inputData">
                            <h5>CU0004</h5>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h4>Address</h4>
                        </div>
                        <div className="inputData">
                            <h5>151/A, Colombo, SriLanka.</h5>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h4>E-mail</h4>
                        </div>
                        <div className="inputData">
                            <h5>samanperera@gmail.com</h5>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h4>Contact</h4>
                        </div>
                        <div className="inputData">
                            <h5>0771147935</h5>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h4>Previous Orders</h4>
                        </div>
                        <div className="inputData">
                        <Button variant="contained" size="small" >View Orders</Button>
                        </div>
                    </div>

                    

                </div>

                
                </div>

            </div>
       
    )
}

export default CustomerProfileManagement;