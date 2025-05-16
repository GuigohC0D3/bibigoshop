import React from "react";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const AppNavbar = ({ cartCount = 0 }) => {
  const [showModal, setShowModal] = React.useState(false);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "#produtos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  const renderCartIcon = () => (
    <Link to="/carrinho" className="relative cursor-pointer">
      <ShoppingCartIcon className="h-6 w-6 text-blue-700" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Navbar padrão */}
      <MTNavbar className="z-50 mx-auto max-w-screen-xl px-4 py-3 lg:px-8 lg:py-4 shadow-md bg-white rounded-none">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Typography
            as="a"
            href="#"
            className="text-xl font-bold text-blue-700 hover:text-blue-900 transition-colors duration-300"
          >
            Shop Bibigo
          </Typography>

          {/* Hamburguer mobile com espaçamento adequado */}
          <div className="lg:hidden flex items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center p-3 rounded-md focus:outline-none transition hover:bg-blue-100"
            >
              <Bars3Icon className="h-7 w-7 text-blue-700" />
            </button>
          </div>

          {/* Navegação Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex gap-8 items-center">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-base font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              {renderCartIcon()}
              <Button
                variant="gradient"
                size="sm"
                className="text-blue-700 hover:text-blue-900"
              >
                Login
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="text-blue-700 hover:text-blue-900 shadow-md"
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </MTNavbar>

      {/* MODAL FULLSCREEN */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-blue-700 bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300">
          {/* Fechar modal */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 text-white"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          {/* Links */}
          <ul className="flex flex-col items-center justify-center gap-8 text-white text-2xl font-semibold">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:underline"
                  onClick={() => setShowModal(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Ações */}
          <div className="mt-12 flex flex-col gap-4 w-2/3">
            <Button
              fullWidth
              variant="gradient"
              className="bg-white text-blue-700"
              onClick={() => setShowModal(false)}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="gradient"
              className="bg-white text-blue-700"
              onClick={() => setShowModal(false)}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
