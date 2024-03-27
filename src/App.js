import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login & SignUp/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/login & SignUp/SignUp/signup";
import SalesLanding from "./pages/admin/Sales Landing/salesLanding";
import DiscountDashboard from "./pages/discounts/DiscountDashboard/discountDashboard";
import PaymentDashboard from "./pages/payments/paymentDashboard";
import CustomerRefundRequest from "./pages/Customer/Refund/Request Refund/Customer Refund Request ";
import CustomerRefunds from "./pages/Customer/Refund/Refund Dashboard/Customer Refunds";
import GeneratedCustomerRefundRequest from "./pages/Customer/Refund/Generated Request/Generated Customer Refund Request";
import CustomerDashboard from "./pages/admin/Customer Dashboard/customerDashboard";
import CustomerProfile from "./pages/Customer/Customer Profile/Profile/customerProfile";
import CustomerOrderHistory from "./pages/Customer/Order History/customerOrderHistory";
import RemoveCustomers from "./pages/admin/Remove Customers/removeCustomers";
import UpdateCustomers from "./pages/admin/Update Customers/updateCustomers.js";
import View from "./pages/Customer/View/view";
import InventoryLanding from "./pages/admin/Inventory Landing/inventoryLanding";
import ViewInventory from "./pages/admin/View Inventory/viewInventory";
import ViewSupplier from "./pages/Supplier/view supplier/viewSupplier";
import PurchaseOrderDashboard from "./pages/Orders/Inventory/Order Dashboard/PurchaseOrderDashboard";
import SalesRefundRequestsTable from "./pages/Admin_Sales/Sales_RefundRequestTable/SalesRefundRequestsTable";
import Cart from "./pages/Customer/Cart/shoppingCart";
import ApprovedRefundsTable from "./pages/refunds/ApproveRefundsTable/ApprovedRefundsTable";
import GeneratedRequest from "./pages/refunds//generatedRequests/generatedRequest";
import InventoryRefundRequest from "./pages/refunds/Modal/InventoryRefundRequest/InventoryRefundRequest";
import RefundRequestsTable from "./pages/refunds/RefundRequestsTable/RefundRequestsTable";
import RefundsManager from "./pages/refunds/RefundRequestsTable/RefundsManager";
import SalesApprovedRefundsTable from "./pages/Admin_Sales/Sales_ApprovedRefundsTable/SalesApprovedRefundsTable";
import RefundDenialForm from "./pages/Admin_Sales/Sales_RefundDenialForm/RefundDenialForm";
import SalesViewRequest from "./pages/Admin_Sales/Sales_ViewRequest/SalesViewRequest";
import Catalog from "./pages/Customer/Product Catelog/catalog";
import PendingOrders from "./pages/Orders/Sales/Pending Orders/pendingOrders";
import InventoryDashboard from "./pages/Supplier/Inventory Dashboard/inventoryDashboard";
import SupplierProfile from "./pages/Supplier/Supplier Profile/SupplierProfile";
import Success from "./pages/Customer/Cart/success";
import Cancel from "./pages/Customer/Cart/cancel";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            {/*Payment Gateway*/}
            <Route path="/success" element={<Success/>}/>
            <Route path="/cancel" element={<Cancel/>}/>

            <Route path="/" element={<Login/>}/>

            {/*Landing Pages*/}
            <Route path="/salesLanding" element={<SalesLanding/>}/>
            <Route path="/inventoryLanding" element={<InventoryLanding/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>

            <Route path="/generatedrefund" element={<GeneratedCustomerRefundRequest/>}/>
            <Route path="/createrefund" element={<CustomerRefundRequest/>}/>

            <Route path="/customerdashboard" element={<CustomerDashboard/>}/>
            <Route path="/customerorderhistory" element={<CustomerOrderHistory/>}/>
            <Route path="/customerprofile" element={<CustomerProfile/>}/>
            <Route path="/removeCustomers" element={<RemoveCustomers/>}/>
            <Route path="/updateCustomers" element={<UpdateCustomers/>}/>
            <Route path="/view" element={<View/>}/>


            <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>

            <Route path="/ApprovedRefundsTable" element={<ApprovedRefundsTable/>}/>
            <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>

            <Route path="/GeneratedRequest" element={<GeneratedRequest/>}/>
            <Route path="/InventoryRefundRequest" element={<InventoryRefundRequest/>}/>

            <Route path="/RefundRequestsTable" element={<RefundRequestsTable/>}/>
            <Route path="/RefundsManager" element={<RefundsManager/>}/>


            <Route path="/SalesApprovedRefundsTable" element={<SalesApprovedRefundsTable/>}/>
            <Route path="/RefundDenialForm" element={<RefundDenialForm/>}/>
            <Route path="/SalesViewRequest" element={<SalesViewRequest/>}/>



            {/*sales navbar routes*/}
            <Route path="/pendingOrders" element={<PendingOrders/>}/>
            <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>


            {/*Customer navbar routes*/}
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/products" element={<Catalog/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/customerProfile" element={<CustomerProfile/>}/>
            <Route path="/refundRequests" element={<CustomerRefunds/>}/>
            <Route path="/logout" element={<Login/>}/>


            {/*Supplier navbar routes*/}
            <Route path="/inventoryDashboard" element={<InventoryDashboard/>}/>
            <Route path="/supplierProfile" element={<SupplierProfile/>}/>
            <Route path="/logout" element={<Login/>}/>

            {/*Inventory navbar routes*/}
            <Route path="/viewInventory" element={<ViewInventory/>}/>
            <Route path="/viewSupplier" element={<ViewSupplier/>}/>
            <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>
            <Route path="/RefundRequestsTable" element={<RefundRequestsTable/>}/>
            <Route path="/paymentsDashboard" element={<PaymentDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>

        </Routes>
    </div>
  );
}

export default App;
