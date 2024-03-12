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

function App() {
  return (
    <div className="App">
        <Navbar/>
      
        {/*<ViewOrders/>*/}
        {/*<CustomerOrders/>*/}
       {/* <UpdateCustomers/>  */} 
        <CustomerManagement/>
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
