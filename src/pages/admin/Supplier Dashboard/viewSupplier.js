import React, {useState} from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "./viewSupplier.css";
import {Modal} from "@mui/material";
import AddSupplier from "../Supplier Dashboard/Modals/AddSupplier/addSupplier";
import UpdateSupplier from "../Supplier Dashboard/Modals/UpdateSupplier/updateSupplier";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import suppliers from "../../../data/data.json";
import SearchBar from "../../../components/search bar/search bar";
import ComboBox from "../../../components/Form Inputs/comboBox";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";

function FilterItems(){
    const [category, setCategory] = React.useState('');

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Metal', label: 'Metal' },
        { value: 'Wood', label: 'Wood' }
    ];

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
                <ComboBox
                    value={category}
                    onChange={(event) => handleSelect(event)}
                    style={{width: '10em', marginRight: '0.5em', border: '1px solid white'}}
                    options={options}
                    label="Category"
                    size="small"
                />
            </FormControl>
        </Box>
    )
}

function ViewSupplier(){
    const [visible, setVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleSetVisible = (row) => {
        setSelectedRow(row);
        setVisible(true);
    };

    const handleButtonClick = () => {
        console.log("view")
    };

    let rows = suppliers.suppliers || [];

    const columns = [
        { id: 'inventoryId', label: 'Supplier Id', minWidth: 100, align: 'center' },
        { id: 'itemDescription', label: 'Address', minWidth: 200, align: 'center' },
        { id: 'itemCategory', label: 'E-mail', minWidth: 170, align: 'center' },
        { id: 'Quantity', label: 'Contact', minWidth: 170, align: 'center' },
        { id: 'inventoryStatus', label: 'Category', minWidth: 170, align: 'center' },
        { id: 'actions', label: '', minWidth: 100, align: 'center' }
    ];



    const mappedData = rows.map(row => ({ ...row, actions: createViewButton(handleButtonClick) }));

    function createViewButton(handleButtonClick) {
        return (
            <CustomizedButton
                onClick={() => handleSetVisible}
                hoverBackgroundColor="#2d3ed2"
                style={{
                    backgroundColor: '#242F9B',
                    border: '1px solid #242F9B',
                    width: '5em',
                    height: '2.5em',
                    fontSize: '0.75em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '550',
                    marginTop: '0.625em',
                    marginRight: '1.5em'
                }}
            >
                View
            </CustomizedButton>
        );
    }
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
                            <FilterItems/>
                        </div>
                        <div className="applyButton">
                            <CustomizedButton
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#960505',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight:'1.5em',
                                    marginLeft: '1.5em'
                                }}>
                                Apply
                            </CustomizedButton>
                        </div>
                    </div>
                </div>
                <div className="viewSupplierInner">

                    <div className="supplierSearchAndButtons">
                        <div className="viewSupplierSearch">
                            <SearchBar/>
                        </div>
                        <div className="viewSupplierButtons">
                            <CustomizedButton
                                onClick={()=>setVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.75em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginRight: '1.5em',
                                }}>
                                Add Supplier
                            </CustomizedButton>

                            <CustomizedButton
                                onClick={() =>{alert("Order has been Cancelled")}}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#960505',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.75em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                }}>
                                Delete Supplier
                            </CustomizedButton>
                        </div>
                    </div>

                    <div className="itemTable">
                        <CustomizedTable
                            columns={columns}
                            rows={mappedData}
                        />
                    </div>
                </div>

                <Modal open={visible}>
                    <AddSupplier onClose={(value) => { setVisible(false)}}/>
                </Modal>
                <Modal open={updateVisible}>
                    <UpdateSupplier onClose={(value) => { setUpdateVisible(false)}} selectedRow={selectedRow}/>
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewSupplier;