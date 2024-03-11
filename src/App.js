import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from './layout/footer/footer';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Cart/>
        <Footer/>
    </div>
  );
}

export default App;
