// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/product/findProduct/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.productName}</h1>
            <img src={product.productImage} alt={product.productName} />
            <p>{product.productDescription}</p>
            <p>Price: Rs. {product.productPrice}</p>
            <button>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;
