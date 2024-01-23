import './App.css';
import RefundRequest from "./pages/refundRequest/refundRequest";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <RefundRequest/>
        <Footer></Footer>
    </div>
  );
}

export default App;
