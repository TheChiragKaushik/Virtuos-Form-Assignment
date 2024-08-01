import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserApi } from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";

function Takeinfo() {
  const [formData, setFormData] = useState({
    user: "",
    collegeName: "",
    round1Marks: "",
    round2Marks: "",
    round3Marks: "",
    techMarks: "",
  });

  const [errors, setErrors] = useState([]); // Array to hold multiple validation errors
  const [success, setSuccess] = useState(""); // To display success messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    let newErrors = [];

    if (!formData.user) newErrors.push("Name is required!");
    if (!formData.collegeName) newErrors.push("College name is required!");
    if (!formData.round1Marks) newErrors.push("Round 1 marks are required!");
    if (!formData.round2Marks) newErrors.push("Round 2 marks are required!");
    if (!formData.round3Marks) newErrors.push("Round 3 marks are required!");

    if (
      formData.round1Marks &&
      (isNaN(formData.round1Marks) ||
        formData.round1Marks < 0 ||
        formData.round1Marks > 10)
    ) {
      newErrors.push("Round 1 marks must be between 0 and 10!");
    }
    if (
      formData.round2Marks &&
      (isNaN(formData.round2Marks) ||
        formData.round2Marks < 0 ||
        formData.round2Marks > 10)
    ) {
      newErrors.push("Round 2 marks must be between 0 and 10!");
    }

    if (
      formData.round3Marks &&
      (isNaN(formData.round3Marks) ||
        formData.round3Marks < 0 ||
        formData.round3Marks > 10)
    ) {
      newErrors.push("Round 3 marks must be between 0 and 10!");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(addUserApi(formData)).unwrap();
      setSuccess("User added successfully!");
      navigate("/user");
    } catch (err) {
      setErrors([err || "Failed to add user. Please try again."]);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">College Name</label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Round 1 Marks</label>
            <input
              type="number"
              name="round1Marks"
              value={formData.round1Marks}
              onChange={handleChange}
              min={0}
              max={10}
              step="0.01"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Round 2 Marks</label>
            <input
              type="number"
              name="round2Marks"
              value={formData.round2Marks}
              onChange={handleChange}
              min={0}
              max={10}
              step="0.01"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Round 3 Marks</label>
            <input
              type="number"
              name="round3Marks"
              value={formData.round3Marks}
              onChange={handleChange}
              min={0}
              max={10}
              step="0.01"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tech Marks</label>
            <input
              type="number"
              name="techMarks"
              value={formData.techMarks}
              onChange={handleChange}
              min={10}
              max={20}
              step="0.01"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        {errors.length > 0 && (
          <ul className="mt-4 text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>
    </div>
  );
}

export default Takeinfo;
