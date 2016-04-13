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
            register: register,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            login: login,
            invalidateCurrentSession : invalidateCurrentSession
        };

        return api;

        function findUserByCredentials (username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
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

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function invalidateCurrentSession() {
            $http.post("/api/assignment/logout");
            delete $rootScope.currentUser;
        }
    }

})();