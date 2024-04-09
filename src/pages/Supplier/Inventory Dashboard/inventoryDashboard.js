import React, { useState} from "react";
import "./inventoryDashboard.css";
import {Modal} from "@mui/material";
import AddItem from "../../admin/View Inventory/Modals/Add Item/Add Item";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import inventory from "../../../data/data.json";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import CustomizedAlert from "../../../components/Alert/alert";

const columns = [
    {id: 'inventoryId', label: 'Inventory Id', minWidth: 170, align: 'center'},
    {id: 'itemDescription', label: 'Item Description', minWidth: 100, align: 'center'},
    {
        id: 'itemCategory',
        label: 'Item Category',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Quantity',
        label: 'Quantity',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'inventoryStatus',
        label: 'Inventory Status',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
];

const rows = inventory.inventory || [];

const mappedData = rows.map(row => ({
    inventoryId: row.inventoryId,
    itemDescription: row.itemDescription,
    itemCategory: row.itemCategory,
    Quantity: row.Quantity,
    inventoryStatus: row.inventoryStatus
}));


function InventoryDashboard(){
    const [visible,setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const [tableData, setTableData] = useState(mappedData);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = (newItem) => {
        setTableData([...tableData, newItem]);
        // You may also want to display a success message here

        setVisible(false);
    };

    return(
        <>
            <SupplierNavbar/>

            <div className="supplierViewInventoryOuter">
                <div className="supplierViewInventoryInner">
                    <div className="supplierInvSearchAndButtons">
                        <div className="supplierViewInventorySearch">
                            <SearchBar></SearchBar>
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
                                onClick={handleClick}
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
                            rows={mappedData}
                        />
                    </div>
                </div>

                <Modal open={visible}>
                    <AddItem onSubmit={handleAddItem} onClose={() => { setVisible(false)}} ></AddItem>
                </Modal>

                <CustomizedAlert
                    open={open}
                    onClose={handleClose}
                    severity="error"
                    message="Item Deleted Successfully!"
                />
            </div>
            <Footer/>
        </>
    )
}

export default InventoryDashboard;
