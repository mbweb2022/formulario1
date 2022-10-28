import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./Formulario";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;
