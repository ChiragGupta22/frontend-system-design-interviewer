import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllUsers } from  "../services/authservices";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getAllUsers(token);
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-10">AI Interviewer</h1>

        <nav className="space-y-3">
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-600"
          >
            Users
          </button>

          <button
            onClick={() => navigate("/admin/answers")}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800"
          >
            Answers
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-2">Users</h2>
        <p className="text-gray-400 mb-8">
          Manage and view all registered users.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-400">Loading users...</p>
          ) : error ? (
            <p className="p-6 text-red-400">{error}</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-gray-400">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">User ID</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="border-t border-gray-800 hover:bg-gray-800/50"
                    >
                      <td className="p-4 text-gray-400">{index + 1}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4 text-gray-300">{user.email}</td>
                      <td className="p-4 text-gray-400">{user.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;