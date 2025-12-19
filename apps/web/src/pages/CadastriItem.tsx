import React, { useState } from "react";
import { cadastrarItem } from "../services/itemService";

const CadastroItem: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await cadastrarItem({ nome, descricao, categoria });
    alert("Item cadastrado com imagem automática!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do item" />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Acessórios">Acessórios</option>
        <option value="Eletrônicos">Eletrônicos</option>
        <option value="Vestuário">Vestuário</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroItem;
