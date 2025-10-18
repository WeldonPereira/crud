import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { User } from "../types/User";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export const Table: React.FC<Props> = ({ users, onEdit, onDelete }) => (
  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-3 text-left">Nome</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Cargo</th>
        <th className="p-3 text-left">Ações</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u.id} className="border-t">
          <td className="p-3">{u.nome}</td>
          <td className="p-3">{u.email}</td>
          <td className="p-3">{u.cargo}</td>
          <td className="p-3 flex gap-3">
            <button
              onClick={() => onEdit(u)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(u.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
