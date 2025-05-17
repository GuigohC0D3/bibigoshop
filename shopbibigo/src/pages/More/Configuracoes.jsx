import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Configuracoes = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="min-h-screen px-4 py-10 transition-all bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">⚙️ Configurações</h2>

        <div className="flex items-center justify-between">
          <p className="text-md font-medium">Tema Escuro</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
