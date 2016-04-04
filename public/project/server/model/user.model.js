"use strict";
module.exports = function (db) {

    var UserSchema = require("./user.schema.server.js")(db);
    var UserModel = db.model("GG_User", UserSchema);

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        getMongooseModel: getMongooseModel
    };

    return api;

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUserById(userId) {
        return UserModel.remove({_id: userId});
    }

    function updateUser(userId, user) {
        delete user._id;
        return UserModel.update(
            {_id: userId},
            {$set: user});
    }

    function getMongooseModel() {
        return UserModel;
    }
}