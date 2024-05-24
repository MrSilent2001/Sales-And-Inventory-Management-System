import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function ProductDetail(){
    const { productId } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/product/findProduct/${productId}`);
                setProduct(response.data);
                console.log(response.data.productImage);

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();

    }, [productId]);




}

export default ProductDetail;