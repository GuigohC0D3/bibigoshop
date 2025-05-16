import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import PasswordInput from "../../components/PassWordInput/PassWordInput";
import AddressInputs from "../../components/AddressInputs/AddressInputs";

// Schemas de validação
const loginSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório"),
});

const cadastroSchema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup.string().min(6, "Mínimo de 6 caracteres").required("Campo obrigatório"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Confirmação obrigatória"),
  endereco: yup.object().shape({
    rua: yup.string().required("Campo obrigatório"),
    numero: yup.string().required("Campo obrigatório"),
    bairro: yup.string().required("Campo obrigatório"),
    cidade: yup.string().required("Campo obrigatório"),
    estado: yup.string().required("Campo obrigatório"),
    cep: yup.string().required("Campo obrigatório"),
  }),
});

const LoginCadastro = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : cadastroSchema),
  });

  const onSubmit = (data) => {
    if (isLogin) {
      const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

      if (
        usuarioSalvo &&
        usuarioSalvo.email === data.email &&
        usuarioSalvo.senha === data.senha
      ) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSalvo));
        navigate("/home");
      } else {
        alert("E-mail ou senha inválidos. Tente novamente.");
      }
      return;
    }

    // Cadastro
    localStorage.setItem("usuarioCadastrado", JSON.stringify(data));
    alert("Conta criada com sucesso!");
    setIsLogin(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3da9fc] to-[#094067] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
        {/* Lado esquerdo (mensagem de boas-vindas) */}
        <div className="hidden md:flex flex-col justify-center bg-[#094067] text-white p-10 w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Hello, welcome!</h1>
          <p className="text-[#90b4ce]">
            Faça login ou cadastre-se para continuar comprando com a{" "}
            <b>Shop Bibigo</b>.<br />
            Estamos felizes em ter você por aqui!
          </p>
        </div>

        {/* Área de formulário */}
        <div className="w-full md:w-1/2 p-6">
          {/* Botões de alternância */}
          <div className="flex justify-between px-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                reset();
              }}
              className={`text-sm font-semibold transition-all duration-300 ${
                isLogin ? "text-[#094067]" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                reset();
              }}
              className={`text-sm font-semibold transition-all duration-300 ${
                !isLogin ? "text-[#094067]" : "text-gray-400"
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* FORMULÁRIO DINÂMICO */}
          {isLogin ? (
            // 👉 FORM LOGIN
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Typography
                variant="h5"
                className="text-[#094067] font-bold mb-4 text-center text-2xl"
              >
                Entrar na conta
              </Typography>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  E-mail<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="exemplo@email.com"
                  className={`w-full px-5 py-3 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Senha<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("senha")}
                  placeholder="Digite sua senha"
                  className={`w-full px-5 py-3 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.senha ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.senha && (
                  <p className="text-xs text-red-500 mt-1">{errors.senha.message}</p>
                )}
              </div>

              {/* Botão Login */}
              <Button
                type="submit"
                fullWidth
                className="bg-[#3da9fc] hover:bg-[#2286d4] text-white font-semibold py-3 rounded-full shadow-lg transition"
              >
                Login
              </Button>
            </form>
          ) : (
            // 👉 FORM CADASTRO
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Typography
                variant="h5"
                className="text-[#094067] font-bold mb-4 text-center text-2xl"
              >
                Criar conta
              </Typography>

              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome*</label>
                <input
                  type="text"
                  {...register("nome")}
                  placeholder="Digite seu nome"
                  className={`w-full px-4 py-2 rounded-full border ${
                    errors.nome ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.nome && (
                  <p className="text-sm text-red-500">{errors.nome.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail*</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu e-mail"
                  className={`w-full px-4 py-2 rounded-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <PasswordInput
                name="senha"
                label="Senha"
                register={register}
                error={errors.senha}
                watch={watch}
                showStrength={true}
              />

              <PasswordInput
                name="confirmarSenha"
                label="Confirmar Senha"
                register={register}
                error={errors.confirmarSenha}
                watch={watch}
                showStrength={false}
              />

              <AddressInputs register={register} errors={errors} />

              <Button
                type="submit"
                fullWidth
                className="bg-[#3da9fc] rounded-full mt-4"
              >
                Criar Conta
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCadastro;
