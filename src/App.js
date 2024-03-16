import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp/signup";
import SalesLanding from "./pages/Customer/Sales Landing/salesLanding";
import DiscountDashboard from "./pages/discounts dashboard/discountDashboard";
import PaymentDashboard from "./pages/payment dashboard/paymentDashboard";
import CustomerRefundRequest from "./pages/Customer/Refund/Customer Refund Request ";
import CustomerRefunds from "./pages/Customer/Refund/Request Refund/Customer Refunds";
import GeneratedCustomerRefundRequest from "./pages/Customer/Refund/Generated Customer Refund Request";
import CustomerDashboard from "./pages/Customer/Dashboard/customerDashboard";
import CustomerProfile from "./pages/Customer/Customer Profile/Profile/customerProfile";
import CustomerOrderHistory from "./pages/Customer/Order History/customerOrderHistory";
import CustomersProfileDetails from "./pages/Customer/Customer Profile/Profile Details/cutomersProfileDetails";
import RemoveCustomers from "./pages/Customer/Remove Customers/removeCustomers";
import UpdateCustomers from "./pages/Customer/Update Customers/updateCustomers.js";
import View from "./pages/Customer/View/view";
import InventoryLanding from "./pages/Inventory/Inventory Landing Page/inventoryLanding";
import ViewInventory from "./pages/Inventory/View Inventory Page/viewInventory";
import ViewSupplier from "./pages/view supplier page/viewSupplier";
import InventoryOrder from "./pages/Admin_Inventory/purchaseorders/InventoryOrder";
import ViewOrder from "./pages/Admin_Inventory/purchaseorders/ViewOrder/ViewOrder";
import PlaceOrder from "./pages/Admin_Inventory/purchaseorders/PlaceOrder/PlaceOrder";
import PurchaseOrderDashboard from "./pages/Admin_Inventory/purchaseorders/PurchaseOrderDashboard";
import SalesRefundRequestsTable from "./pages/Admin_Sales/Sales_RefundRequestTable/SalesRefundRequestsTable";
import Cart from "./pages/Inventory/Cart/shoppingCart";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/" element={<SalesLanding/>}/>
            <Route path="/inventoryLanding" element={<InventoryLanding/>}/>

            <Route path="/generatedrefund" element={<GeneratedCustomerRefundRequest/>}/>
            <Route path="/createrefund" element={<CustomerRefundRequest/>}/>

            <Route path="/customerdashboard" element={<CustomerDashboard/>}/>
            <Route path="/customerorderhistory" element={<CustomerOrderHistory/>}/>
            <Route path="/customerprofiledetails" element={<CustomersProfileDetails/>}/>
            <Route path="/customerprofile" element={<CustomerProfile/>}/>
            <Route path="/removeCustomers" element={<RemoveCustomers/>}/>
            <Route path="/updateCustomers" element={<UpdateCustomers/>}/>
            <Route path="/view" element={<View/>}/>

            <Route path="/inventoryOrder" element={<InventoryOrder/>}/>
            <Route path="/placeOrder" element={<PlaceOrder/>}/>
            <Route path="/viewOrder" element={<ViewOrder/>}/>
            <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>
            <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>


            /*sales navbar routes*/
            <Route path="/salesdashboard" element={<SalesLanding/>}/>
            <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/refunddashboard" element={<CustomerRefunds/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>


            /*Customer navbar routes*/
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/products" element={<CustomerHome/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/customerProfile" element={<CustomerProfile/>}/>
            <Route path="/refundRequests" element={<CustomerRefunds/>}/>
            <Route path="/logout" element={<Login/>}/>


            /*Supplier navbar routes*/
            <Route path="/inventoryDashbaord" element={<Login/>}/>
            <Route path="/updateprofile" element={<CustomerProfile/>}/>
            <Route path="/logout" element={<Login/>}/>

            /*Inventory navbar routes*/
            <Route path="/viewInventory" element={<ViewInventory/>}/>
            <Route path="/viewSupplier" element={<ViewSupplier/>}/>
            <Route path="/viewOrders" element={<ViewSupplier/>}/>
            <Route path="/refundRequests" element={<ViewSupplier/>}/>
            <Route path="/paymentsDashboard" element={<PaymentDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>




        </Routes>
    </div>
  );
}

export default App;
