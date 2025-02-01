const CV = require('../../models/v2/Cv');
const Internship = require('../../models/v2/Internship');
const { calculateSimilarity, extractSkillsFromCV } = require('../../utils/v2/recommendationUtils');

const getRecommendedInternships = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user data in request from auth middleware
    
    // Get user's CV
    const userCV = await CV.findOne({ user: userId })
      .sort({ createdAt: -1 }) // Get the most recent CV
      .lean();
    
    if (!userCV) {
      return res.status(404).json({
        success: false,
        message: 'No CV found. Please create a CV first.'
      });
    }
    
    // Extract skills from CV
    const userSkills = extractSkillsFromCV(userCV);
    
    // Get all internships
    const internships = await Internship.find({})
      .populate('recruiter', 'companyName')
      .lean();
    
    // Calculate similarity scores and add them to internships
    const recommendedInternships = internships.map(internship => {
      const similarityScore = calculateSimilarity(userSkills, internship.requiredSkills || []);
      return {
        ...internship,
        similarityScore,
        matchingSkills: userSkills.filter(skill => 
          (internship.requiredSkills || []).map(s => s.toLowerCase()).includes(skill.toLowerCase())
        )
      };
    });
    
    // Sort by similarity score and return top matches
    const sortedRecommendations = recommendedInternships
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 10); // Get top 10 matches
    
    res.json({
      success: true,
      recommendations: sortedRecommendations
    });
    
  } catch (error) {
    console.error('Error in getRecommendedInternships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
};

module.exports = {
  getRecommendedInternships
};