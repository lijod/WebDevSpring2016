"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope) {

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            invalidateCurrentSession : invalidateCurrentSession
        };

        return api;

        function findUserByCredentials (username, password, callback) {
            var user = getValidUser(username, password) ;
            callback(user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findAllUsers (callback) {
            callback(users);
        }

        function createUser (user) {
            console.log(user);
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById (userId, callback) {
            var userIndex = getUserIndexById(userId);
            users.splice(userIndex, 1);
            callback(users);
        }

        function updateUser (userId, user, callback) {
            console.log(user);
            var userIndex = getUserIndexById(userId);
            users[userIndex] = {
                "_id" : user._id,
                "firstName" : user.firstName,
                "lastName" : user.lastName,
                "username" : user.username,
                "password" : user.password,
                "roles" : user.roles,
                "email" : user.email
            }
            callback(users[userIndex]);
        }

        function getUserIndexById (userId) {
            var index = 0;
            for (var i = 0; i < users.length; i++) {
                if(users[i]._id === userId){
                    return index;
                }
                index++;
            }
        }

        function getValidUser (username, password) {
            var user = null;
            for (var i = 0; i < users.length; i++) {
                if(users[i].username === username && users[i].password === password){
                    user =  users[i]
                }
            }
            return user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function invalidateCurrentSession() {
            delete $rootScope.currentUser;
        }

    }

})();