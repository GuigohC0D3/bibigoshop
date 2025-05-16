import React from "react";

const AddressInputs = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* Rua */}
      <div className="col-span-1 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rua*
        </label>
        <input
          type="text"
          {...register("endereco.rua")}
          placeholder="Digite sua rua"
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.rua ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.rua && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.rua.message}
          </p>
        )}
      </div>

      {/* Número */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número*
        </label>
        <input
          type="text"
          {...register("endereco.numero")}
          placeholder="123"
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.numero ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.numero && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.numero.message}
          </p>
        )}
      </div>

      {/* Bairro */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bairro*
        </label>
        <input
          type="text"
          {...register("endereco.bairro")}
          placeholder="Digite seu bairro"
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.bairro ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.bairro && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.bairro.message}
          </p>
        )}
      </div>

      {/* Cidade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cidade*
        </label>
        <input
          type="text"
          {...register("endereco.cidade")}
          placeholder="Sua cidade"
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.cidade ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.cidade && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.cidade.message}
          </p>
        )}
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado*
        </label>
        <input
          type="text"
          {...register("endereco.estado")}
          placeholder="SP, RJ, MG..."
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.estado ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.estado && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.estado.message}
          </p>
        )}
      </div>

      {/* CEP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CEP*
        </label>
        <input
          type="text"
          {...register("endereco.cep")}
          placeholder="00000-000"
          className={`w-full px-4 py-2 rounded-full border ${
            errors?.endereco?.cep ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors?.endereco?.cep && (
          <p className="text-sm text-red-500 mt-1">
            {errors.endereco.cep.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressInputs;
