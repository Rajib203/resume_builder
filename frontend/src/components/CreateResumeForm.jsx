import React, { useState, useContext } from "react";
import { Input } from "./Inputs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/UserContext";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ get user token

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.CREATE,
        { title },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // ✅ send token to backend
          },
        }
      );

      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-2xl font-bold mb-2 text-gray-800">
        Create New Resume
      </h3>
      <p className="text-gray-600 mb-8">
        Give your resume a title to get started. You can customize everything later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Resume Title"
          placeholder="e.g. Software Engineer Resume"
          type="text"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl">
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
