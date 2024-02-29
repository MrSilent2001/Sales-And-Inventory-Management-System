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
            <Route path="/customerdashboard" element={<CustomerHome/>}/>
            <Route path="/refunddashboard" element={<CustomerRefunds/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<GeneratedCustomerRefundRequest/>}/>

        </Routes>
    </div>
  );
}

export default App;
