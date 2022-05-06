const {mongoose} = require("../utils/db.utils");

const userSchema = new mongoose.Schema({}, { timestamps: true })
const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
