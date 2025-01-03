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

import React, { useState, useEffect } from "react";
import { FileText, Download, Upload, Plus } from "lucide-react";
import API from "../api"; // Replace with your Axios instance

const CVBuilder = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [cvData, setCVData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    education: [],
    experience: [],
    skills: [],
  });
  const [activeSection, setActiveSection] = useState("templates");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing CV data on component mount
    const fetchCV = async () => {
      try {
        setLoading(true);
        const response = await API.get("/cv/cv");
        const { template, data } = response.data;
        setSelectedTemplate(template);
        setCVData(data);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching CV:", error.response?.data || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCV();
    }
  }, [isOpen]);

  const handleSaveCV = async () => {
    try {
      setLoading(true);
      await API.post("/cv/cv", {
        template: selectedTemplate,
        data: cvData,
      });
      alert("CV saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving CV:", error.response?.data || error.message);
      alert("Failed to save CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and modern design suitable for corporate roles",
      previewImage: "/api/placeholder/200/280",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Colorful and unique design for creative positions",
      previewImage: "/api/placeholder/200/280",
    },
    {
      id: "academic",
      name: "Academic",
      description: "Traditional format for academic and research positions",
      previewImage: "/api/placeholder/200/280",
    },
  ];

  const renderTemplateSelection = () => (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => setSelectedTemplate(template.id)}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? "border-blue-500 bg-blue-50"
              : "hover:border-gray-300"
          }`}
        >
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full rounded-lg mb-3"
          />
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
      ))}
    </div>
  );

  const renderEditor = () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="font-medium mb-3">Personal Information</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={cvData.personalInfo.name}
              onChange={(e) =>
                setCVData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, name: e.target.value },
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={cvData.personalInfo.email}
              onChange={(e) =>
                setCVData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, email: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-medium mb-3">Education</h3>
          <div className="space-y-3">
            {cvData.education.map((edu, index) => (
              <div key={index} className="p-3 border rounded">
                <input
                  type="text"
                  placeholder="School"
                  className="w-full p-2 border rounded mb-2"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...cvData.education];
                    newEducation[index].school = e.target.value;
                    setCVData({ ...cvData, education: newEducation });
                  }}
                />
              </div>
            ))}
            <button
              onClick={() =>
                setCVData({
                  ...cvData,
                  education: [...cvData.education, { school: "", degree: "" }],
                })
              }
              className="w-full p-2 border rounded flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="border-l pl-6">
        <div className="sticky top-0">
          <h3 className="font-medium mb-3">Preview</h3>
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{cvData.personalInfo.name}</h2>
              <p className="text-gray-600">{cvData.personalInfo.email}</p>
            </div>

            {cvData.education.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Education</h3>
                {cvData.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{edu.school}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">CV Builder</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save CV"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveSection("templates")}
              className={`px-4 py-2 rounded ${
                activeSection === "templates"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Choose Template
            </button>
            <button
              onClick={() => setActiveSection("editor")}
              className={`px-4 py-2 rounded ${
                activeSection === "editor"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Edit Content
            </button>
          </div>

          <div className="overflow-auto max-h-[calc(90vh-200px)]">
            {activeSection === "templates" ? renderTemplateSelection() : renderEditor()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
