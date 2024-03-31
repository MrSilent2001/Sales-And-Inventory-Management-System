import React, {useState} from "react";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./viewSupplier.css";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Modal} from "@mui/material";
import AddSupplier from "../Supplier Dashboard/Modals/AddSupplier/addSupplier";
import UpdateSupplier from "../Supplier Dashboard/Modals/UpdateSupplier/updateSupplier";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import suppliers from "../../../data/data.json";
import SearchBar from "../../../components/search bar/search bar";


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

const rows = suppliers.suppliers || [];

function CustomizedTables() {
    const [visible,setVisible] = useState(false);

    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '25em', overflowY: 'auto', position: 'relative', marginRight:'2em'}}>
            <Table sx={{ minWidth: '25em'}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Supplier ID</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>E-mail</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Category</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" sx={{ height: '1.25em' }}>
                                {row.supplierId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.address}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.contact}</StyledTableCell>
                            <StyledTableCell align="right">{row.category}</StyledTableCell>
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
                <UpdateSupplier onClose={(value) => { setVisible(false)}}></UpdateSupplier>
            </Modal>
        </TableContainer>
    );
}

function ViewSupplier(){

    const [visible,setVisible] = useState(false)

    return(
        <>
            <InventoryNavbar/>

            <div className="viewSupplierOuter">
                <div className="viewSupplierFilter">
                    <div className="filterHeader">
                        <h2>Filter Items</h2>
                        <div className="supplierCategoryFilter">
                            <div className="itemCategoryTopic">
                                <h5>Category</h5>
                            </div>
                            <FilterItems></FilterItems>
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
                <div className="viewSupplierInner">

                    <div className="searchAndButtons">
                        <div className="viewSupplierSearch">
                            <SearchBar/>
                        </div>
                        <div className="viewSupplierButtons">
                            <CustomizedButton
                                onClick={()=>setVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginRight: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Add Supplier
                            </CustomizedButton>

                            <CustomizedButton
                                onClick={() =>{alert("Order has been Cancelled")}}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#960505',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Delete Supplier
                            </CustomizedButton>
                        </div>
                    </div>

                    <div className="itemTable" style={{width: '90%'}}>
                        <CustomizedTables></CustomizedTables>
                    </div>
                </div>

                <Modal open={visible}>
                    <AddSupplier onClose={(value) => { setVisible(false)}} ></AddSupplier>
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewSupplier;