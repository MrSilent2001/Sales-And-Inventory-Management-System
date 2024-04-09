import React, { useState } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "./viewInventory.css";
import { Modal } from "@mui/material";
import AddItem from "./Modals/Add Item/Add Item";
import UpdateItem from "./Modals/Update Item/Update Item";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import DeleteItem from "./Modals/Delete Item/Delete Item";
import CustomizedButton from "../../../components/Button/button";
import SearchBar from "../../../components/search bar/search bar";
import inventory from "../../../data/data.json";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import ComboBox from "../../../components/Form Inputs/comboBox";

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
function FilterAvailability(){
    const [category, setCategory] = React.useState('');

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'Category 01', label: 'Category 01' },
        { value: 'Category 02', label: 'Category 02' },
        { value: 'Category 03', label: 'Category 03' }
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
                    style={{width: '10em', marginRight: '0.5em',  border: '1px solid white'}}
                    options={options}
                    label="Category"
                    size="small"
                />
            </FormControl>
        </Box>
    )
}

function ViewInventory(){
    const [visible, setVisible] = useState(false);
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [deleteItemVisible, setDeleteItemVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleSetVisible = (row) => {
        setSelectedRow(row);
        setVisible(true);
    };

    const handleButtonClick = () => {
        console.log("view")
    };

    const columns = [
        { id: 'inventoryId', label: 'Inventory Id', minWidth: 100, align: 'center' },
        { id: 'itemDescription', label: 'Item Description', minWidth: 200, align: 'center' },
        { id: 'itemCategory', label: 'Item Category', minWidth: 120, align: 'center' },
        { id: 'Quantity', label: 'Quantity', minWidth: 100, align: 'center' },
        { id: 'Price', label: 'Unit Price', minWidth: 100, align: 'center' },
        { id: 'inventoryStatus', label: 'Inventory Status', minWidth: 170, align: 'center' },
        { id: 'actions', label: '', minWidth: 100, align: 'center' }
    ];

    let rows = inventory.inventory || [];

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
                                    backgroundColor: '#ff0000',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight:'1.5em',
                                    marginLeft: '1.5em',
                                }}
                            >
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
                                onClick={() => setAddItemVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '8.5em',
                                    height: '2.65em',
                                    fontSize: '0.75em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                }}
                            >
                                Add Item
                            </CustomizedButton>

                            <CustomizedButton
                                onClick={() => setDeleteItemVisible(true)}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#ff0000',
                                    width: '8.5em',
                                    height: '2.65em',
                                    fontSize: '0.75em',
                                    padding: '0.5em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                }}
                            >
                                Delete Item
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

                <Modal open={addItemVisible}>
                    <AddItem onClose={(value) => { setAddItemVisible(false)}} />
                </Modal>

                <Modal open={deleteItemVisible}>
                    <DeleteItem onClose={(value) => { setDeleteItemVisible(false)}} />
                </Modal>

                <Modal open={visible}>
                    <UpdateItem onClose={(value) => { setVisible(false)}} selectedRow={selectedRow} />
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewInventory;
