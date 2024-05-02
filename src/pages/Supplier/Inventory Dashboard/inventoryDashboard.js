import React, { useState} from "react";
import "./inventoryDashboard.css";
import {Modal} from "@mui/material";
import AddItem from "../../admin/View Inventory/Modals/Add Item/Add Item";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import CustomizedAlert from "../../../components/Alert/alert";
import axios from "axios";

const columns = [
    {columnId: 'inventoryId', label: 'Inventory Id', minWidth: 170, align: 'center'},
    {columnId: 'itemDescription', label: 'Item Description', minWidth: 100, align: 'center'},
    {
        columnId: 'itemCategory',
        label: 'Item Category',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'quantity',
        label: 'Quantity',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

    {
        columnId: 'price',
        label: 'Unit Price',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //     id: 'inventoryStatus',
    //     label: 'Inventory Status',
    //     minWidth: 170,
    //     align: 'center',
    //     format: (value) => value.toLocaleString('en-US'),
    // }
];

// const rows = inventory.inventory || [];





function InventoryDashboard(){
    const [visible,setVisible] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);

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

    const handleAddItem = (newItem) => {
        setTableData([...tableData, newItem]);
        setVisible(false);

        handleClickSuccess();

    };

    // Function to handle deletion of a row
    const handleDeleteButtonClick = () => {
        if (selectedRowId !== null) {
            const updatedData = tableData.filter(row => row.id !== selectedRowId);
            setTableData(updatedData);
            handleClickError();
        }
    };

    // Fetch Items function with query parameter
    const fetchItems = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/supplier/search?keyword=${query}`);
            //setSuppliers(response.data);
        } catch (error) {
            handleClickError();
            console.error('Error fetching Items:', error);
        }
    };

    const rows = tableData;
    //
    // const mappedData = rows.map(row => ({
    //     inventoryId: row.inventoryId,
    //     itemDescription: row.itemDescription,
    //     itemCategory: row.itemCategory,
    //     Quantity: row.Quantity,
    //     Price: row.Price
    //
    //     //inventoryStatus: row.inventoryStatus
    // }));

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
                                onClick={()=>setVisible(true)}
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

                            <CustomizedButton
                                onClick={handleDeleteButtonClick}
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#960505',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                }}>
                                Delete Item
                            </CustomizedButton>
                        </div>
                    </div>

                    <div className="supplierItemTable">
                        <CustomizedTable
                            columns={columns}
                            rows={tableData}
                            onSelectRow={setSelectedRowId}
                            style={{width: '85%'}}
                        />
                    </div>
                </div>

                <Modal open={visible}>
                    <AddItem onSubmit={handleAddItem} onClose={() => { setVisible(false)}} ></AddItem>
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
