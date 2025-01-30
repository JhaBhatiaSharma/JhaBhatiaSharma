import { useEffect, useState } from 'react';
import { X, FileText } from 'lucide-react';
import API from '../api';

// eslint-disable-next-line react/prop-types
const CVBuilder = ({ isOpen, onClose }) => {
  const [template, setTemplate] = useState('professional');
  /* eslint-disable no-unused-vars, unused-imports/no-unused-vars */
  const [activeTab, setActiveTab] = useState('personal');
  /* eslint-enable no-unused-vars, unused-imports/no-unused-vars */
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

  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  useEffect(() => {
    // Fetch the list of recruiters from the backend
    const fetchRecruiters = async () => {
      try {
        const response = await API.get('/users/get-all-recruiters', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure auth token is sent
          },
        });
        setRecruiters(response.data.recruiters);
      } catch (error) {
        console.error('Failed to fetch recruiters:', error);
      }
    };
  
    fetchRecruiters();
  }, []);

  const handleCheckboxChange = (recruiterId) => {
    setSelectedRecruiters((prev) =>
      prev.includes(recruiterId)
        ? prev.filter((id) => id !== recruiterId)
        : [...prev, recruiterId]
    );
  };

  
  

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
          })),
          visibility: selectedRecruiters,
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
            <div className="border-b-2 pb-4 pt-4">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Manage CV Visibility</h3>
              <div className="flex overflow-x-auto space-x-4 pb-2 max-w-full">
                {recruiters.map((recruiter) => (
                  <label
                    key={recruiter._id}
                    className="flex-shrink-0 flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg hover:bg-gray-50 border border-gray-200 w-10"
                    style={{ minWidth: '33%' }} // Ensure three items are visible
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                      checked={selectedRecruiters.includes(recruiter._id)}
                      onChange={() => handleCheckboxChange(recruiter._id)}
                    />
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-sm">
                        {recruiter.firstName.charAt(0)}
                        {recruiter.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {recruiter.firstName} {recruiter.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{recruiter.email}</p>
                      </div>
                    </div>
                  </label>
                ))}
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
