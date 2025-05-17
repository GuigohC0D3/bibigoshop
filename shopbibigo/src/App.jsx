import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/InicialPage/InicialPage";
import Home from "./pages/HomePage/Home";
import Perfil from "./pages/Perfil/Perfil"
import Carrinho from "./pages/Carrinho/Carrinho"
import LoginCadastro from "./pages/Login/LoginCadastro"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Configuracoes from "./pages/More/Configuracoes"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
