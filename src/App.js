import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from './layout/footer/footer';
import CancelOrder from './pages/cancel Order/cancelOrder';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <CancelOrder/>
        <Footer/>
    </div>
  );
}

export default App;
