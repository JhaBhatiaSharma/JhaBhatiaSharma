// //frontend/src/Pages/CVBuilder.jsx
// import React, { useState } from 'react';
// import { FileText, Download, Upload, Plus } from 'lucide-react';

// const CVBuilder = ({ isOpen, onClose }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState('professional');
//   const [cvData, setCVData] = useState({
//     personalInfo: {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '+1 234 567 8900',
//       location: 'San Francisco, CA'
//     },
//     education: [
//       {
//         school: '',
//         degree: '',
//         field: '',
//         startDate: '',
//         endDate: '',
//         gpa: ''
//       }
//     ],
//     experience: [
//       {
//         title: '',
//         company: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         description: ''
//       }
//     ],
//     skills: []
//   });

//   const [activeSection, setActiveSection] = useState('templates');

//   if (!isOpen) return null;

//   const templates = [
//     {
//       id: 'professional',
//       name: 'Professional',
//       description: 'Clean and modern design suitable for corporate roles',
//       previewImage: '/api/placeholder/200/280'
//     },
//     {
//       id: 'creative',
//       name: 'Creative',
//       description: 'Colorful and unique design for creative positions',
//       previewImage: '/api/placeholder/200/280'
//     },
//     {
//       id: 'academic',
//       name: 'Academic',
//       description: 'Traditional format for academic and research positions',
//       previewImage: '/api/placeholder/200/280'
//     }
//   ];

//   const renderTemplateSelection = () => (
//     <div className="grid grid-cols-3 gap-4">
//       {templates.map((template) => (
//         <div 
//           key={template.id}
//           onClick={() => setSelectedTemplate(template.id)}
//           className={`border rounded-lg p-4 cursor-pointer transition-all ${
//             selectedTemplate === template.id 
//               ? 'border-blue-500 bg-blue-50' 
//               : 'hover:border-gray-300'
//           }`}
//         >
//           <img
//             src={template.previewImage}
//             alt={template.name}
//             className="w-full rounded-lg mb-3"
//           />
//           <h3 className="font-medium">{template.name}</h3>
//           <p className="text-sm text-gray-600 mt-1">{template.description}</p>
//         </div>
//       ))}
//     </div>
//   );

//   const renderEditor = () => (
//     <div className="grid grid-cols-2 gap-6">
//       <div className="space-y-6">
//         <div>
//           <h3 className="font-medium mb-3">Personal Information</h3>
//           <div className="space-y-3">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full p-2 border rounded"
//               value={cvData.personalInfo.name}
//               onChange={(e) => setCVData({
//                 ...cvData,
//                 personalInfo: { ...cvData.personalInfo, name: e.target.value }
//               })}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//               value={cvData.personalInfo.email}
//               onChange={(e) => setCVData({
//                 ...cvData,
//                 personalInfo: { ...cvData.personalInfo, email: e.target.value }
//               })}
//             />
//           </div>
//         </div>

//         <div>
//           <h3 className="font-medium mb-3">Education</h3>
//           <div className="space-y-3">
//             {cvData.education.map((edu, index) => (
//               <div key={index} className="p-3 border rounded">
//                 <input
//                   type="text"
//                   placeholder="School"
//                   className="w-full p-2 border rounded mb-2"
//                   value={edu.school}
//                   onChange={(e) => {
//                     const newEducation = [...cvData.education];
//                     newEducation[index].school = e.target.value;
//                     setCVData({ ...cvData, education: newEducation });
//                   }}
//                 />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="text"
//                     placeholder="Degree"
//                     className="p-2 border rounded"
//                     value={edu.degree}
//                     onChange={(e) => {
//                       const newEducation = [...cvData.education];
//                       newEducation[index].degree = e.target.value;
//                       setCVData({ ...cvData, education: newEducation });
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Field of Study"
//                     className="p-2 border rounded"
//                     value={edu.field}
//                     onChange={(e) => {
//                       const newEducation = [...cvData.education];
//                       newEducation[index].field = e.target.value;
//                       setCVData({ ...cvData, education: newEducation });
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//             <button
//               onClick={() => setCVData({
//                 ...cvData,
//                 education: [...cvData.education, { school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }]
//               })}
//               className="w-full p-2 border rounded flex items-center justify-center gap-2 hover:bg-gray-50"
//             >
//               <Plus className="w-4 h-4" />
//               Add Education
//             </button>
//           </div>
//         </div>

//         <div>
//           <h3 className="font-medium mb-3">Experience</h3>
//           <div className="space-y-3">
//             {cvData.experience.map((exp, index) => (
//               <div key={index} className="p-3 border rounded">
//                 <input
//                   type="text"
//                   placeholder="Job Title"
//                   className="w-full p-2 border rounded mb-2"
//                   value={exp.title}
//                   onChange={(e) => {
//                     const newExperience = [...cvData.experience];
//                     newExperience[index].title = e.target.value;
//                     setCVData({ ...cvData, experience: newExperience });
//                   }}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Company"
//                   className="w-full p-2 border rounded mb-2"
//                   value={exp.company}
//                   onChange={(e) => {
//                     const newExperience = [...cvData.experience];
//                     newExperience[index].company = e.target.value;
//                     setCVData({ ...cvData, experience: newExperience });
//                   }}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   className="w-full p-2 border rounded"
//                   rows={3}
//                   value={exp.description}
//                   onChange={(e) => {
//                     const newExperience = [...cvData.experience];
//                     newExperience[index].description = e.target.value;
//                     setCVData({ ...cvData, experience: newExperience });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               onClick={() => setCVData({
//                 ...cvData,
//                 experience: [...cvData.experience, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
//               })}
//               className="w-full p-2 border rounded flex items-center justify-center gap-2 hover:bg-gray-50"
//             >
//               <Plus className="w-4 h-4" />
//               Add Experience
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="border-l pl-6">
//         <div className="sticky top-0">
//           <h3 className="font-medium mb-3">Preview</h3>
//           <div className="bg-white border rounded-lg p-6 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold">{cvData.personalInfo.name}</h2>
//               <p className="text-gray-600">{cvData.personalInfo.email}</p>
//             </div>

//             {cvData.education.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-medium mb-2">Education</h3>
//                 {cvData.education.map((edu, index) => (
//                   <div key={index} className="mb-2">
//                     <p className="font-medium">{edu.school}</p>
//                     <p className="text-gray-600">{edu.degree} in {edu.field}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {cvData.experience.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-medium mb-2">Experience</h3>
//                 {cvData.experience.map((exp, index) => (
//                   <div key={index} className="mb-3">
//                     <p className="font-medium">{exp.title}</p>
//                     <p className="text-gray-600">{exp.company}</p>
//                     <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-6 border-b">
//           <div className="flex items-center gap-3">
//             <FileText className="w-6 h-6 text-blue-600" />
//             <h2 className="text-xl font-semibold">CV Builder</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:text-gray-800"
//             >
//               Cancel
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Save CV
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={() => setActiveSection('templates')}
//               className={`px-4 py-2 rounded ${
//                 activeSection === 'templates' 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               Choose Template
//             </button>
//             <button
//               onClick={() => setActiveSection('editor')}
//               className={`px-4 py-2 rounded ${
//                 activeSection === 'editor' 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               Edit Content
//             </button>
//           </div>

//           <div className="overflow-auto max-h-[calc(90vh-200px)]">
//             {activeSection === 'templates' ? renderTemplateSelection() : renderEditor()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CVBuilder;

import React, { useState } from 'react';
import { X, Plus, FileText } from 'lucide-react';
import API from '../api';

const CVBuilder = ({ isOpen, onClose }) => {
  const [template, setTemplate] = useState('professional');
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    },
    education: [{
      school: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: ''
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: []
    }],
    skills: [],
    newSkill: ''  // For skill input
  });

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (section === 'newSkill') {  // Add this special case for newSkill
        return {
          ...prev,
          newSkill: value
        };
      }
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value }
      };
    });
  };

  const addSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const removeSkill = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addSection = (section) => {
    const emptyItem = section === 'education' 
      ? { school: '', degree: '', fieldOfStudy: '', graduationYear: '' }
      : { company: '', position: '', startDate: '', endDate: '', description: '', skills: [] };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], emptyItem]
    }));
  };

  const removeSection = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Format the data according to your CV model schema
      const cvData = {
        template: template,
        user: localStorage.getItem('userId'), 
        data: {
          personalInfo: formData.personalInfo,
          skills: formData.skills,
          education: formData.education.map(edu => ({
            school: edu.school,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            graduationYear: edu.graduationYear
          })),
          experience: formData.experience.map(exp => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description
          }))
        }
      };
  
      // Add debug logs
      console.log('Submitting CV data:', cvData);
      console.log('Authorization token:', localStorage.getItem('token'));
  
      // Use the correct endpoint that matches your backend route
      const response = await API.post('/cv', cvData);
      
      console.log('CV saved successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error saving CV:', error);
      console.error('Error response:', error.response?.data);
      
      // More informative error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save CV';
      alert(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto pt-4 pb-4">
      <div className="bg-white rounded-xl w-[90%] max-w-6xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold">CV Builder</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save CV
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Panel - Form */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex gap-4 mb-6">
                <button 
                  className={`px-4 py-2 rounded-lg ${template === 'professional' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setTemplate('professional')}
                >
                  Professional
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${template === 'creative' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setTemplate('creative')}
                >
                  Creative
                </button>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                    value={formData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  />
                </div>
              </div>

              {/* Skills Section */}
<div>
  <h3 className="text-lg font-medium mb-4">Skills</h3>
  <div className="flex gap-2 mb-4">
    <input
      type="text"
      placeholder="Add a skill"
      className="flex-1 p-3 border rounded-lg bg-white text-gray-900 placeholder-gray-500"
      value={formData.newSkill}
      onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
    />
    <button
      onClick={addSkill}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Add
    </button>
  </div>
  <div className="flex flex-wrap gap-2">
    {formData.skills.map((skill, index) => (
      <span
        key={index}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
      >
        {skill}
        <button onClick={() => removeSkill(index)} className="hover:text-blue-900">
          <X className="h-4 w-4" />
        </button>
      </span>
    ))}
  </div>
</div>

              {/* Education Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg mb-4">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="School/University"
                        className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                        value={edu.school}
                        onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="Field of Study"
                          className="flex-1 p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value, index)}
                        />
                        <input
                          type="number"
                          placeholder="Graduation Year"
                          className="w-32 p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                          value={edu.graduationYear}
                          onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value, index)}
                        />
                      </div>
                    </div>
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeSection('education', index)}
                        className="mt-4 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addSection('education')}
                  className="w-full p-3 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  + Add Education
                </button>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Experience</h3>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg mb-4 bg-white text-gray-90 placeholder-gray-500">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                        value={exp.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                        value={exp.position}
                        onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                      />
                      <div className="flex gap-4">
                        <input
                          type="date"
                          placeholder="Start Date"
                          className="flex-1 p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                          value={exp.startDate}
                          onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                        />
                        <input
                          type="date"
                          placeholder="End Date"
                          className="flex-1 p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        className="w-full p-3 border rounded-lg bg-white text-gray-90 placeholder-gray-500"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                      />
                    </div>
                    {formData.experience.length > 1 && (
                      <button
                        onClick={() => removeSection('experience', index)}
                        className="mt-4 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addSection('experience')}
                  className="w-full p-3 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  + Add Experience
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/3 bg-gray-50 rounded-lg p-6">
  <h3 className="text-lg font-medium mb-4">Preview</h3>
  <div className="prose max-w-none">
    {/* Personal Information */}
    <div className="mb-6">
      {formData.personalInfo.fullName && (
        <h1 className="text-2xl font-bold mb-2">{formData.personalInfo.fullName}</h1>
      )}
      <div className="text-gray-600 space-y-1">
        {formData.personalInfo.email && (
          <p>{formData.personalInfo.email}</p>
        )}
        {formData.personalInfo.phone && (
          <p>{formData.personalInfo.phone}</p>
        )}
        {formData.personalInfo.location && (
          <p>{formData.personalInfo.location}</p>
        )}
      </div>
    </div>
              
    {formData.skills.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {skill}
            </span>
          ))}
        </div>
      </>
    )}

              {formData.education.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Education</h2>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium">{edu.school}</h3>
                      <p>{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-gray-600">{edu.graduationYear}</p>
                    </div>
                  ))}
                </>
              )}

              {formData.experience.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Experience</h2>
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-gray-600">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;