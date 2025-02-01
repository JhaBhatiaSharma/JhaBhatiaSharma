const { fetchResume, createResume, updateResume, deleteResume } = require('../../services/v1/resumeService');
  
const getResumeController = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.query);
        const { studentId } = req.query;
        const resume = await fetchResume(studentId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.download(resume.path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
const createResumeController = async (req, res) => {
    try {
        const { studentId } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resume = await createResume(studentId, file.path);
        res.status(201).json({ message: 'Resume uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
const updateResumeController = async (req, res) => {
    try {
        const { studentId } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const updatedResume = await updateResume(studentId, file.path);
        res.status(200).json({ message: 'Resume updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
const deleteResumeController = async (req, res) => {
    try {
        const { studentId } = req.query;
        await deleteResume(studentId);
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
module.exports = { getResumeController, createResumeController, updateResumeController, deleteResumeController };
  