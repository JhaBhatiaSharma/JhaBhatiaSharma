import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AddInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    stipend: "",
    requiredSkills: [],
    newSkill: "",
  });

  const [errors, setErrors] = useState({
    duration: "",
    stipend: "",
  });

  const navigate = useNavigate();

  const validateDuration = (value) => {
    const duration = parseInt(value);
    if (isNaN(duration) || duration <= 0) {
      return "Duration must be a positive number";
    }
    if (duration > 24) {
      return "Duration cannot exceed 24 months";
    }
    return "";
  };

  const validateStipend = (value) => {
    const stipend = parseFloat(value);
    if (isNaN(stipend) || stipend < 0) {
      return "Stipend must be a non-negative number";
    }
    if (stipend > 15000) {
      return "Please verify stipend amount";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate duration and stipend on change
    if (name === "duration") {
      setErrors((prev) => ({ ...prev, duration: validateDuration(value) }));
    }
    if (name === "stipend") {
      setErrors((prev) => ({ ...prev, stipend: validateStipend(value) }));
    }
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, prev.newSkill.trim()],
        newSkill: "", // Clear input after adding
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(
        (skill) => skill !== skillToRemove,
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const durationError = validateDuration(formData.duration);
    const stipendError = validateStipend(formData.stipend);

    if (durationError || stipendError) {
      setErrors({
        duration: durationError,
        stipend: stipendError,
      });
      return;
    }

    const submissionData = {
      ...formData,
      requiredSkills: formData.requiredSkills, // Include skills in submission
      duration: parseInt(formData.duration),
      stipend: parseFloat(formData.stipend),
    };

    delete submissionData.newSkill;

    try {
      // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
      const response = await API.post(
        "/internships/addinternship",
        submissionData,
      );

      alert("Internship added successfully!");
      navigate("/company");
    } catch (error) {
      console.error(
        "Error adding internship:",
        error.response?.data?.message || error.message,
      );
      alert(error.response?.data?.message || "Failed to add internship");
    }
  };

  const handleCancel = () => {
    navigate("/company");
  };

  return (
    <div className="min-h-screen w-screen  bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg shadow-2xl bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Post New Internship
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none min-h-[100px]"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
            required
          />
          <div>
            <input
              type="number"
              name="duration"
              placeholder="Duration (in months)"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              max="24"
              className={`w-full bg-gray-100 p-3 rounded-lg focus:outline-none ${
                errors.duration ? "border border-red-500" : ""
              }`}
              required
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="stipend"
              placeholder="Stipend (in USD)"
              value={formData.stipend}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full bg-gray-100 p-3 rounded-lg focus:outline-none ${
                errors.stipend ? "border border-red-500" : ""
              }`}
              required
            />
            {errors.stipend && (
              <p className="text-red-500 text-sm mt-1">{errors.stipend}</p>
            )}
          </div>
          {/* Add this new section for skills */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Required Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="newSkill"
                placeholder="Add a required skill"
                value={formData.newSkill}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newSkill: e.target.value }))
                }
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
                className="flex-1 bg-gray-100 p-3 rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              disabled={!!(errors.duration || errors.stipend)}
            >
              Post Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInternship;
