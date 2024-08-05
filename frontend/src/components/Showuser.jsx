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

        let currentRank = 1;
        let rankCount = 1;
        for (let i = 0; i < data.length; i++) {
          if (i > 0 && data[i].totalMarks === data[i - 1].totalMarks) {
            data[i].rank = data[i - 1].rank;
          } else {
            data[i].rank = currentRank;
            currentRank += rankCount;
          }
          rankCount = 1;
        }

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">User Rankings</h1>
      <div className="flex-grow w-full flex justify-center items-center">
        <div className="w-full max-w-full md:max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Rank</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">User</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">College Name</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Round 1 Marks</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Round 2 Marks</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Round 3 Marks</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Technical Marks</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Total Marks</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Status</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">Selected</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.rank}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.user}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.collegeName}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.round1Marks || 0}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.round2Marks || 0}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.round3Marks || 0}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.techMarks || 0}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">{user.totalMarks}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">
                    {user.totalMarks > 35 ? (
                      <span className="text-green-600">Pass</span>
                    ) : (
                      <span className="text-red-600">Fail</span>
                    )}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 border-b text-center">
                    {user.maxRoundMarks &&
                    user.maxTechMarks &&
                    (user.round1Marks / user.maxRoundMarks) * 100 >= 70 &&
                    (user.round2Marks / user.maxRoundMarks) * 100 >= 70 &&
                    (user.round3Marks / user.maxRoundMarks) * 100 >= 70 &&
                    (user.techMarks / user.maxTechMarks) * 100 >= 70 ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4 md:mt-6 mb-4">
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
