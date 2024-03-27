import {BrowserRouter as Router} from "react-router-dom";
import {PageRouting} from "./routes/PageRoutes";
import "./App.css";
import {NavbarRouting} from "./routes/NavbarRoutes";

function App() {
  return (
    <Router>
        <NavbarRouting/>
        <PageRouting/>
    </Router>

  );
}

export default App;
