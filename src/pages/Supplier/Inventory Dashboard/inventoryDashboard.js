import React, {useEffect, useState} from "react";
import "./inventoryDashboard.css";
import {Modal} from "@mui/material";
import AddItem from "../Inventory Dashboard/Modals/Add Item/AddItem";
import UpdateItem from "../Inventory Dashboard/Modals/Update Item/UpdateItem";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import CustomizedAlert from "../../../components/Alert/alert";
import axios from "axios";

const columns = [
    {columnId: 'sellerId', label: 'Supplier Id', minWidth: 70, align: 'center'},
    {columnId: 'productName', label: 'Item Name', minWidth: 100, align: 'center'},
    {
        columnId: 'productDescription',
        label: 'Item Description',
        minWidth: 200,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'productCategory',
        label: 'Item Category',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'productUnitPrice',
        label: 'Unit Price',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'productQuantity',
        label: 'Qty.',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    { columnId: 'actions', label: '', minWidth: 170, align: 'center' },
];
function InventoryDashboard(){
    const [addVisible,setAddVisible] = useState(false);
    const [updateVisible,setUpdateVisible] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [inventory, setInventory] = useState([]);


    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };
    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    let rows = inventory;

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/inventory/delete/${id}`);

            // Fetching the updated list of items after deletion
            const response = await axios.get('http://localhost:9000/inventory/getAll');
            setInventory(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error canceling discount:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/inventory/update/${id}`);

            // Fetching the updated list of items after deletion
            const response = await axios.get('http://localhost:9000/inventory/getAll');
            setInventory(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error updating Items:', error);
        }
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://localhost:9000/inventory/getAll');
                setInventory(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            }
        };
        fetchInventory();
    }, []);

    const createActionButtons = (id) => {
        return (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => { setUpdateVisible(true)}}
                    hoverBackgroundColor="#2d3ed2"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#242F9B',
                        width: '8.5em',
                        height: '2.5em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.625em',
                        fontWeight: '550',
                        border: 'none',
                        margin: '0.625em 2em 0 0'
                    }}>
                    View
                </CustomizedButton>

                <CustomizedButton
                    onClick={() => handleDelete(id)}
                    hoverBackgroundColor="#f11717"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#960505',
                        width: '8.5em',
                        height: '2.5em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.625em',
                        fontWeight: '550',
                        border: 'none',
                        margin: '0.625em 0 0 2em'
                    }}>
                    Cancel
                </CustomizedButton>
            </div>
        );
    };

    rows = rows.map(row => ({...row, actions: createActionButtons(row.id)}));

    const handleInventoryAdded = (updatedInventory) => {
        setInventory(updatedInventory);
    };
    const handleInventoryUpdated = (updatedInventory) => {
        setInventory(updatedInventory);
    };

    // Fetch Items function with query parameter
    const fetchItems = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/inventory/search?keyword=${query}`);
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching Items:', error);
        }
    };


    return(
        <>
            <SupplierNavbar/>

            <div className="supplierViewInventoryOuter">
                <div className="supplierViewInventoryInner">
                    <div className="supplierInvSearchAndButtons">
                        <div className="supplierViewInventorySearch">
                            <SearchBar
                                label="Search Items"
                                onKeyPress={fetchItems}
                            />
                        </div>
                        <div className="supplierViewInventoryButtons">
                            <CustomizedButton
                                onClick={()=>setAddVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                }}>
                                Add Item
                            </CustomizedButton>
                        </div>
                    </div>

                    <div className="supplierItemTable">
                        <CustomizedTable
                            columns={columns}
                            rows={rows}
                            style={{width: '95%'}}
                        />
                    </div>
                </div>

                <Modal open={addVisible}>
                    <AddItem
                        onClose={() => { setAddVisible(false)}}
                        onInventoryAdded={handleInventoryAdded}
                    />
                </Modal>

                <Modal open={updateVisible}>
                    <UpdateItem
                        onClose={() => { setUpdateVisible(false)}}
                        onInventoryUpdated={handleInventoryUpdated}
                    />
                </Modal>

                <CustomizedAlert
                    open={openError}
                    onClose={handleCloseError}
                    severity="error"
                    message="Item Deleted Successfully!"
                />

                <CustomizedAlert
                    open={openSuccess}
                    onClose={handleCloseSuccess}
                    severity="success"
                    message="Item Added Successfully!"
                />
            </div>
            <Footer/>
        </>
    )
}

export default InventoryDashboard;
