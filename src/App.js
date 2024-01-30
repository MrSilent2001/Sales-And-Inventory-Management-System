import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from './layout/footer/footer';
import OrderDetails from './pages/Order Details/orderDetails';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <OrderDetails/>
        <Footer/>
    </div>
  );
}

export default App;
