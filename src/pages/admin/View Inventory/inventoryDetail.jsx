import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './inventoryDetail.css';
import axios from "axios";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import Avatar from "@mui/material/Avatar";
import CustomizedButton from "../../../components/Button/button";
import PurchaseItem from "./Modals/Purchase Item/purchaseItem";
import { Modal } from "@mui/material";

function InventoryDetail() {
    const { itemId } = useParams();
    const [inventoryItem, setInventoryItem] = useState({ productImage: [] });
    const [supplier, setSupplier] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [visible, setVisible] = useState(false);
    const [deleteItemVisible, setDeleteItemVisible] = useState(false);

    const token = localStorage.getItem('accessToken');

    const getInventoryItem = () => {
        const url = `http://localhost:9000/inventory/get/${itemId}`;

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            setInventoryItem(res.data);
            setSupplierId(res.data.sellerId);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        getInventoryItem();
    }, [itemId]);

    useEffect(() => {
        if (supplierId) {
            getSupplierDetails();
        }
    }, [supplierId]);

    const getSupplierDetails = () => {
        const url = `http://localhost:9000/supplier/getSupplier/${supplierId}`;

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            setSupplier(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <InventoryNavbar />

            <div className="inventoryDetailsOuter">
                <div className="inventoryDetailsInner">

                    <div className="productImage">
                        {inventoryItem.productImage.length > 0 && (
                            <Avatar
                                src={inventoryItem.productImage[0]}
                                sx={{ width: 440, height: 440, border: 1, borderRadius: 3, borderColor: 'black' }}
                            />
                        )}
                    </div>

                    <div className="productDetails">
                        <div className="productTopic">
                            <h1>{inventoryItem.productName}</h1>
                        </div>

                        <div className="productDataOuter">

                            <div className="productDetailOuter">
                                <div className="productDetail">
                                    <div className="productDetailTopic">
                                        <h3>Product ID : </h3>
                                    </div>
                                    <div className="loadedProductDetail" style={{ marginRight: '6em' }}>
                                        <h3>{inventoryItem.id}</h3>
                                    </div>
                                </div>

                                <div className="productDetail">
                                    <div className="productDetailTopic">
                                        <h3>Product Brand : </h3>
                                    </div>
                                    <div className="loadedProductDetail">
                                        <h3>{inventoryItem.productBrand}</h3>
                                    </div>
                                </div>

                                <div className="productDetail" style={{ alignItems: 'flex-start' }}>
                                    <div className="productDetailTopic" style={{ marginRight: '1em' }}>
                                        <h3>Product Description : </h3>
                                    </div>
                                    <div className="loadedProductDetail" style={{ width: '36em', textAlign: 'left' }}>
                                        <h3>{inventoryItem.productDescription}</h3>
                                    </div>
                                </div>

                                <div className="productDetail">
                                    <div className="productDetailTopic">
                                        <h3>Manufacturer : </h3>
                                    </div>
                                    <div className="loadedProductDetail" style={{ marginRight: '3em' }}>
                                        <h3>{inventoryItem.productManufacturer}</h3>
                                    </div>

                                    <div className="productDetailTopic">
                                        <h3>Product Colour : </h3>
                                    </div>
                                    <div className="loadedProductDetail">
                                        <h3>{inventoryItem.productColour}</h3>
                                    </div>
                                </div>

                                <div className="productDetail">
                                    <div className="productDetailTopic">
                                        <h3>Quantity : </h3>
                                    </div>
                                    <div className="loadedProductDetail" style={{ marginRight: '3em' }}>
                                        <h3>{inventoryItem.productQuantity}</h3>
                                    </div>
                                </div>

                                <div className="productDetail">
                                    <div className="productDetailTopic">
                                        <h3>Offering Price : </h3>
                                    </div>
                                    <div className="loadedProductDetail">
                                        <h3>Rs.{inventoryItem.productUnitPrice}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="supplierDetailOuter">
                                <div className="supplierDetail">

                                    <div className="supplierDetailTopic">
                                        <h3>Supplier ID : </h3>
                                    </div>
                                    <div className="loadedSupplierDetail" style={{ marginRight: '6em' }}>
                                        <h3>{supplier.id}</h3>
                                    </div>

                                    <div className="supplierDetailTopic">
                                        <h3>Supplier Name : </h3>
                                    </div>
                                    <div className="loadedSupplierDetail">
                                        <h3>{supplier.username}</h3>
                                    </div>

                                </div>
                            </div>

                            <div className="productDetailButtons">

                                <CustomizedButton
                                    onClick={() => setVisible(true)}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9em',
                                        height: '2.85em',
                                        fontSize: '0.75em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginRight: '2em'
                                    }}
                                >
                                    Add Item
                                </CustomizedButton>

                            </div>

                        </div>
                    </div>

                </div>

                <Modal open={visible}>
                    <PurchaseItem onClose={() => setVisible(false)} inventoryItem={inventoryItem} supplier={supplier}/>
                </Modal>

            </div>

            <Footer />
        </>
    );
}

export default InventoryDetail;
