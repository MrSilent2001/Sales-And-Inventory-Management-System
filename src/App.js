import './App.css';
import Navbar from "./layout/navbar/navbar";
import OrderStatus from './pages/Order Status/orderStatus';
import Footer from './layout/footer/footer';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <OrderStatus/>
        <Footer/>
    </div>
  );
}

export default App;
