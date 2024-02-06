import './App.css';
import Navbar from "./layout/navbar/navbar";
import LoginForm from './pages/login/loginForm';
import Signup from './pages/signup/signup';
import Footer from "./layout/footer/footer";


function App() {
  return (
    <div className="App">
        <Navbar/>
         <LoginForm/>
        {/* <Signup/> / */}
      <Footer/>

       
    </div>
  );
}

export default App;
