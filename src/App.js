import './App.css';
import Navbar from "./layout/navbar/navbar";
import LoginForm from "./pages/login/loginForm"
function App() {
  return (
    <div className="App">
        <Navbar/>
        <LoginForm/>
    </div>
  );
}

export default App;
