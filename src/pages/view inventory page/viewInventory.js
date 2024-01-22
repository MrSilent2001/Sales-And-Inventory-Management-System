import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import "./viewInventory.css";

function SearchBar(){
    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root":{
                        height: '1.95em',
                        borderRadius: '1.5em',
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.6em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Search Here" variant="outlined" size="small"/>
        </Box>
    )
}

const AddButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#242F9B' // You can adjust the darken value as needed
    },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#D41400' // You can adjust the darken value as needed
    },
}));

function ViewInventory(){
    return(
        <div className="viewInventory">
            <div className="searchAndButtons">
                <SearchBar></SearchBar>
                <div className="viewInventoryButtons">
                    <AddButton>Add Item</AddButton>
                    <DeleteButton>Delete Item</DeleteButton>
                </div>
            </div>
        </div>
    )
}

export default ViewInventory;