import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar/Navbar";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(localCarrinho);
  }, []);

  const atualizarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const incrementar = (produto) => {
    const novo = carrinho.map((item) =>
      item.id === produto.id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
    atualizarCarrinho(novo);
  };

  const decrementar = (produto) => {
    const novo = carrinho
      .map((item) =>
        item.id === produto.id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0);
    atualizarCarrinho(novo);
  };

  const remover = (id) => {
    const novo = carrinho.filter((item) => item.id !== id);
    atualizarCarrinho(novo);
  };

  const total = carrinho.reduce(
    (acc, item) => acc + item.price * item.quantidade,
    0
  );

  return (
    <div>
      <AppNavbar
        cartCount={carrinho.reduce((acc, i) => acc + i.quantidade, 0)}
      />
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <p className="text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {carrinho.map((produto) => (
                <div
                  key={produto.id}
                  className="flex items-center gap-4 border rounded p-4 shadow-sm"
                >
                  <img
                    src={produto.image}
                    alt={produto.title}
                    className="h-20 w-20 object-contain"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium">{produto.title}</h2>
                    <p className="text-sm text-gray-500">
                      R$ {produto.price.toFixed(2)} x {produto.quantidade}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => decrementar(produto)}
                      className="px-2 text-black"
                    >
                      -
                    </Button>
                    <span className="font-bold">{produto.quantidade}</span>
                    <Button
                      size="sm"
                      onClick={() => incrementar(produto)}
                      className="px-2 text-black"
                    >
                      +
                    </Button>
                    <TrashIcon
                      onClick={() => remover(produto.id)}
                      className="h-5 w-5 text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <span className="text-lg font-semibold text-blue-700">
                Total: R$ {total.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                color="blue"
                fullWidth
                onClick={() => alert("Compra finalizada!")}
              >
                Finalizar compra
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/home")}
              >
                Continuar comprando
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrinho;
