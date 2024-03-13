import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp/signup";
import SalesLanding from "./pages/Customer/Sales Landing/salesLanding";
import DiscountDashboard from "./pages/discounts dashboard/discountDashboard";
import PaymentDashboard from "./pages/payment dashboard/paymentDashboard";
import CustomerRefundRequest from "./pages/Customer/Refund/Customer Refund Request ";
import CustomerRefunds from "./pages/Customer/Refund/Customer Refunds";
import GeneratedCustomerRefundRequest from "./pages/Customer/Refund/Generated Customer Refund Request";
import CustomerDashboard from "./pages/Customer/Dashboard/customerDashboard";
import CustomerProfile from "./pages/Customer/Profile/customerProfile";
import CustomerOrderHistory from "./pages/Customer/Order History/customerOrderHistory";
import CustomersProfileDetails from "./pages/Customer/Profile/cutomersProfileDetails";
import RemoveCustomers from "./pages/Customer/Remove Customers/removeCustomers";
import UpdateCustomers from "./pages/Customer/Update Customers/updateCustomers.js";
import View from "./pages/Customer/View/view";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/" element={<SalesLanding/>}/>
            <Route path="/generatedrefund" element={<GeneratedCustomerRefundRequest/>}/>
            <Route path="/createrefund" element={<CustomerRefundRequest/>}/>

            /*sales navbar routes*/
            <Route path="/salesdashboard" element={<SalesLanding/>}/>
            <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>
            <Route path="/customerHome" element={<CustomerHome/>}/>
            <Route path="/refunddashboard" element={<CustomerRefunds/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<GeneratedCustomerRefundRequest/>}/>


            /*Customer navbar routes*/
            <Route path="/customerdashboard" element={<CustomerDashboard/>}/>
            <Route path="/customerorderhistory" element={<CustomerOrderHistory/>}/>
            <Route path="/customerprofiledetails" element={<CustomersProfileDetails/>}/>
            <Route path="/customerprofile" element={<CustomerProfile/>}/>
            <Route path="/removeCustomers" element={<RemoveCustomers/>}/>
            <Route path="/updateCustomers" element={<UpdateCustomers/>}/>
            <Route path="/view" element={<View/>}/>

        </Routes>
    </div>
  );
}

export default App;
