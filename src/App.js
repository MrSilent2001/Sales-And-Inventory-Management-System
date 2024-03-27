import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login & SignUp/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/login & SignUp/SignUp/signup";
import SalesLanding from "./pages/admin/Landing Pages/Sales Landing/salesLanding";
import DiscountDashboard from "./pages/admin/Discounts/discountDashboard";
import PaymentDashboard from "./pages/admin/Payment Dashboard/paymentDashboard";
import CustomerRefunds from "./pages/Customer/Refund/Refund Dashboard/Customer Refunds";
import CustomerDashboard from "./pages/admin/Customer Dashboard/customerDashboard";
import CustomerProfile from "./pages/Customer/Customer Profile/Profile/customerProfile";
import CustomerOrderHistory from "./pages/Customer/Order History/customerOrderHistory";
import RemoveCustomers from "./pages/admin/Remove Customers/removeCustomers";
import UpdateCustomers from "./pages/admin/Update Customers/updateCustomers.js";
import View from "./pages/Customer/View/view";
import InventoryLanding from "./pages/admin/Landing Pages/Inventory Landing/inventoryLanding";
import ViewInventory from "./pages/admin/View Inventory/viewInventory";
import ViewSupplier from "./pages/admin/Supplier Dashboard/viewSupplier";
import PurchaseOrderDashboard from "./pages/admin/Orders/Inventory/Order Dashboard/PurchaseOrderDashboard";
import SalesRefundRequestsTable from "./pages/admin/Refunds/Customer/View Sales Refund Requests/SalesRefundRequestsTable";
import Cart from "./pages/Customer/Cart/shoppingCart";
import ApprovedRefundsTable from "./pages/admin/Refunds/Customer/Approved Refunds/ApprovedRefundsTable";
import InventoryGeneratedRequest from "./pages/admin/Refunds/Customer/Generated Refund Request/SalesViewRequest";
import InventoryRefundRequest from "./pages/admin/Refunds/Inventory/InventoryRefundRequest/InventoryRefundRequest";
import InventoryRefundRequestsTable from "./pages/admin/Refunds/Inventory/InventoryRefundRequest/InventoryRefundRequest";
import RefundsManager from "./pages/admin/Refunds/Inventory/RefundRequestsTable/RefundsManager";
import SalesApprovedRefundsTable from "./pages/admin/Refunds/Customer/Sales_Approved Refunds/SalesApprovedRefundsTable";
import SalesRefundDenialForm from "./pages/admin/Refunds/Customer/Refund Denial Form/SalesRefundDenialForm";
import SalesViewRequest from "./pages/admin/Refunds/Customer/Generated Refund Request/SalesViewRequest";
import Catalog from "./pages/Customer/Product Catelog/catalog";
import PendingOrders from "./pages/admin/Orders/Sales/Pending Orders/pendingOrders";
import InventoryDashboard from "./pages/Supplier/Inventory Dashboard/inventoryDashboard";
import SupplierProfile from "./pages/Supplier/Supplier Profile/SupplierProfile";
import Success from "./pages/Customer/Cart/success";
import Cancel from "./pages/Customer/Cart/cancel";
import CustomerRefundRequest from "./pages/Customer/Refund/Request Refund/Customer Refund Request ";
import GeneratedCustomerRefundRequest from "./pages/Customer/Refund/Generated Request/Generated Customer Refund Request";
import AddDiscounts from "./pages/admin/Discounts/Modal/Add Discount/addDiscounts";

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
            <Route path="/AddDiscount" element={<AddDiscounts/>}/>

            <Route path="/ApprovedRefundsTable" element={<ApprovedRefundsTable/>}/>

            <Route path="/InventoryGeneratedRequest" element={<InventoryGeneratedRequest/>}/>
            <Route path="/InventoryRefundRequest" element={<InventoryRefundRequest/>}/>

            <Route path="/InventoryRefundRequestsTable" element={<InventoryRefundRequestsTable/>}/>
            <Route path="/RefundsManager" element={<RefundsManager/>}/>


            <Route path="/SalesApprovedRefundsTable" element={<SalesApprovedRefundsTable/>}/>
            <Route path="/SalesRefundDenialForm" element={<SalesRefundDenialForm/>}/>
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
            <Route path="/supplierDashboard" element={<InventoryDashboard/>}/>
            <Route path="/supplierProfile" element={<SupplierProfile/>}/>
            <Route path="/logout" element={<Login/>}/>

            {/*Inventory navbar routes*/}
            <Route path="/viewInventory" element={<ViewInventory/>}/>
            <Route path="/viewSupplier" element={<ViewSupplier/>}/>
            <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>
            <Route path="/InventoryRefundRequestsTable" element={<InventoryRefundRequestsTable/>}/>
            <Route path="/paymentsDashboard" element={<PaymentDashboard/>}/>
            <Route path="/logout" element={<Login/>}/>

        </Routes>
    </div>
  );
}

export default App;
