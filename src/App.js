import './App.css';
import GeneratedRequest from './pages/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import ApprovedRefundsTable from './pages/ApprovedRefundTable/ApprovedRefundsTable';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <ApprovedRefundsTable/>
        <Footer></Footer>
    </div>
  );
}

export default App;
