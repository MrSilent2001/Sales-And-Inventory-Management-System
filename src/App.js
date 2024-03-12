import './App.css';
import Navbar from "./layout/navbar/navbar";
import LoginForm from './pages/login/loginForm';
import Signup from './pages/signup/signup';
import Footer from "./layout/footer/footer";
import CustomerManagement from './pages/customer management-01/customer management-01';
import CustomerOrders from './pages/customer management-02/customer management-02';
import RemoveCustomers from './pages/remove customers/remove customers';
import CustomerProfile from './pages/customer profile/customer profile';
import CustomerProfileManagement from './pages/customerProfile management/customerProfile management';
import UpdateCustomers from './pages/update customers/update customers';
import ViewOrders from './pages/view orders/view orders';
import SupplierProfile from './pages/supplier profile/supplier profile';
import UpdateSupplier from './pages/update Supplier/updateSupplier';

function App() {
  return (
    <div className="App">
        <Navbar/>
      
        {/*<CustomerManagement/>*/}
        {/*<CustomerOrders/>*/}
       {/* <UpdateCustomers/>  */} 
       {/* <ViewOrders/>  */} 
       {/* <UpdateSupplier/>  */} 
        <SupplierProfile/>
       {/*<CustomerProfileManagement/>*/}
        {/*<CustomerProfile/>*/}
        {/*removeCustomers*/}
         {/*<Signup/>*/}
        {/* <LoginForm/> / */}
      <Footer/>

       
    </div>
  );
}

export default App;
