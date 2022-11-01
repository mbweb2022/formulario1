import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Form } from "./Fom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
