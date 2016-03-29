"use strict";
var users = require("./user.mock.json");

module.exports = function(db) {

    var UserSchema = require("./user.schema.server.js")();
    var UserModel = db.model("User", UserSchema);

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser

    };

    return api;

    function findUserById (userId) {
        for(var u in users) {
            if( users[u]._id == userId ) {
                return users[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }

    function findAllUsers () {
        return users;
    }

    function createUser (user) {
        return UserModel.create(user);
    }

    function deleteUserById (userId) {
        for(var u in users) {
            if( users[u]._id === userId ) {
                return users[u];
            }
        }
        return null;
    }

    function updateUser (userId, user) {
        var index = -1;
        for(var u in users) {
            if(users[u]._id == userId) {
                index = u;
                break;
            }
        }

        if(index > -1) {
            users[index] = user;
            return user;
        }

        return null;
    }
}