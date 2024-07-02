import * as React from 'react';
import './purchaseItem.css';
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import { useEffect, useState } from "react";
import axios from "axios";

function PurchaseItem(props) {
    const { inventoryItem, supplier, onClose } = props;

    const [id, setId] = useState('');
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [colour, setColour] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [purchaseQuantity, setPurchaseQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (inventoryItem) {
            setId(inventoryItem.id);
            setBrand(inventoryItem.productBrand);
            setName(inventoryItem.productName);
            setDescription(inventoryItem.productDescription);
            setManufacturer(inventoryItem.productManufacturer);
            setColour(inventoryItem.productColour);
            setCategory(inventoryItem.productCategory);
            setQuantity(inventoryItem.productQuantity);
            setUnitPrice(inventoryItem.productUnitPrice);
        }
    }, [inventoryItem]);

    useEffect(() => {
        if (unitPrice && purchaseQuantity) {
            setTotalPrice(unitPrice * purchaseQuantity);
        }
    }, [unitPrice, purchaseQuantity]);

    const handlePurchaseQuantityChange = (e) => {
        const value = e.target.value;
        if (Number(value) > Number(quantity)) {
            setErrorMessage(`Cannot purchase more than available quantity (${quantity})`);
        } else {
            setErrorMessage('');
            setPurchaseQuantity(Number(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (purchaseQuantity > quantity) {
            setErrorMessage(`Cannot purchase more than available quantity (${quantity})`);
            return;
        }

        const newPurchaseOrder = {
            supplierId: supplier.id,
            supplierName: supplier.username,
            Address: supplier.address,
            mail: supplier.email,
            contact_number: supplier.contactNo,
            items: inventoryItem.id,
            quantity: purchaseQuantity,
            total_amount: (Number(unitPrice) * Number(purchaseQuantity)).toString(),
            status: "pending",
            createdDate: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await axios.get(`http://localhost:9000/product/getByName/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                await axios.all([
                    axios.post('http://localhost:9000/purchaseOrder/create', newPurchaseOrder, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ])
                    .then(axios.spread((productRes, orderRes) => {
                        onClose();
                    }))
                    .catch(err => {
                        if (err.response && err.response.status === 401) {
                            console.log('Unauthorized: Token may be invalid or expired.');
                        }
                    });
            } else {
                const itemQuantity = {
                    productQuantity: Number(purchaseQuantity) + Number(response.data.productQuantity),
                };

                await axios.all([
                    axios.put(`http://localhost:9000/product/updateQuantity/${response.data.id}`, itemQuantity, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.post('http://localhost:9000/purchaseOrder/create', newPurchaseOrder, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ])
                    .then(axios.spread((productRes, orderRes) => {
                        onClose();
                    }))
                    .catch(err => {
                        if (err.response && err.response.status === 401) {
                            console.log('Unauthorized: Token may be invalid or expired.');
                        }
                    });
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                await axios.all([
                    axios.post('http://localhost:9000/product/create', newProduct, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.post('http://localhost:9000/purchaseOrder/create', newPurchaseOrder, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ])
                    .then(axios.spread((productRes, orderRes) => {
                        onClose();
                    }))
                    .catch(err => {
                        if (err.response && err.response.status === 401) {
                            console.log('Unauthorized: Token may be invalid or expired.');
                        }
                    });
            } else {
                console.log('Error:', error);
            }
        }
    };

    return (
        <CenteredModal>
            <div className="updateItemOuter">
                <div className="updateItemModel">
                    <h2>Purchase Item</h2>
                    <div className="updateItemForm">
                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Product Id</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={id} readOnly />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Product Name</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Category"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Qty"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Price"
                                    value={unitPrice}
                                    onChange={(e) => {
                                        setUnitPrice(e.target.value);
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Number of Items to Purchase</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="purchaseQuantity"
                                    type="number"
                                    onChange={handlePurchaseQuantityChange}
                                />
                            </div>
                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="totalPrice"
                                    value={totalPrice}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="updateItemformFieldButtons">
                            <div className="updateItemcancelButton">
                                <CustomizedButton
                                    onClick={() => onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        color: 'white',
                                    }}
                                >
                                    Cancel
                                </CustomizedButton>
                            </div>
                            <div className="updateItempurchaseButton">
                                <CustomizedButton
                                    onClick={handleSubmit}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        width: '9.5em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                    }}
                                >
                                    Purchase
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    );
}

export default PurchaseItem;
