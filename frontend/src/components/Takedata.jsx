import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserApi } from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";
import Formfield from "./Formfield";

function Takeinfo() {
  const [formData, setFormData] = useState({
    user: "",
    collegeName: "",
    round1Marks: "",
    round2Marks: "",
    round3Marks: "",
    techMarks: "",
    maxRoundMarks: "",
    maxTechMarks: ""
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
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

    // Check required fields
    if (!formData.user) newErrors.push("Name is required!");
    if (!formData.collegeName) newErrors.push("College name is required!");
    if (!formData.round1Marks) newErrors.push("Round 1 marks are required!");
    if (!formData.round2Marks) newErrors.push("Round 2 marks are required!");
    if (!formData.round3Marks) newErrors.push("Round 3 marks are required!");
    if (!formData.techMarks) newErrors.push("Technical marks are required!");

    // Validate round marks
    if (
      formData.round1Marks &&
      (isNaN(formData.round1Marks) ||
        formData.round1Marks < 0 ||
        formData.round1Marks > formData.maxRoundMarks)
    ) {
      newErrors.push(`Round 1 marks must be between 0 and ${formData.maxRoundMarks}!`);
    }
    if (
      formData.round2Marks &&
      (isNaN(formData.round2Marks) ||
        formData.round2Marks < 0 ||
        formData.round2Marks > formData.maxRoundMarks)
    ) {
      newErrors.push(`Round 2 marks must be between 0 and ${formData.maxRoundMarks}!`);
    }
    if (
      formData.round3Marks &&
      (isNaN(formData.round3Marks) ||
        formData.round3Marks < 0 ||
        formData.round3Marks > formData.maxRoundMarks)
    ) {
      newErrors.push(`Round 3 marks must be between 0 and ${formData.maxRoundMarks}!`);
    }

    // Validate tech marks
    if (
      formData.techMarks &&
      (isNaN(formData.techMarks) ||
        formData.techMarks < 10 ||
        formData.techMarks > formData.maxTechMarks)
    ) {
      newErrors.push(`Technical marks must be between 10 and ${formData.maxTechMarks}!`);
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
          <Formfield
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            label="Name"
            maxLength={30}
          />
          <Formfield
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            label="College Name"
            maxLength={50}
          />
          <select name="maxRoundMarks" onChange={handleChange} value={formData.maxRoundMarks}>
            <option disabled>Max Round Marks</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select name="maxTechMarks" onChange={handleChange} value={formData.maxTechMarks}>
            <option disabled>Max Technical Marks</option>
            {[...Array(11).keys()].map((i) => (
              <option key={i + 10} value={i + 10}>
                {i + 10}
              </option>
            ))}
          </select>
          <Formfield
            type="number"
            name="round1Marks"
            value={formData.round1Marks}
            onChange={handleChange}
            label="Round 1 Marks"
            min={0}
            max={formData.maxRoundMarks}
            step="0.01"
          />
          <Formfield
            type="number"
            name="round2Marks"
            value={formData.round2Marks}
            onChange={handleChange}
            label="Round 2 Marks"
            min={0}
            max={formData.maxRoundMarks}
            step="0.01"
          />
          <Formfield
            type="number"
            name="round3Marks"
            value={formData.round3Marks}
            onChange={handleChange}
            label="Round 3 Marks"
            min={0}
            max={formData.maxRoundMarks}
            step="0.01"
          />
          <Formfield
            type="number"
            name="techMarks"
            value={formData.techMarks}
            onChange={handleChange}
            label="Tech Marks"
            min={10}
            max={formData.maxTechMarks}
            step="0.01"
          />
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
