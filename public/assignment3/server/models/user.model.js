var users = require("./user.mock.json");

module.exports = function() {

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
        for(var u in users) {
            if( users[u].username === username ) {
                return users[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;
    }

    function findAllUsers () {
        return users;
    }

    function createUser (user) {
        user._id = "ID_" + (new Date()).getTime();
        users.push(user);
        return user;
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