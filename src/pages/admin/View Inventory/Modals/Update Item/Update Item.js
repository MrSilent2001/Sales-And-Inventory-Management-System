import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Update Item.css'
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root":{
                        height: '2.5em',
                        backgroundColor: '#e9eeff'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.5em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" variant="outlined" margin='normal'/>
        </Box>
    );
}

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#e03a26'
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const UpdateItemButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const CenteredModal = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});
function UpdateItem(props){
    return(
        <CenteredModal>
            <div className="updateItemOuter">
                <div className="updateItemModel">
                    <h2>Update Item</h2>
                    <div className="updateItemForm">
                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Inventory Id</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Description</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Manufacture Dated</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Expire Date</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="updateItemformFieldButtons">
                            <div className="updateItemcancelButton">
                                <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
                            </div>
                            <div className="updateItemupdateButton">
                                <UpdateItemButton>Update Item</UpdateItemButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default UpdateItem;