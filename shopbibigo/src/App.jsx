import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/InicialPage/InicialPage";
import Home from "./pages/HomePage/Home";
import Carrinho from "./pages/Carrinho/Carrinho"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
