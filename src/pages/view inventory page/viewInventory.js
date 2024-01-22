import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./viewInventory.css";
import AddItemButton from "../../layout/buttons/addItemButton/AddItemButton";
import DeleteItemButton from "../../layout/buttons/deleteItemButton/DeleteItemButton";

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

function ViewInventory(){
    return(
        <div className="viewInventory">
            <div className="searchAndButtons">
                <SearchBar></SearchBar>
                <div className="viewInventoryButtons">
                    <AddItemButton>Add Item</AddItemButton>
                    <DeleteItemButton>Delete Item</DeleteItemButton>
                </div>
            </div>
        </div>
    )
}

export default ViewInventory;