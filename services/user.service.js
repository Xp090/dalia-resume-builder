const UserModel = require("../models/user.model");

const createUser = (user) => UserModel.create(user)

//TODO Implement pagination
const getAllUsers = () => UserModel.find()

const getUserById = (id) => UserModel.findById(id)

const updateUser = (user) => user.save();

const updateUserById = (id, userData) => UserModel.findByIdAndUpdate(id, userData)

const deleteUser = (user) => user.delete();

const deleteUserById = (id) => UserModel.findByIdAndDelete(id)

module.exports = {
    createUser,
    getUserById,
    updateUser,
    updateUserById,
    deleteUser,
    deleteUserById
}
