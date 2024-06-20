import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "./viewInventory.css";
import { Modal } from "@mui/material";
import AddItem from "./Modals/Add Item/Add Item";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import DeleteItem from "./Modals/Delete Item/Delete Item";
import CustomizedButton from "../../../components/Button/button";
import SearchBar from "../../../components/search bar/search bar";
import ComboBox from "../../../components/Form Inputs/comboBox";
import axios from "axios";
import MultiActionAreaCard from "../../../components/Cards/inventoryCard";

function ViewInventory() {
    const navigate = useNavigate(); // Add this line
    const [visible, setVisible] = useState(false);
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [deleteItemVisible, setDeleteItemVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [allInventoryItems, setAllInventoryItems] = useState([]);
    const [category, setCategory] = React.useState('');
    const [stock, setStock] = React.useState(true);
    const token = localStorage.getItem('accessToken');

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const categoryOptions = [
        { value: 'Building Material', label: 'Building Material' },
        { value: 'Plumbing Material', label: 'Plumbing Material' },
    ];

    const handleAvailability = (event) => {
        setStock(event.target.value);
    };

    const availabilityOptions = [
        { value: 'In Stock', label: 'In Stock' },
        { value: 'Out of Stock', label: 'Out of Stock' },
    ];

    const handleSetVisible = (row) => {
        setSelectedRow(row);
        setVisible(true);
    };

    const handleButtonClick = (item) => {
        navigate(`/viewInventoryDetail/${item.id}`)
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
                `http://localhost:9000/inventory/getByCategory?productCategory=${encodeURIComponent(category)}`
                : 'http://localhost:9000/inventory/getAll';

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res=> {
            setAllInventoryItems(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllInventoryItems();
    }, [category]);

    function createViewButton(id) {
        return (
            <CustomizedButton
                onClick={() => navigate(`/viewInventoryDetail`)} // Modify this line to use navigate
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
                    <div className="viewInventoryFilterInner">
                        <div className="filterHeader">
                            <h2>Filter Items</h2>
                            <div className="itemCategoryFilter">
                                <div className="itemCategoryTopic">
                                    <h5>Category</h5>
                                </div>

                                <Box sx={{ minWidth: 80 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="category filter"
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
                                            options={categoryOptions}
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

                                <Box sx={{ minWidth: 80 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="availability Filter"
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
                                            value={stock}
                                            onChange={(event) => handleAvailability(event)}
                                            style={{width: '10em', marginRight: '0.5em',  border: '1px solid white'}}
                                            options={availabilityOptions}
                                            label="Stock"
                                            size="small"
                                        />
                                    </FormControl>
                                </Box>

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
                </div>
                <div className="viewInventoryItemInner">
                    <div className="InventorySearchAndButtons">
                        <div className="viewInventorySearch">
                            <SearchBar/>
                        </div>
                    </div>

                    <div className="items">
                        <div className="inventoryItemGrid">
                            {allInventoryItems.map((item) => (
                                <div className="card" key={item.id} >
                                    <MultiActionAreaCard
                                        item={item}
                                        handleClick={handleButtonClick}
                                        buttonText="View"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal open={addItemVisible}>
                    <AddItem onClose={(value) => { setAddItemVisible(false)}} />
                </Modal>

                <Modal open={deleteItemVisible}>
                    <DeleteItem onClose={(value) => { setDeleteItemVisible(false)}} />
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default ViewInventory;
