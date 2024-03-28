import CustomerHome from "../pages/Customer/Home/Customer Home Page";
import Login from "../pages/login & SignUp/login/login";
import {Route, Routes} from "react-router-dom";
import DiscountDashboard from "../pages/admin/Discounts/discountDashboard";
import PaymentDashboard from "../pages/admin/Payment Dashboard/paymentDashboard";
import CustomerRefunds from "../pages/Customer/Refund/Refund Dashboard/Customer Refunds";
import CustomerProfile from "../pages/Customer/Customer Profile/Profile/customerProfile";
import ViewInventory from "../pages/admin/View Inventory/viewInventory";
import ViewSupplier from "../pages/admin/Supplier Dashboard/viewSupplier";
import PurchaseOrderDashboard from "../pages/admin/Orders/Inventory/Order Dashboard/PurchaseOrderDashboard";
import SalesRefundRequestsTable from "../pages/admin/Refunds/Customer/View Sales Refund Requests/SalesRefundRequestsTable";
import Cart from "../pages/Customer/Cart/shoppingCart";
import InventoryRefundRequestsTable from "../pages/admin/Refunds/Inventory/RefundRequestsTable/InventoryRefundRequestsTable";
import Catalog from "../pages/Customer/Product Catelog/catalog";
import PendingOrders from "../pages/admin/Orders/Sales/Pending Orders/pendingOrders";
import InventoryDashboard from "../pages/Supplier/Inventory Dashboard/inventoryDashboard";
import SupplierProfile from "../pages/Supplier/Supplier Profile/SupplierProfile";

export function NavbarRouting() {
    return (
        <div className="App">
            <Routes>

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

