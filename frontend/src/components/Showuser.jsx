import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Showuser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("https://virtuos-form-assignment.onrender.com/users");

        const data = response.data.map((user) => ({
          ...user,
          totalMarks:
            (user.round1Marks || 0) +
            (user.round2Marks || 0) +
            (user.round3Marks || 0) +
            (user.techMarks || 0),
        }));

        data.sort((a, b) => b.totalMarks - a.totalMarks);

        data.forEach((user, index) => {
          user.rank = index + 1;
        });
        setUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">User Rankings</h1>
      <div className="flex-grow w-full flex justify-center items-center">
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-3 px-4 border-b text-center">Rank</th>
                <th className="py-3 px-4 border-b text-center">User</th>
                <th className="py-3 px-4 border-b text-center">College Name</th>
                <th className="py-3 px-4 border-b text-center">
                  Round 1 Marks
                </th>
                <th className="py-3 px-4 border-b text-center">
                  Round 2 Marks
                </th>
                <th className="py-3 px-4 border-b text-center">
                  Round 3 Marks
                </th>
                <th className="py-3 px-4 border-b text-center">
                  Technical Marks
                </th>
                <th className="py-3 px-4 border-b text-center">Total Marks</th>
                <th className="py-3 px-4 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">
                    {user.rank}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.user}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.collegeName}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.round1Marks}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.round2Marks}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.round3Marks}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.techMarks}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.totalMarks}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {user.totalMarks > 35 ? (
                      <span className="text-green-600">Pass</span>
                    ) : (
                      <span className="text-red-600">Fail</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-6 mb-4">
        <Link to={"/"}>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Showuser;
