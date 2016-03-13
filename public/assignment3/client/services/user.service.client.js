"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            findUserByUserId : findUserByUserId,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            invalidateCurrentSession : invalidateCurrentSession
        };

        return api;

        function findUserByCredentials (username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/userby?username=" + username);
        }

        function findUserByUserId(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findAllUsers () {
            return $http.get("/api/assignment/user");
        }

        function createUser (user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById (userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function invalidateCurrentSession() {
            $http.post("/api/assignment/logout");
            delete $rootScope.currentUser;
        }
    }

})();