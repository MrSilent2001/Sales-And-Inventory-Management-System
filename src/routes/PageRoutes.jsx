import Login from "../pages/login & SignUp/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "../pages/login & SignUp/SignUp/signup";
import CustomerDashboard from "../pages/admin/Customer Dashboard/customerDashboard";
import CustomerOrderHistory from "../pages/Customer/Order History/customerOrderHistory";
import View from "../pages/Customer/View/view";
import ApprovedRefundsTable from "../pages/admin/Refunds/Inventory/Approved Refunds/ApprovedRefundsTable";
import InventoryGeneratedRequest from "../pages/admin/Refunds/Inventory/generatedRequests/InventoryGeneratedRequest";
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
import ProductDetail from "../pages/Customer/Product Detail/productDetail";
import AdminDashboard from "../pages/admin/Admin Dashboard/AdminDashboard";
import UpdateCustomers from "../pages/Customer/Update Customers/updateCustomers";
import AdminLogin from "../pages/login & SignUp/login/adminLogin";
import ProtectedRoute from "./protectedRoutes";
import Redirect from "../pages/Customer/Cart/redirect";
import SupplierHome from "../pages/Supplier/Home/SupplierHomePage";
import SalesReceipt from "../pages/Customer/Cart/Bill/invoice";
import CustomizedTable2 from "../pages/admin/View Inventory/test";

export function PageRouting() {
    return (
        <div className="App">
            <Routes>

                <Route path="/" element={<Login/>}/>
                <Route path="/test" element={<CustomizedTable2/>}/>


{/*===================================================Public Routes=================================================================*/}

                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route path="/admin" element={<AdminLogin/>}/>

                {/*Payment Gateway*/}
                <Route path="/success" element={<Success/>}/>
                <Route path="/redirect" element={<Redirect/>}/>
                <Route path="/cancel" element={<Cancel/>}/>
                <Route path="/bill" element={<SalesReceipt/>}/>

{/*===================================================Protected Routes==============================================================*/}
                <Route element={<ProtectedRoute />}>

                    {/*Supplier view routes*/}
                    <Route path="/supplierHome" element={<SupplierHome/>}/>
                    <Route path="/supplierDashboard" element={<InventoryDashboard/>}/>
                    <Route path="/supplierProfile" element={<SupplierProfile/>}/>
                    <Route path="/updateSupplier" element={<UpdateSupplier/>}/>



                    {/*Customer view routes*/}
                    <Route path="/customerHome" element={<CustomerHome/>}/>
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/products" element={<ProductCatalog/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                    <Route path="/customerProfile" element={<CustomerProfile/>}/>
                    <Route path="/previousOrders" element={<CustomerOrderHistory/>}/>
                    <Route path="/updateProfile" element={<UpdateCustomers/>}/>

                    <Route path="/refundRequests" element={<CustomerRefunds/>}/>
                    <Route path="/createrefund" element={<CustomerRefundRequest/>}/>
                    <Route path="/generatedrefund" element={<GeneratedCustomerRefundRequest/>}/>


                    {/*Admin view routes - sales*/}
                    <Route path="/adminDashboard" element={<AdminDashboard/>}/>

                    <Route path="/pendingOrders" element={<PendingOrders/>}/>
                    <Route path="/orderStatus" element={<OrderStatus/>}/>
                    <Route path="/orderDetails" element={<OrderDetails/>}/>
                    <Route path="/cancelOrders" element={<CancelOrder/>}/>

                    <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>

                    <Route path="/customerdashboard" element={<CustomerDashboard/>}/>

                    <Route path="/viewRefundRequests" element={<SalesRefundRequestsTable/>}/>
                    <Route path="/ApprovedRefundsTable" element={<ApprovedRefundsTable/>}/>

                    <Route path="/discountdashboard" element={<DiscountDashboard/>}/>



                    {/*Admin view routes - Inventory*/}

                    <Route path="/viewInventory" element={<ViewInventory/>}/>
                    <Route path="/viewSupplier" element={<ViewSupplier/>}/>
                    <Route path="/purchasedOrder" element={<PurchaseOrderDashboard/>}/>
                    <Route path="/InventoryGeneratedRequest" element={<InventoryGeneratedRequest/>}/>
                    <Route path="/InventoryRefundRequestsTable" element={<InventoryRefundRequestsTable/>}/>
                    <Route path="/SalesApprovedRefundsTable" element={<SalesApprovedRefundsTable/>}/>

                    <Route path="/inventoryPayments" element={<InventoryPayments/>}/>


                    <Route path="/AdminOrderHistory" element={<AdminOrderHistory/>}/>
                    <Route path="/view" element={<View/>}/>


                    <Route path="/SalesRefundDenialForm" element={<SalesRefundDenialForm/>}/>
                    <Route path="/SalesViewRequest" element={<SalesViewRequest/>}/>
                    <Route path="/SalesRefundRequestTable" element={<SalesRefundRequestsTable/>}/>

                </Route>
            </Routes>
        </div>
    );
}

