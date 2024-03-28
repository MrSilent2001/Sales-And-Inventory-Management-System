import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./viewInventory.css";
import AddItemButton from "../../../layout/buttons/addItemButton/AddItemButton";
import DeleteItemButton from "../../../layout/buttons/deleteItemButton/DeleteItemButton";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Modal} from "@mui/material";
import AddItem from "./Modals/Add Item/Add Item";
import UpdateItem from "./Modals/Update Item/Update Item";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import DeleteItem from "./Modals/Delete Item/Delete Item";
import CustomizedButton from "../../../components/Button/button";


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
                            fontSize: 4,
                        },
                    }}
                >
                    <MenuItem value={10} >All</MenuItem>
                    <MenuItem value={20}>Metal</MenuItem>
                    <MenuItem value={30}>Wood</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

function FilterAvailability(){

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
                            fontSize: 4,
                        },
                    }}
                >
                    <MenuItem value={10} >All</MenuItem>
                    <MenuItem value={20}>In Stock</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

const ApplyButton = styled(Button)(({ theme }) => ({
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:'#646FD4',
        color: theme.palette.common.white,
        fontSize: '0.75em',
        fontWeight: 500,
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.625em',
        textAlign: 'center'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(inventoryId, itemDescription, itemCategory, Quantity, inventoryStatus) {
    return { inventoryId, itemDescription, itemCategory, Quantity, inventoryStatus };
}

const rows = [
    createData('I0001', 'Tokyo Super Cement', 'Cement', 24, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 37, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 24, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 67, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 49, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 49, 'In Stock'),
];

function CustomizedTables() {
    const [visible,setVisible] = useState(false);

    return (
        <TableContainer component={Paper} sx={{ width: '76.875em', maxHeight: '25em', overflowY: 'auto', position: 'relative'}}>
            <Table sx={{ minWidth: '25em'}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Inventory ID</StyledTableCell>
                        <StyledTableCell>Item Description</StyledTableCell>
                        <StyledTableCell>Item Category</StyledTableCell>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell>Inventory Status</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" sx={{ height: '1.25em' }}>
                                {row.inventoryId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.itemDescription}</StyledTableCell>
                            <StyledTableCell align="right">{row.itemCategory}</StyledTableCell>
                            <StyledTableCell align="right">{row.Quantity}</StyledTableCell>
                            <StyledTableCell align="right">{row.inventoryStatus}</StyledTableCell>
                            <StyledTableCell>
                                <CustomizedButton
                                    onClick={()=>setVisible(true)}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '6em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    View
                                </CustomizedButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal open={visible}>
                <UpdateItem onClose={(value) => { setVisible(false)}}></UpdateItem>
            </Modal>
        </TableContainer>
    );
}

function ViewInventory(){

    const [visible,setVisible] = useState(false)

    return(
        <>
            <InventoryNavbar/>

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
                            <div className="itemAvailabilityTopic">
                                <h5>Availability</h5>
                            </div>
                            <FilterAvailability></FilterAvailability>
                        </div>
                        <div className="applyButton">
                            <CustomizedButton
                                onClick={() =>{alert("Order has been Cancelled")}}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#960505',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight:'1.5em',
                                    marginLeft: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Apply
                            </CustomizedButton>
                        </div>
                    </div>
                </div>
                <div className="viewInventoryItemInner">
                    <div className="searchAndButtons">
                        <div className="viewInventorySearch">
                            <SearchBar></SearchBar>
                        </div>
                        <div className="viewInventoryButtons">
                            <CustomizedButton
                                onClick={()=>setVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Add Item
                            </CustomizedButton>

                            <CustomizedButton
                                onClick={()=>setVisible(true)}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#960505',
                                    width: '11em',
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
                                Delete Item
                            </CustomizedButton>

                        </div>
                    </div>

                    <div className="itemTable">
                        <CustomizedTables></CustomizedTables>
                    </div>
                </div>

                <Modal open={visible}>
                    <AddItem onClose={(value) => { setVisible(false)}} />
                </Modal>

                <Modal open={visible}>
                    <DeleteItem onClose={(value) => { setVisible(false)}} />
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewInventory;