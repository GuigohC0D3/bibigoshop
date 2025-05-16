import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-white text-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-blue-800 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Bem-vindo à <span className="text-blue-600">Shop Bibigo</span>
      </motion.h1>

      <motion.p
        className="text-gray-600 text-lg max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Os melhores produtos com os melhores preços. Tudo que você precisa em um só lugar, com entrega rápida e qualidade garantida.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Button
          size="lg"
          color="blue"
          className="px-8 py-2 text-lg text-blue-600 hover:text-blue-900 shadow-md"
          onClick={() => navigate("/home")}
        >
          Começar agora
        </Button>
      </motion.div>
    </div>
  );
};

export default Inicio;
