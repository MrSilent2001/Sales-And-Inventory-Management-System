import './App.css';
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";
import CustomerHome from "./pages/Customer/Home/Customer Home Page";
import Login from "./pages/login/login";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp/signup";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
