import './App.css';

import GeneratedRequest from "./pages/generatedRequest/generatedRequest";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <GeneratedRequest></GeneratedRequest>
        <Footer></Footer>
    </div>
  );
}

export default App;
