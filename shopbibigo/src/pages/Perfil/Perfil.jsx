import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [dadosEditaveis, setDadosEditaveis] = useState({});
  const [previewFoto, setPreviewFoto] = useState("");

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      navigate("/login");
    } else {
      setUsuario(usuarioLogado);
      setDadosEditaveis(usuarioLogado);
      setPreviewFoto(usuarioLogado.avatar);
    }
  }, [navigate]);

  const handleVoltar = () => navigate("/home");

  const handleAlterarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFoto(url);
      const atualizado = { ...dadosEditaveis, avatar: url };
      setDadosEditaveis(atualizado);
      setUsuario(atualizado);
      localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
      alert("Foto de perfil atualizada com sucesso!");
    }
  };

  const handleSalvar = () => {
    localStorage.setItem("usuarioLogado", JSON.stringify(dadosEditaveis));
    setUsuario(dadosEditaveis);
    setEditando(false);
    alert("Perfil atualizado com sucesso!");
  };

  if (!usuario) return null;

  const { nome, email, endereco = {} } = dadosEditaveis;

  return (
    <div className="min-h-screen bg-[#0f5c6d] px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        {/* Voltar */}
        <button
          onClick={handleVoltar}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-6 border-b pb-6 mb-6">
          <img
            src={previewFoto}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border border-blue-400"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{nome}</h2>
            <p className="text-sm text-gray-500">{email}</p>
            <div className="mt-2">
              <label className="text-sm text-blue-600 cursor-pointer hover:underline">
                Alterar foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAlterarFoto}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Formulário de dados */}
        <div className="space-y-4 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Nome</label>
              {editando ? (
                <input
                  type="text"
                  value={dadosEditaveis.nome}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      nome: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{nome}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <p className="mt-1">{email}</p>
            </div>

            <div>
              <label className="block font-medium">Cidade</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.cidade || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, cidade: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.cidade}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Estado</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.estado || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, estado: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.estado}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Rua</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.rua || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, rua: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.rua}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Número</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.numero || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, numero: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.numero}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Bairro</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.bairro || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, bairro: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.bairro}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">CEP</label>
              {editando ? (
                <input
                  type="text"
                  value={endereco.cep || ""}
                  onChange={(e) =>
                    setDadosEditaveis({
                      ...dadosEditaveis,
                      endereco: { ...endereco, cep: e.target.value },
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p className="mt-1">{endereco.cep}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="mt-8 flex justify-end gap-4">
          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Editar Perfil
            </button>
          ) : (
            <button
              onClick={handleSalvar}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Salvar Alterações
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
