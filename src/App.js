import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from './layout/footer/footer';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Catalog/>
        <Footer/>
    </div>
  );
}

export default App;
