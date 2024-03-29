import React, {useState} from "react";
import "./inventoryDashboard.css";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Modal} from "@mui/material";
import AddItem from "../../admin/View Inventory/Modals/Add Item/Add Item";
import UpdateItem from "../../admin/View Inventory/Modals/Update Item/Update Item";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../layout/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";


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
                                    marginRight: '1.5em',
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
                    <AddItem onClose={(value) => { setVisible(false)}} ></AddItem>
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default InventoryDashboard;