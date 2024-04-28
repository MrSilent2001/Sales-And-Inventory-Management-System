import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./viewInventory.css";
import {styled} from "@mui/material/styles";
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
import items from "../../../data/data.json";
import SearchBar from "../../../components/search bar/search bar";
import axios from "axios";
import baseURL from "../../../services/baseURL"

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

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = items.items || [];

function CustomizedTables() {
    const [visible,setVisible] = useState(false);

    const [deleteItemVisible,setDeleteItemVisible] = useState(false);

    const [allInventoryItems, setAllInventoryItems] = useState([]);

    const getAllInventoryItems = () => {
        axios.get('http://localhost:9000/inventory/getAll').then(res=> {
            setAllInventoryItems(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllInventoryItems();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ width: '76.875em', maxHeight: '27em', overflowY: 'auto', position: 'relative'}}>
            <Table sx={{ minWidth: '25em'}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Inventory ID</StyledTableCell>
                        <StyledTableCell>Item Description</StyledTableCell>
                        <StyledTableCell>Item Category</StyledTableCell>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell>Inventory Status</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allInventoryItems.map((inventoryItem) => (
                        <StyledTableRow key={inventoryItem.id}>
                            <StyledTableCell component="th" scope="row" sx={{ height: '1.25em' }}>
                                {inventoryItem.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{inventoryItem.itemDescription}</StyledTableCell>
                            <StyledTableCell align="right">{inventoryItem.itemCategory}</StyledTableCell>
                            <StyledTableCell align="right">{inventoryItem.itemQuantity}</StyledTableCell>
                            <StyledTableCell align="right">{inventoryItem.itemUnitPrice}</StyledTableCell>
                            <StyledTableCell>
                                <CustomizedButton
                                    onClick={()=>setVisible(true)}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                        marginLeft: '-2em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    View
                                </CustomizedButton>
                            </StyledTableCell>

                            <StyledTableCell>
                                <CustomizedButton
                                    onClick={()=>setDeleteItemVisible(true)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#ff0000',
                                        border: '1px solid #242F9B',
                                        width: '10em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1em',
                                        marginLeft: '-4em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        borderStyle: 'none'
                                    }}>
                                    Delete Item
                                </CustomizedButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal open={visible}>
                <UpdateItem onClose={(value) => { setVisible(false)}}></UpdateItem>
            </Modal>

            <Modal open={deleteItemVisible}>
                <DeleteItem onClose={(value) => { setDeleteItemVisible(false)}} />
            </Modal>
        </TableContainer>
    );
}

function ViewInventory(){

    const [addItemVisible,setAddItemVisible] = useState(false)

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
                                hoverBackgroundColor="#f11717"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#ff0000',
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
                    <div className="InventorySearchAndButtons">
                        <div className="viewInventorySearch">
                            <SearchBar/>
                        </div>
                        <div className="viewInventoryButtons">
                            <CustomizedButton
                                onClick={()=>setAddItemVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '10em',
                                    height: '2.65em',
                                    fontSize: '0.75em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Add Item
                            </CustomizedButton>

                        </div>
                    </div>

                    <div className="itemTable">
                        <CustomizedTables></CustomizedTables>
                    </div>
                </div>

                <Modal open={addItemVisible}>
                    <AddItem onClose={(value) => { setAddItemVisible(false)}} />
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewInventory;