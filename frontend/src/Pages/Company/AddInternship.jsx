// // frontend/src/Pages/Company/AddInternship.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddInternship = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     duration: '',
//     stipend: '',
//   });

//   const [errors, setErrors] = useState({
//     duration: '',
//     stipend: '',
//   });

//   const navigate = useNavigate();

//   const validateDuration = (value) => {
//     const duration = parseInt(value);
//     if (isNaN(duration) || duration <= 0) {
//       return 'Duration must be a positive number';
//     }
//     if (duration > 24) { 
//       return 'Duration cannot exceed 24 months';
//     }
//     return '';
//   };

//   const validateStipend = (value) => {
//     const stipend = parseFloat(value);
//     if (isNaN(stipend) || stipend < 0) {
//       return 'Stipend must be a non-negative number';
//     }
//     if (stipend > 15000) { 
//       return 'Please verify stipend amount';
//     }
//     return '';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Validate duration and stipend on change
//     if (name === 'duration') {
//       setErrors(prev => ({ ...prev, duration: validateDuration(value) }));
//     }
//     if (name === 'stipend') {
//       setErrors(prev => ({ ...prev, stipend: validateStipend(value) }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all fields before submission
//     const durationError = validateDuration(formData.duration);
//     const stipendError = validateStipend(formData.stipend);

//     if (durationError || stipendError) {
//       setErrors({
//         duration: durationError,
//         stipend: stipendError,
//       });
//       return;
//     }

//     try {
//       await axios.post('/add-internship', formData, {
//         headers: { usertype: 'recruiter' },
//       });
//       alert('Internship added successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error adding internship:', error);
//       alert('Failed to add internship');
//     }
//   };

//   const handleCancel = () => {
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Internship</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none min-h-[100px]"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
//             required
//           />
//           <div>
//             <input
//               type="number"
//               name="duration"
//               placeholder="Duration (in months)"
//               value={formData.duration}
//               onChange={handleChange}
//               min="1"
//               max="24"
//               className={`w-full bg-gray-100 p-3 rounded-lg focus:outline-none ${
//                 errors.duration ? 'border border-red-500' : ''
//               }`}
//               required
//             />
//             {errors.duration && (
//               <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
//             )}
//           </div>
//           <div>
//             <input
//               type="number"
//               name="stipend"
//               placeholder="Stipend (in USD)"
//               value={formData.stipend}
//               onChange={handleChange}
//               min="0"
//               step="0.01"
//               className={`w-full bg-gray-100 p-3 rounded-lg focus:outline-none ${
//                 errors.stipend ? 'border border-red-500' : ''
//               }`}
//               required
//             />
//             {errors.stipend && (
//               <p className="text-red-500 text-sm mt-1">{errors.stipend}</p>
//             )}
//           </div>
//           <div className="flex gap-4 pt-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
//               disabled={!!(errors.duration || errors.stipend)}
//             >
//               Post Internship
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddInternship;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api'; // Using API utility configured with base URL and headers

const AddInternship = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    stipend: '',
  });

  const [errors, setErrors] = useState({
    duration: '',
    stipend: '',
  });

  const navigate = useNavigate();

  const validateDuration = (value) => {
    const duration = parseInt(value);
    if (isNaN(duration) || duration <= 0) {
      return 'Duration must be a positive number';
    }
    if (duration > 24) {
      return 'Duration cannot exceed 24 months';
    }
    return '';
  };

  const validateStipend = (value) => {
    const stipend = parseFloat(value);
    if (isNaN(stipend) || stipend < 0) {
      return 'Stipend must be a non-negative number';
    }
    if (stipend > 15000) {
      return 'Please verify stipend amount';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate duration and stipend on change
    if (name === 'duration') {
      setErrors((prev) => ({ ...prev, duration: validateDuration(value) }));
    }
    if (name === 'stipend') {
      setErrors((prev) => ({ ...prev, stipend: validateStipend(value) }));
    }
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

    try {
      // Make API request to add internship
      const token=localStorage.getItem('token')
      console.log(token)
      const response = await API.post('/internships/addinternship', formData);

      alert('Internship added successfully!');
      navigate('/'); // Redirect to dashboard or homepage
    } catch (error) {
      console.error('Error adding internship:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to add internship');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Internship</h1>
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
                errors.duration ? 'border border-red-500' : ''
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
                errors.stipend ? 'border border-red-500' : ''
              }`}
              required
            />
            {errors.stipend && (
              <p className="text-red-500 text-sm mt-1">{errors.stipend}</p>
            )}
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
