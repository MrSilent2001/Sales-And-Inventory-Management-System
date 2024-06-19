// import * as React from 'react';
// import './purchaseItem.css';
// import CenteredModal from "../../../../../components/Modal/modal";
// import BasicTextField from "../../../../../components/Form Inputs/textfield";
// import CustomizedButton from "../../../../../components/Button/button";
// import { useEffect, useState } from "react";
// import axios from "axios";
//
// function PurchaseItem(props) {
//     const { inventoryItem, supplier, onClose } = props;
//
//     const [id, setId] = useState('');
//     const [brand, setBrand] = useState('');
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [manufacturer, setManufacturer] = useState('');
//     const [colour, setColour] = useState('');
//     const [category, setCategory] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [unitPrice, setUnitPrice] = useState('');
//     const [purchaseQuantity, setPurchaseQuantity] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);
//
//     const token = localStorage.getItem('accessToken');
//
//     useEffect(() => {
//         console.log(supplier);
//     }, []);
//
//     useEffect(() => {
//         if (inventoryItem) {
//             setId(inventoryItem.id);
//             setBrand(inventoryItem.productBrand);
//             setName(inventoryItem.productName);
//             setDescription(inventoryItem.productDescription);
//             setManufacturer(inventoryItem.productManufacturer);
//             setColour(inventoryItem.productColour);
//             setCategory(inventoryItem.productCategory);
//             setQuantity(inventoryItem.productQuantity);
//             setUnitPrice(inventoryItem.productUnitPrice);
//         }
//     }, [inventoryItem]);
//
//     useEffect(() => {
//         if (unitPrice && purchaseQuantity) {
//             setTotalPrice(unitPrice * purchaseQuantity);
//         }
//     }, [unitPrice, purchaseQuantity]);
//
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //
//     //     const newProduct = {
//     //         productName: name,
//     //         productBrand: brand,
//     //         productManufacture: manufacturer,
//     //         productCategory: category,
//     //         productDescription: description,
//     //         productImage: inventoryItem.productImage,
//     //         productColor: colour,
//     //         productQuantity: Number(quantity),
//     //         productSellingPrice: Number(unitPrice)
//     //     };
//     //
//     //     const newPurchaseOrder = {
//     //         supplierId: supplier.id,
//     //         supplierName: supplier.username,
//     //         Address: supplier.address,
//     //         mail: supplier.email,
//     //         contact_number: supplier.contactNo,
//     //         items: inventoryItem.id,
//     //         status: "pending",
//     //         createdDate: new Date().toISOString().split('T')[0]
//     //     };
//     //
//     //     axios.all([
//     //         axios.post('http://localhost:9000/product/create', newProduct),
//     //         axios.post('http://localhost:9000/purchaseOrder/create', newPurchaseOrder),
//     //     ], {
//     //         headers: {
//     //             Authorization: `Bearer ${token}`,
//     //         },
//     //     }).then(axios.spread((productRes, orderRes) => {
//     //         console.log(productRes.data);
//     //         console.log(orderRes.data);
//     //         onClose();
//     //     })).catch(err => {
//     //         console.log(err);
//     //     });
//     // };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         const newProduct = {
//             productName: name,
//             productBrand: brand,
//             productManufacture: manufacturer,
//             productCategory: category,
//             productDescription: description,
//             productImage: inventoryItem.productImage,
//             productColor: colour,
//             productQuantity: Number(quantity),
//             productSellingPrice: Number(unitPrice)
//         };
//
//         const newPurchaseOrder = {
//             supplierId: supplier.id,
//             supplierName: supplier.username,
//             Address: supplier.address,
//             mail: supplier.email,
//             contact_number: supplier.contactNo,
//             items: inventoryItem.id,
//             status: "pending",
//             createdDate: new Date().toISOString().split('T')[0]
//         };
//
//         axios.all([
//             axios.post('http://localhost:9000/product/create', newProduct, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }),
//             axios.post('http://localhost:9000/purchaseOrder/create', newPurchaseOrder, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//         ])
//             .then(axios.spread((productRes, orderRes) => {
//                 console.log(productRes.data);
//                 console.log(orderRes.data);
//                 onClose();
//             }))
//             .catch(err => {
//                 console.log('Error:', err);
//                 if (err.response && err.response.status === 401) {
//                     console.log('Unauthorized: Token may be invalid or expired.');
//                 }
//             });
//     };
//
//     return (
//         <CenteredModal>
//             <div className="updateItemOuter">
//                 <div className="updateItemModel">
//                     <h2>Purchase Item</h2>
//                     <div className="updateItemForm">
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Product Id</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField value={id} readOnly />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Product Name</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="Name"
//                                     value={name}
//                                     onChange={(e) => {
//                                         setName(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Item Category</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="Category"
//                                     value={category}
//                                     onChange={(e) => {
//                                         setCategory(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Quantity</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="Qty"
//                                     value={quantity}
//                                     onChange={(e) => {
//                                         setQuantity(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Unit Price</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="Price"
//                                     value={unitPrice}
//                                     onChange={(e) => {
//                                         setUnitPrice(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Number of Items to Purchase</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="purchaseQuantity"
//                                     value={purchaseQuantity}
//                                     onChange={(e) => {
//                                         setPurchaseQuantity(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformField">
//                             <div className="updateItemidField">
//                                 <h5>Total Price</h5>
//                             </div>
//                             <div className="updateItemidInput">
//                                 <BasicTextField
//                                     name="totalPrice"
//                                     value={totalPrice}
//                                     readOnly
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="updateItemformFieldButtons">
//                             <div className="updateItemcancelButton">
//                                 <CustomizedButton
//                                     onClick={() => onClose(false)}
//                                     hoverBackgroundColor="#f11717"
//                                     style={{
//                                         backgroundColor: '#960505',
//                                         width: '10em',
//                                         height: '2.75em',
//                                         fontSize: '0.8em',
//                                         padding: '0.5em 0.625em',
//                                         borderRadius: '0.35em',
//                                         fontWeight: '500',
//                                         marginTop: '0.625em'
//                                     }}>
//                                     Cancel
//                                 </CustomizedButton>
//                             </div>
//
//                             <div className="updateItemupdateButton">
//                                 <CustomizedButton
//                                     onClick={handleSubmit}
//                                     hoverBackgroundColor="#2d3ed2"
//                                     style={{
//                                         backgroundColor: '#242F9B',
//                                         border: '1px solid #242F9B',
//                                         width: '10em',
//                                         height: '2.75em',
//                                         fontSize: '0.8em',
//                                         padding: '0.5em 0.625em',
//                                         borderRadius: '0.35em',
//                                         fontWeight: '500',
//                                         marginTop: '0.625em'
//                                     }}>
//                                     Purchase
//                                 </CustomizedButton>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </CenteredModal>
//     );
// }
//
// export default PurchaseItem;

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

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        console.log(supplier);
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            productName: name,
            productBrand: brand,
            productManufacture: manufacturer,
            productCategory: category,
            productDescription: description,
            productImage: inventoryItem.productImage,
            productColor: colour,
            productQuantity: Number(quantity),
            productSellingPrice: Number(unitPrice)
        };

        const newPurchaseOrder = {
            supplierId: supplier.id,
            supplierName: supplier.username,
            Address: supplier.address,
            mail: supplier.email,
            contact_number: supplier.contactNo,
            items: inventoryItem.id,
            status: "pending",
            createdDate: new Date().toISOString().split('T')[0]
        };

        axios.all([
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
                console.log(productRes.data);
                console.log(orderRes.data);
                onClose();
            }))
            .catch(err => {
                console.log('Error:', err);
                if (err.response && err.response.status === 401) {
                    console.log('Unauthorized: Token may be invalid or expired.');
                }
            });
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
                                    value={purchaseQuantity}
                                    onChange={(e) => {
                                        setPurchaseQuantity(e.target.value);
                                    }}
                                />
                            </div>
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
                                        width: '10em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
                                    }}>
                                    Cancel
                                </CustomizedButton>
                            </div>

                            <div className="updateItemupdateButton">
                                <CustomizedButton
                                    onClick={handleSubmit}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '10em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
                                    }}>
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

