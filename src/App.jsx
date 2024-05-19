import {BrowserRouter as Router} from "react-router-dom";
import {PageRouting} from "./routes/PageRoutes";
import "./App.css";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
    <Router>
        <AuthProvider>
            <PageRouting/>
        </AuthProvider>
    </Router>

  );
}

export default App;
