import axios from 'axios';

const sendOrderStatusEmail = async (orderId,token, reason = null) => {
    try {
        // Fetch order details
        const orderResponse = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
        const orderData = orderResponse.data;

        // Fetch customer details
        const customerResponse = await axios.get(`http://localhost:9000/customer/findCustomer/${orderData.orderCustomerId}`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        const customerData = customerResponse.data;

        // Fetch all products
        const productsResponse = await axios.get('http://localhost:9000/product/getAllProducts',  {
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        const products = productsResponse.data.reduce((acc, product) => {
            acc[product.id] = product.productName; // Map product ID to its name
            return acc;
        }, {});

        // Replace item IDs with names
        const orderItemsWithName = orderData.orderItems.map(itemId => products[itemId]);
        const formattedOrderItems = orderItemsWithName.join(', ');

        const emailBody = reason
            ? `Your order with order items (${formattedOrderItems}) has been ${orderData.orderStatus} due to the reason of ${reason}.`
            : `Your order with order items (${formattedOrderItems}) has been ${orderData.orderStatus}.`;

        // Prepare email data
        const emailData = {
            receiverName: customerData.username,
            emailSubject: `Your order has been ${orderData.orderStatus}`,
            emailBody,
            receiverEmail: customerData.email,
        };

        // Send email
        await axios.post('http://localhost:9000/email/send/orderStatus', emailData,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        console.log(emailData);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error fetching order or customer details:', error);
    }
};

export default sendOrderStatusEmail;
