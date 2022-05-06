const Validator = require("validatorjs");
const {HttpError} = require("../middleware/errorHandling.middleware");
const {resumeBuildSteps} = require("../models/resume.model");
const resumeService = require("../services/resume.service")

async function getStatus(req, res){
    const {user, token} = res.locals
    const isNewUser = !!token
    //We support multiple resumes per user, but we send only one as per requirements
    const activeUserResume = await resumeService.getActiveResumesForUserOrCreateOne(user._id);
    res.status(isNewUser ? 201 : 200).json({
        resume: activeUserResume.data,
        currentStep: activeUserResume.currentResumeBuildStep,
        token: token // sent in the case where new token is generated
    });
}

async function updateResume(req, res) {
    const {step} = req.params;

    if (!step) {
        throw new HttpError('Resume builder step not specified', 400);
    }

    if (!resumeBuildSteps.includes(step)) {
        throw new HttpError('Invalid resume builder step', 400);
    }
    const validations = { // TODO: Move the validation to separate file to be reusable
        personalInfo : {
            data: {
                firstName: 'required',
                lastName: 'required',
                email: 'required|email',
                phone: 'required', //TODO: phone number validation
                birthdate: 'required|date',
                address: 'required',
            },
        },
        education : {
            "data.*.degree": 'required',
            "data.*.school": 'required',
            "data.*.graduationYear": 'required|numeric'
        },
        experience: {
            "data.*.jobTitle": 'required',
            "data.*.entityName": 'required',
            "data.*.startDate": 'required|date',
            "data.*.endDate": 'date',
        },
        skills: {
            data: 'required|array',
        }
    }

    const validator = new Validator(req.body, validations[step]);

    if (validator.fails()) {
        throw new HttpError(validator.errors.all(), 400);
    }
    const {user} = res.locals
    const activeUserResume = await resumeService.getActiveResumesForUser(user._id);
    if (!activeUserResume) {
        throw new HttpError('No resume found for user', 404);
    }
    activeUserResume.data[step] = req.body.data;
    await resumeService.updateResume(activeUserResume)
    res.json({
        resume: activeUserResume.data,
        currentStep: activeUserResume.currentResumeBuildStep,
    });
}

function resetResume (){
    //TODO: implement reset logic
}

module.exports = {
    getStatus,
    updateResume,
    resetResume
}
