import React, { useState } from "react";
import type { User } from "../types/User";

type Props = {
  editingUser?: User | null;
  onSave: (data: Omit<User, "id" | "criadoEm">, id?: string) => void;
  onCancel: () => void;
};

export const Form: React.FC<Props> = ({ editingUser, onSave, onCancel }) => {
  const [nome, setNome] = useState(editingUser?.nome || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [cargo, setCargo] = useState(editingUser?.cargo || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ nome, email, cargo }, editingUser?.id);
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        {editingUser ? "Editar Usuário" : "Novo Usuário"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="border p-2 rounded-md"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-md"
          required
        />
        <input
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Cargo"
          className="border p-2 rounded-md"
          required
        />
        <div className="flex justify-end gap-3 mt-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
