import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import type { User } from "./types/User";
import { generateId } from "./utils/generateId";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.nome.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.cargo.toLowerCase().includes(search.toLowerCase())
      ),
    [search, users]
  );

  function saveUser(data: Omit<User, "id" | "criadoEm">, id?: string) {
    if (id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u))
      );
    } else {
      const novo: User = {
        id: generateId(),
        criadoEm: new Date().toISOString(),
        ...data,
      };
      setUsers((prev) => [novo, ...prev]);
    }
    setEditing(null);
    setShowForm(false);
  }

  function deleteUser(id: string) {
    if (!confirm("Deseja realmente excluir?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Gerenciador de Usuários</h1>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
          >
            <FaPlus /> Novo
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar..."
          className="border w-full p-2 rounded-md mb-4"
        />

        {showForm ? (
          <Form
            editingUser={editing}
            onSave={saveUser}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        ) : (
          <Table
            users={filtered}
            onEdit={(u) => {
              setEditing(u);
              setShowForm(true);
            }}
            onDelete={deleteUser}
          />
        )}
      </div>
    </div>
  );
}
