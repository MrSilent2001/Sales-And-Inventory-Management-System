import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./inventoryDashboard.css";
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
import AddItem from "../../Inventory/View Inventory Page/Models/Add Item/Add Item";
import UpdateItem from "../../Inventory/View Inventory Page/Models/Update Item/Update Item";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../layout/search bar/search bar";



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

const ViewItemButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.7em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

function CustomizedTables() {
    const [visible,setVisible] = useState(false)

    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '25em', overflowY: 'auto', position: 'relative'}}>
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
                            <StyledTableCell><ViewItemButton onClick={()=>setVisible(true)}>View</ViewItemButton></StyledTableCell>
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

function InventoryDashboard(){

    const [visible,setVisible] = useState(false)

    return(
        <>
            <SupplierNavbar/>

            <div className="viewInventoryOuter">
                <div className="viewInventoryInner">
                    <div className="searchAndButtons">
                        <div className="viewInventorySearch">
                            <SearchBar></SearchBar>
                        </div>
                        <div className="viewInventoryButtons">
                            <AddItemButton onClick={()=>setVisible(true)}>Add Item</AddItemButton>
                            <DeleteItemButton>Delete Item</DeleteItemButton>
                        </div>
                    </div>

                    <div className="itemTable">
                        <CustomizedTables></CustomizedTables>
                    </div>
                </div>

                <Modal open={visible}>
                    <AddItem onClose={(value) => { setVisible(false)}} ></AddItem>
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default InventoryDashboard;