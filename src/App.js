import './App.css';
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp/signup";
import SalesLanding from "./pages/Customer/Sales Landing/salesLanding";
import DiscountDashboard from "./pages/discounts dashboard/discountDashboard";
import PaymentDashboard from "./pages/payment dashboard/paymentDashboard";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/" element={<SalesLanding/>}/>

            /*sales navbar routes*/
            <Route path="/salesdashboard" element={<SalesLanding/>}/>
            <Route path="/paymentdashboard" element={<PaymentDashboard/>}/>
            <Route path="/customerdashboard" element={<CustomerHome/>}/>
            <Route path="/refunddashboard" element={<SalesLanding/>}/>
            <Route path="/discountdashboard" element={<DiscountDashboard/>}/>
            <Route path="/logout" element={<SalesLanding/>}/>

        </Routes>
    </div>
  );
}

export default App;
