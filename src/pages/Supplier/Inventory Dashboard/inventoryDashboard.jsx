import React, {useEffect, useMemo, useState} from "react";
import "./inventoryDashboard.css";
import {Modal} from "@mui/material";
import AddItem from "./Modals/Add Item/AddItem";
import UpdateItem from "./Modals/Update Item/UpdateItem";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import CustomizedButton from "../../../components/Button/button";
import CustomizedAlert from "../../../components/Alert/alert";
import axios from "axios";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";

function InventoryDashboard(){
    const [visible, setVisible] = useState(false);
    const [updateVisible,setUpdateVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const columns = useMemo(() => [
        { accessorKey: 'sellerId', header: 'Supplier Id', size: 70 },
        { accessorKey: 'productName', header: 'Item Name', size: 100 },
        { accessorKey: 'productDescription', header: 'Item Description', size: 200 },
        { accessorKey: 'productCategory', header: 'Item Category', size: 120 },
        { accessorKey: 'productUnitPrice', header: 'Unit Price', size: 100 },
        { accessorKey: 'productQuantity', header: 'Qty.', size: 100 }
    ], []);

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

    const token = localStorage.getItem('accessToken');

    let rows = inventory;

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/inventory/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of items after deletion
            const response = await axios.get('http://localhost:9000/inventory/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInventory(response.data);
            handleClickSuccess();

        } catch (error) {
            console.error('Error Deleting Items:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9000/inventory/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedItem(response.data);
            setUpdateVisible(true);
        } catch (error) {
            console.error('Error fetching item:', error);
            handleClickError();
        }
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://localhost:9000/inventory/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInventory(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching items:', error);
            }
        };
        fetchInventory();
    }, []);

    const createActionButtons = (id) => {
        return (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => handleUpdate(id)}
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

    const createAddItemButton = () => {
        const buttonStyle = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '9.5em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
        };

        return (
            <CustomizedButton
                onClick={() => setVisible(true)}
                hoverBackgroundColor="#2d3ed2"
                style={buttonStyle}
            >
                Add Item
            </CustomizedButton>
        );
    };


    rows = rows.map(row => ({...row, actions: createActionButtons(row.id)}));

    const handleInventoryAdded = (updatedInventory) => {
        setInventory(updatedInventory);
    };
    const handleInventoryUpdated = (updatedInventory) => {
        setInventory(updatedInventory);
    };

    return(
        <>
            <SupplierNavbar/>

            <div className="supplierViewInventoryOuter">
                <div className="supplierViewInventoryInner">
                    <div className="supplierItemTable">
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={rows}
                                createActions={createActionButtons}
                                renderToolbarItems={createAddItemButton}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>

                <Modal open={visible}>
                    <AddItem
                        onClose={() => { setVisible(false)}}
                        onInventoryAdded={handleInventoryAdded}
                    />
                </Modal>

                <Modal open={updateVisible}>
                    <UpdateItem
                        itemData={selectedItem}
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
