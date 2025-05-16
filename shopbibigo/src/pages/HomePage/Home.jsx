import React, { useEffect, useState } from "react";
import AppNavbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [cart, setCart] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate()

    // 🔐 Proteger acesso
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Buscar produtos da API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  useEffect(() => {
    // Carregar carrinho salvo
    const local = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCart(local);
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const existente = carrinhoAtual.find((item) => item.id === produto.id);

    let novoCarrinho;

    if (existente) {
      novoCarrinho = carrinhoAtual.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      novoCarrinho = [...carrinhoAtual, { ...produto, quantidade: 1 }];
    }

    setCart(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    toast.success(`🛒 ${produto.title} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;

    const titulo = produto.title.toLowerCase();
    return titulo.startsWith(termo) || titulo.includes(termo);
  });
  
  return (
    <div>
      <AppNavbar
        cartCount={cart.reduce((acc, item) => acc + item.quantidade, 0)}
      />

      {/* Barra de busca */}
      <div className="max-w-screen-xl mx-auto px-6 mt-6">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Produtos */}
      <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="flex flex-col justify-between border rounded-lg p-4 shadow hover:shadow-md transition duration-200 min-h-[420px]"
            >
              <div>
                <img
                  src={produto.image}
                  alt={produto.title}
                  className="h-40 mx-auto object-contain"
                />
                <h3 className="font-semibold text-lg mt-4">{produto.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {produto.description.slice(0, 80)}...
                </p>
                <p className="text-blue-700 font-bold mt-2 text-lg">
                  R$ {produto.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Nenhum produto encontrado para "{busca}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
