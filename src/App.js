import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "../src/pages/login/login";
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
import ApprovedRefundsTable from "./pages/Admin_Inventory/Refund/ApproveRefundsTable/ApprovedRefundsTable";
import GeneratedRequest from "./pages/Admin_Inventory/Refund/generatedRequest/generatedRequest";
import InventoryRefundRequest from "./pages/Admin_Inventory/Refund/InventoryRefundRequest/InventoryRefundRequest";
import RefundRequestsTable from "./pages/Admin_Inventory/Refund/RefundRequestsTable/RefundRequestsTable";
import RefundsManager from "./pages/Admin_Inventory/Refund/RefundRequestsTable/RefundsManager";
import SalesApprovedRefundsTable from "./pages/Admin_Sales/Sales_ApprovedRefundsTable/SalesApprovedRefundsTable";
import RefundDenialForm from "./pages/Admin_Sales/Sales_RefundDenialForm/RefundDenialForm";
import SalesRefundsManager from "./pages/Admin_Sales/Sales_RefundRequestTable/SalesRefundsManager";
import SalesViewRequest from "./pages/Admin_Sales/Sales_ViewRequest/SalesViewRequest";
import Catalog from "./pages/Catalog/catalog";
import OrderDetails from "./pages/Order Details/orderDetails";
import PendingOrders from "./pages/Pending Orders/pendingOrders";
import OrderStatus from "./pages/Order Status/orderStatus";
import CancelOrder from "./pages/Cancel Orders/cancelOrders";
import InventoryDashboard from "./pages/Supplier/Inventory Dashboard/inventoryDashboard";
import SupplierProfile from "./pages/Supplier/Supplier Profile/SupplierProfile";
import Cancel from "./pages/Inventory/Cart/cancel";
import Success from "./pages/Inventory/Cart/success";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>


            <Route path="/" element={<Login/>}/>

            /*Landing Pages*/
            <Route path="/salesLanding" element={<SalesLanding/>}/>
            <Route path="/inventoryLanding" element={<InventoryLanding/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>

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

            <Route path="/ApprovedRefundsTable" element={<ApprovedRefundsTable/>}/>
            <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>

            <Route path="/GeneratedRequest" element={<GeneratedRequest/>}/>
            <Route path="/InventoryRefundRequest" element={<InventoryRefundRequest/>}/>

            <Route path="/RefundRequestsTable" element={<RefundRequestsTable/>}/>
            <Route path="/RefundsManager" element={<RefundsManager/>}/>


            <Route path="/SalesApprovedRefundsTable" element={<SalesApprovedRefundsTable/>}/>
            <Route path="/RefundDenialForm" element={<RefundDenialForm/>}/>
            <Route path="/SalesRefundsManager" element={<SalesRefundsManager/>}/>
            <Route path="/SalesViewRequest" element={<SalesViewRequest/>}/>

            <Route path="/orderDetails" element={<OrderDetails/>}/>
            <Route path="/pendingOrders" element={<PendingOrders/>}/>
            <Route path="/orderStatus" element={<OrderStatus/>}/>
            <Route path="/cancelOrders" element={<CancelOrder/>}/>

            /*Payments*/
            <Route path="/cancel" element={<Cancel/>}/>
            <Route path="/success" element={<Success/>}/>


            /*sales navbar routes*/
            <Route path="/pendingOrders" element={<PendingOrders/>}/>
            <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>


            /*Customer navbar routes*/
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/products" element={<Catalog/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/customerProfile" element={<CustomerProfile/>}/>
            <Route path="/refundRequests" element={<CustomerRefunds/>}/>
            <Route path="/logout" element={<Login/>}/>


            /*Supplier navbar routes*/
            <Route path="/inventoryDashboard" element={<InventoryDashboard/>}/>
            <Route path="/supplierProfile" element={<SupplierProfile/>}/>
            <Route path="/logout" element={<Login/>}/>

            /*Inventory navbar routes*/
            <Route path="/viewInventory" element={<ViewInventory/>}/>
            <Route path="/viewSupplier" element={<ViewSupplier/>}/>
            <Route path="/purchasedOrder" element={<ViewOrder/>}/>
            <Route path="/refundRequests" element={<ViewSupplier/>}/>
            <Route path="/paymentsDashboard" element={<PaymentDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>

        </Routes>
    </div>
  );
}

export default App;
