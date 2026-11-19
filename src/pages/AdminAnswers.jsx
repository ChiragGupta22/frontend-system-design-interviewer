
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllUsersMarks } from "../services/authservices";

const AdminAnswers = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getAllUsersMarks(token);

        console.log("All Answers:", res.data);

        setAnswers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Answers Error:", err);
        setError("Failed to load answers");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 shrink-0">
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
            className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800"
          >
            Users
          </button>

          <button
            onClick={() => navigate("/admin/answers")}
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-600"
          >
            Answers
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 min-w-0">

        <h2 className="text-3xl font-bold mb-2">
          User Answers
        </h2>

        <p className="text-gray-400 mb-8">
          View all submitted answers and interview marks.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

          {loading ? (
            <p className="p-6 text-gray-400">
              Loading answers...
            </p>
          ) : error ? (
            <p className="p-6 text-red-400">
              {error}
            </p>
          ) : answers.length === 0 ? (
            <p className="p-6 text-gray-400">
              No answers found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Project Name</th>
                    
                    <th className="p-4">Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {answers.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-t border-gray-800 hover:bg-gray-800/50"
                    >
                      <td className="p-4 text-gray-400">
                        {index + 1}
                      </td>

                      <td className="p-4 font-medium">
                        {item.user_name || "N/A"}
                      </td>

                      <td className="p-4 text-gray-300">
                        {item.email || "N/A"}
                      </td>

                      <td className="p-4 min-w-72 max-w-md">
                        <p className="whitespace-pre-wrap wrap-break-word">
                          {item.project_name || "N/A"}
                        </p>
                      </td>

                      

                      <td className="p-4 font-semibold text-green-400">
                        {item.marks ?? "N/A"} / 10
                      </td>
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

export default AdminAnswers;
