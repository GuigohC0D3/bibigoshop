import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const getPasswordStrength = (password) => {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean)
    .length;

  if (length < 6) return "Muito fraca";
  if (score === 1) return "Fraca";
  if (score === 2) return "Média";
  if (score === 3) return "Forte";
  if (score === 4 && length >= 10) return "Muito forte";
  return "Forte";
};

const PasswordInput = ({
  label = "Senha",
  name = "senha",
  register,
  error,
  watch,
}) => {
  const [visible, setVisible] = useState(false);
  const passwordValue = watch(name);
  const strength = getPasswordStrength(passwordValue || "");

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}*
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          {...register(name)}
          placeholder={`Digite sua ${label.toLowerCase()}`}
          className={`w-full px-4 py-2 rounded-full border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10`}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}

      {passwordValue && (
        <p
          className={`text-sm mt-1 ${
            strength === "Fraca" || strength === "Média"
              ? "text-yellow-600"
              : strength === "Muito fraca"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          Força da senha: <b>{strength}</b>
        </p>
      )}

      {["Muito fraca", "Fraca", "Média"].includes(strength) && passwordValue && (
        <p className="text-xs text-red-500 mt-1">
          Por favor, escolha uma senha mais forte.
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
