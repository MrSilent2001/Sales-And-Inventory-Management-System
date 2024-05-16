import Login from "../pages/login & SignUp/login/login";
import {Link, Route, Routes} from "react-router-dom";
import Signup from "../pages/login & SignUp/SignUp/signup";
import SalesLanding from "../pages/admin/Landing Pages/Sales Landing/salesLanding";
import CustomerDashboard from "../pages/admin/Customer Dashboard/customerDashboard";
import CustomerOrderHistory from "../pages/Customer/Order History/customerOrderHistory";
import RemoveCustomers from "../pages/admin/Remove Customers/removeCustomers";
import UpdateCustomers from "../pages/admin/Update Customers/updateCustomers";
import View from "../pages/Customer/View/view";
import InventoryLanding from "../pages/admin/Landing Pages/Inventory Landing/inventoryLanding";
import ApprovedRefundsTable from "../pages/admin/Refunds/Customer/Approved Refunds/ApprovedRefundsTable";
import RefundsManager from "../pages/admin/Refunds/Inventory/RefundRequestsTable/RefundsManager";
import SalesApprovedRefundsTable from "../pages/admin/Refunds/Customer/Sales_Approved Refunds/SalesApprovedRefundsTable";
import SalesRefundDenialForm from "../pages/admin/Refunds/Customer/Refund Denial Form/SalesRefundDenialForm";
import SalesViewRequest from "../pages/admin/Refunds/Customer/Generated Refund Request/SalesViewRequest";
import Success from "../pages/Customer/Cart/success";
import Cancel from "../pages/Customer/Cart/cancel";
import CustomerRefundRequest from "../pages/Customer/Refund/Request Refund/CustomerRefundRequest ";
import GeneratedCustomerRefundRequest from "../pages/Customer/Refund/Generated Request/Generated Customer Refund Request";
import OrderDetails from "../pages/admin/Orders/Sales/Order Details/orderDetails";
import CancelOrder from "../pages/admin/Orders/Sales/Cancel Orders/cancelOrders";
import OrderStatus from "../pages/admin/Orders/Sales/Order Status/orderStatus";
import SalesRefundRequestsTable from "../pages/admin/Refunds/Customer/View Sales Refund Requests/SalesRefundRequestsTable";
import InventoryDashboard from "../pages/Supplier/Inventory Dashboard/inventoryDashboard";
import InventoryRefundRequestsTable from "../pages/admin/Refunds/Inventory/RefundRequestsTable/InventoryRefundRequestsTable";
import UpdateSupplier from "../pages/Supplier/Update Supplier/updateSupplier";
import PendingOrders from "../pages/admin/Orders/Sales/Pending Orders/pendingOrders";
import PaymentDashboard from "../pages/admin/Payment Dashboard/paymentDashboard";
import AdminOrderHistory from "../pages/admin/Admin Order History/Admin Order History";
import DiscountDashboard from "../pages/admin/Discounts/discountDashboard";
import CustomerHome from "../pages/Customer/Home/Customer Home Page";
import ProductCatalog from "../pages/Customer/Product Catelog/productCatalog";
import Cart from "../pages/Customer/Cart/shoppingCart";
import CustomerProfile from "../pages/Customer/Customer Profile/Profile/customerProfile";
import CustomerRefunds from "../pages/Customer/Refund/Refund Dashboard/Customer Refunds";
import SupplierProfile from "../pages/Supplier/Supplier Profile/SupplierProfile";
import ViewInventory from "../pages/admin/View Inventory/viewInventory";
import ViewSupplier from "../pages/admin/Supplier Dashboard/viewSupplier";
import PurchaseOrderDashboard from "../pages/admin/Orders/Inventory/Order Dashboard/PurchaseOrderDashboard";
import InventoryPayments from "../pages/admin/Payment Dashboard/Inventory/inventoryPayments";

export function PageRouting() {
    return (
        <div className="App">
            <Routes>

                <Route path="/" element={<Login/>}/>


{/*===================================================Public Routes=================================================================*/}

                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

{/*===================================================Protected Routes==============================================================*/}

                {/*Supplier view routes*/}
                <Route path="/supplierDashboard" element={<InventoryDashboard/>}/>
                <Route path="/supplierProfile" element={<SupplierProfile/>}/>
                <Route path="/updateSupplier" element={<UpdateSupplier/>}/>


                {/*Customer view routes*/}
                <Route path="/customerHome" element={<CustomerHome/>}/>
                <Route path="/products" element={<ProductCatalog/>}/>
                <Route path="/cart" element={<Cart/>}/>

                {/*Payment Gateway*/}
                <Route path="/success" element={<Success/>}/>
                <Route path="/cancel" element={<Cancel/>}/>

                <Route path="/customerProfile" element={<CustomerProfile/>}/>
                <Route path="/customerorderhistory" element={<CustomerOrderHistory/>}/>
                <Route path="/updateCustomers" element={<UpdateCustomers/>}/>

                <Route path="/refundRequests" element={<CustomerRefunds/>}/>
                <Route path="/createrefund" element={<CustomerRefundRequest/>}/>
                <Route path="/generatedrefund" element={<GeneratedCustomerRefundRequest/>}/>


                {/*Admin view routes - sales*/}
                <Route path="/salesLanding" element={<SalesLanding/>}/>

                <Route path="/pendingOrders" element={<PendingOrders/>}/>
                <Route path="/orderStatus" element={<OrderStatus/>}/>
                <Route path="/orderDetails" element={<OrderDetails/>}/>
                <Route path="/cancelOrders" element={<CancelOrder/>}/>

                <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>

                <Route path="/customerdashboard" element={<CustomerDashboard/>}/>
                <Route path="/removeCustomers" element={<RemoveCustomers/>}/>

                <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>
                <Route path="/ApprovedRefundsTable" element={<ApprovedRefundsTable/>}/>

                <Route path="/discountdashboard" element={<DiscountDashboard/>}/>



                {/*Admin view routes - Inventory*/}
                <Route path="/inventoryLanding" element={<InventoryLanding/>}/>

                <Route path="/viewInventory" element={<ViewInventory/>}/>
                <Route path="/viewSupplier" element={<ViewSupplier/>}/>
                <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>

                <Route path="/InventoryRefundRequestsTable" element={<InventoryRefundRequestsTable/>}/>
                <Route path="/SalesApprovedRefundsTable" element={<SalesApprovedRefundsTable/>}/>

                <Route path="/inventoryPayments" element={<InventoryPayments/>}/>
                <Route path="/logout" element={<Login/>}/>


                <Route path="/AdminOrderHistory" element={<AdminOrderHistory/>}/>
                <Route path="/view" element={<View/>}/>

                <Route path="/RefundsManager" element={<RefundsManager/>}/>

                <Route path="/SalesRefundDenialForm" element={<SalesRefundDenialForm/>}/>
                <Route path="/SalesViewRequest" element={<SalesViewRequest/>}/>
                <Route path="/SalesRefundRequestTable" element={<SalesRefundRequestsTable/>}/>

            </Routes>
        </div>
    );
}

