import React, {useState} from "react";
import "./inventoryDashboard.css";
import {Modal} from "@mui/material";
import AddItem from "../../admin/View Inventory/Modals/Add Item/Add Item";
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import inventory from "../../../data/data.json";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";

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

    return(
        <>
            <SupplierNavbar/>

            <div className="supplierViewInventoryOuter">
                <div className="supplierViewInventoryInner">
                    <div className="supplierSearchAndButtons">
                        <div className="supplierViewInventorySearch">
                            <SearchBar></SearchBar>
                        </div>
                        <div className="supplierViewInventoryButtons">
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
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Add Item
                            </CustomizedButton>

                            <CustomizedButton
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
                                    fontWeight: '500',
                                    marginTop: '0.625em',
                                    textTransform: 'none',
                                    textAlign: 'center',
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
                    <AddItem onClose={() => { setVisible(false)}} ></AddItem>
                </Modal>
            </div>

            <Footer/>
        </>
    )
}

export default InventoryDashboard;
