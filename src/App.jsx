import {BrowserRouter as Router} from "react-router-dom";
import {PageRouting} from "./routes/PageRoutes";
import "./App.css";

function App() {
  return (
    <Router>
        <PageRouting/>
    </Router>

  );
}

export default App;
