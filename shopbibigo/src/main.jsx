import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider as MaterialTailwindProvider } from "@material-tailwind/react";
import { ThemeProvider as CustomThemeProvider } from "./components/Context/ThemeContext"; // ⬅️ renomeado
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <MaterialTailwindProvider>
        <App />
      </MaterialTailwindProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
