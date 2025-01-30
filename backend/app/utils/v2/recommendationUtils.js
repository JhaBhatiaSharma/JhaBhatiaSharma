const calculateSimilarity = (cvSkills, internshipSkills) => {
    if (!cvSkills.length || !internshipSkills.length) return 0;
    
    const normalizedCvSkills = cvSkills.map(skill => skill.toLowerCase());
    const normalizedInternshipSkills = internshipSkills.map(skill => skill.toLowerCase());
    
    const matchingSkills = normalizedCvSkills.filter(skill => 
      normalizedInternshipSkills.includes(skill)
    );
    
    // Calculate Jaccard similarity
    const union = new Set([...normalizedCvSkills, ...normalizedInternshipSkills]);
    return matchingSkills.length / union.size;
  };
  
  const extractSkillsFromCV = (cvData) => {
    const skills = [];
    
    // Extract skills from CV data object
    if (cvData.data && cvData.data.skills) {
      skills.push(...cvData.data.skills);
    }
    
    // Extract skills from experience descriptions
    if (cvData.data && cvData.data.experience) {
      cvData.data.experience.forEach(exp => {
        if (exp.skills) {
          skills.push(...exp.skills);
        }
      });
    }
    
    return [...new Set(skills)]; // Remove duplicates
  };
  
  module.exports = {
    calculateSimilarity,
    extractSkillsFromCV
  };