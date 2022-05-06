const {ResumeModel} = require("../models/resume.model");

const createResume = (resume) => ResumeModel.create(resume)

const createResumeForUser = (userId) => ResumeModel.create({_creator: userId})

//TODO Implement paginating
const getAllResumes = () => ResumeModel.find()

const getResumeById = (id) => ResumeModel.findById(id);

const getResumesForUser = (userId) => ResumeModel.find({_creator: userId})

const getActiveResumesForUser = async (userId) => (await getResumesForUser(userId).limit(1))[0]

const getActiveResumesForUserOrCreateOne = async (userId) => {
    let activeUserResume = await getActiveResumesForUser(userId)
    if (!activeUserResume) {
        activeUserResume = await createResumeForUser(userId)
    }
    return activeUserResume
}

const updateResume = (resume) => resume.save();

const updateResumeById = (id, resumeData) => ResumeModel.findByIdAndUpdate(id, resumeData)

const deleteResume = (resume) => resume.delete();

const deleteResumeById = (id) => ResumeModel.findByIdAndDelete(id)

module.exports = {
    createResume,
    createResumeForUser,
    getAllResumes,
    getResumeById,
    getResumesForUser,
    getActiveResumesForUser,
    getActiveResumesForUserOrCreateOne,
    updateResume,
    updateResumeById,
    deleteResume,
    deleteResumeById
}
