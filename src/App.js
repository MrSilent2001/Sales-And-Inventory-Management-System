import './App.css';
import Navbar from "./layout/navbar/navbar";
import SalesLanding from "./pages/inventory landing page/inventoryLanding";
import Footer from './layout/footer/footer';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <SalesLanding/>
        <Footer/>
    </div>
  );
}

export default App;
