
import CustomerHome from "../pages/Customer/Home/Customer Home Page";
import Login from "../pages/login & SignUp/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "../pages/login & SignUp/SignUp/signup";
import SalesLanding from "../pages/admin/Landing Pages/Sales Landing/salesLanding";
import CustomerDashboard from "../pages/admin/Customer Dashboard/customerDashboard";
import CustomerProfile from "../pages/Customer/Customer Profile/Profile/customerProfile";
import CustomerOrderHistory from "../pages/Customer/Order History/customerOrderHistory";
import RemoveCustomers from "../pages/admin/Remove Customers/removeCustomers";
import UpdateCustomers from "../pages/admin/Update Customers/updateCustomers.js";
import View from "../pages/Customer/View/view";
import InventoryLanding from "../pages/admin/Landing Pages/Inventory Landing/inventoryLanding";
import PurchaseOrderDashboard from "../pages/admin/Orders/Inventory/Order Dashboard/PurchaseOrderDashboard";
import ApprovedRefundsTable from "../pages/admin/Refunds/Customer/Approved Refunds/ApprovedRefundsTable";
import InventoryGeneratedRequest from "../pages/admin/Refunds/Customer/Generated Refund Request/SalesViewRequest";
import InventoryRefundRequest from "../pages/admin/Refunds/Inventory/InventoryRefundRequest/InventoryRefundRequest";
import InventoryRefundRequestsTable from "../pages/admin/Refunds/Inventory/InventoryRefundRequest/InventoryRefundRequest";
import RefundsManager from "../pages/admin/Refunds/Inventory/RefundRequestsTable/RefundsManager";
import SalesApprovedRefundsTable from "../pages/admin/Refunds/Customer/Sales_Approved Refunds/SalesApprovedRefundsTable";
import SalesRefundDenialForm from "../pages/admin/Refunds/Customer/Refund Denial Form/SalesRefundDenialForm";
import SalesViewRequest from "../pages/admin/Refunds/Customer/Generated Refund Request/SalesViewRequest";
import Success from "../pages/Customer/Cart/success";
import Cancel from "../pages/Customer/Cart/cancel";
import CustomerRefundRequest from "../pages/Customer/Refund/Request Refund/Customer Refund Request ";
import GeneratedCustomerRefundRequest from "../pages/Customer/Refund/Generated Request/Generated Customer Refund Request";
import AddDiscounts from "../pages/admin/Discounts/Modal/Add Discount/addDiscounts";

export function PageRouting() {
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

            </Routes>
        </div>
    );
}

