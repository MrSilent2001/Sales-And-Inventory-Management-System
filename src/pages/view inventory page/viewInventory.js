import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./viewInventory.css";
import AddItemButton from "../../layout/buttons/addItemButton/AddItemButton";
import DeleteItemButton from "../../layout/buttons/deleteItemButton/DeleteItemButton";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";


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
                        /*backgroundColor: 'white'*/
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

function FilterItems(){

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return(
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.7)'
                    }}
                >
                    Select
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    sx={{
                        height: 40,
                        width: 160,
                        fontSize: 10,
                        border: '1px solid white',
                        '& .MuiInputLabel-root': {
                            fontSize: 4, // Set the desired font size for the placeholder
                        },
                    }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

const ApplyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#e03a26' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

function ViewInventory(){
    return(
        <div className="viewInventoryOuter">
            <div className="viewInventoryFilter">
                <div className="filterHeader">
                    <h2>Filter Items</h2>
                    <div className="itemCategoryFilter">
                        <div className="itemCategoryTopic">
                            <h5>Category</h5>
                        </div>
                        <FilterItems></FilterItems>
                    </div>
                    <div className="itemAvailabilityFilter">
                        <div className="itemAbailabilityTopic">
                            <h5>Availability</h5>
                        </div>
                        <FilterItems></FilterItems>
                    </div>
                    <div className="applyButton">
                        <ApplyButton>Apply</ApplyButton>
                    </div>
                </div>
            </div>
            <div className="viewInventoryInner">
                <div className="searchAndButtons">
                    <div className="viewInventorySearch">
                        <SearchBar></SearchBar>
                    </div>
                    <div className="viewInventoryButtons">
                        <AddItemButton>Add Item</AddItemButton>
                        <DeleteItemButton>Delete Item</DeleteItemButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewInventory;