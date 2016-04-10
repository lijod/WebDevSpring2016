"use strict";
module.exports = function (db) {

    var UserSchema = require("./user.schema.server.js")(db);
    var UserModel = db.model("GG_User", UserSchema);

    var api = {
        findUserById: findUserById,
        findAllById: findAllById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        addLikedGadget: addLikedGadget,
        addFollowing: addFollowing,
        addFollower: addFollower,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        undoLikedGadget: undoLikedGadget,
        getMongooseModel: getMongooseModel
    };

    return api;

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findAllById(userIdList) {
        return UserModel.find({_id : {$in : userIdList}});
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
            {$set: user}
        );
    }

    function addLikedGadget(userId, gadgetId) {
        return UserModel.update(
            {_id: userId},
            {$addToSet: {likedGadget: gadgetId}}
        );
    }

    function undoLikedGadget(userId, gadgetId) {
        return UserModel.update(
            {_id: userId},
            {$pullAll: {likedGadget: [gadgetId]}}
        );
    }

    function addFollowing(follower, following) {
        return UserModel.update(
            {_id: follower},
            {$addToSet: {following: following}}
        );
    }

    function addFollower(follower, following) {
        return UserModel.update(
            {_id: following},
            {$addToSet: {follower: follower}}
        );
    }

    function removeFollowing(follower, following) {
        return UserModel.update(
            {_id: follower},
            {$pullAll: {following: [following]}}
        );
    }

    function removeFollower(follower, following) {
        return UserModel.update(
            {_id: following},
            {$pullAll: {follower: [follower]}}
        );
    }

    function getMongooseModel() {
        return UserModel;
    }
}