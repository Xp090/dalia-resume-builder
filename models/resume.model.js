const {mongoose} = require("../utils/db.utils");
const {Schema} = require("mongoose");

const resumeBuildSteps = [
    'personalInfo',
    'education',
    'experience',
    'skills'
]

const resumeSchema =  new mongoose.Schema ({
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    data: {
        personalInfo: {
            type: {
                firstName: String,
                lastName: String,
                email: String,
                phone: String,
                birthdate: Date,
                address: String,
            } ,
            default: () => { return null; }, // workaround to make the default value = null
            _id: false
        },
        education: {
            type: [{
                degree: String,
                school: String,
                graduationYear: Number
            }],
            default: () => { return null; },
            _id: false
        },
        experience: {
            type:  [{
                jobTitle: String,
                entityName: String,
                startDate: Date,
                endDate: Date,
            }],
            default: () => { return null; },
            _id: false
        },
        skills: {
            type: [String],
            default: () => { return null; },
            _id: false
        },
    },

})
resumeSchema.virtual('currentResumeBuildStep').get(function() {
    for (let stage of resumeBuildSteps) {
        if (!this.data[stage]) {
            return stage
        }
    }
    return null;
});

const ResumeModel = mongoose.model('Resume', resumeSchema )


module.exports = {
    ResumeModel,
    resumeBuildSteps,
    resumeSchema
}
