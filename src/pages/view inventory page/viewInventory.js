import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./viewInventory.css";

function SearchBar(){
    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '55ch',
                    "& .MuiInputBase-root":{
                        height: 30,
                        borderRadius: 10,
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: 10
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Standard" variant="outlined" size="small"/>
        </Box>
    )
}

function ViewInventory(){
    return(
        <div className="viewInventory">
            <SearchBar></SearchBar>
        </div>
    )
}

export default ViewInventory;