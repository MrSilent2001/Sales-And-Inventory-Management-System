import React, {useEffect, useState} from "react";
import { Box } from '@mui/material';
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
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import ComboBox from "../../../components/Form Inputs/comboBox";
import axios from "axios";

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
    const [allInventoryItems, setAllInventoryItems] = useState([]);

    const [category, setCategory] = React.useState('');

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'Building Material', label: 'Building Material' },
        { value: 'Plumbing Material', label: 'Plumbing Material' },
    ];

    const handleSetVisible = (row) => {
        setSelectedRow(row);
        setVisible(true);
    };

    const handleButtonClick = () => {
        console.log("view")
    };

    const columns = [
        { columnId: 'id', label: 'Inventory Id', minWidth: 100, align: 'center' },
        { columnId: 'itemDescription', label: 'Item Description', minWidth: 200, align: 'center' },
        { columnId: 'itemCategory', label: 'Item Category', minWidth: 120, align: 'center' },
        { columnId: 'itemQuantity', label: 'Quantity', minWidth: 100, align: 'center' },
        { columnId: 'inventoryStatus', label: 'Inventory Status', minWidth: 170, align: 'center' },
        { columnId: 'viewAction', label: '', minWidth: 100, align: 'center' },
        { columnId: 'deleteAction', label: '', minWidth: 100, align: 'center' }
    ];

    const getAllInventoryItems = () => {
        const url =
            category === 'Building Material' || category === 'Plumbing Material' ?
                `http://localhost:9000/inventory/getByCategory?itemCategory=${encodeURIComponent(category)}`
                : 'http://localhost:9000/inventory/getAll';

        axios.get(url).then(res=> {
            setAllInventoryItems(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllInventoryItems();
    }, [category]);

    const mappedData = allInventoryItems.map(inventoryItem => ({ ...inventoryItem,
            viewAction: createViewButton(inventoryItem.id),
            deleteAction: createDeleteButton(handleButtonClick),
            inventoryStatus: inventoryItem.itemQuantity > 0 ? 'In Stock' : 'Out of Stock' }
    ));

    function createViewButton(id) {
        return (
            <CustomizedButton
                onClick={() => handleSetVisible(id)}
                hoverBackgroundColor="#2d3ed2"
                style={{
                    backgroundColor: '#242F9B',
                    border: '1px solid #242F9B',
                    width: '9em',
                    height: '3em',
                    fontSize: '0.9em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '500',
                    marginTop: '0.625em',
                    marginRight: '-2em'
                }}
            >
                View
            </CustomizedButton>
        );
    }

    function createDeleteButton(handleButtonClick) {
        return (
            <CustomizedButton
                onClick={() => setDeleteItemVisible(true)}
                hoverBackgroundColor="#f11717"
                style={{
                    backgroundColor: '#ff0000',
                    border: '1px solid #242F9B',
                    width: '9em',
                    height: '3em',
                    fontSize: '0.9em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '500',
                    marginTop: '0.625em',
                    marginLeft: '-3em',
                    borderStyle: 'none'
                }}
            >
                Delete
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
                                    width: '11em',
                                    height: '2.95em',
                                    fontSize: '0.75em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                }}
                            >
                                Add Item
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
