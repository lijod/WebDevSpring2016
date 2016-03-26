"use strict";
(function(){

    angular
        .module("GadgetGuruApp")
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
            return $http.get("/api/gadgetguru/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/gadgetguru/user?username=" + username);
        }

        function findUserByUserId(userId) {
            return $http.get("/api/gadgetguru/user/" + userId);
        }

        function findAllUsers () {
            return $http.get("/api/gadgetguru/user");
        }

        function createUser (user) {
            return $http.post("/api/gadgetguru/user", user);
        }

        function deleteUserById (userId) {
            return $http.delete("/api/gadgetguru/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put("/api/gadgetguru/user/" + userId, user);
        }

        function getCurrentUser() {
            return $http.get("/api/gadgetguru/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function invalidateCurrentSession() {
            $http.post("/api/gadgetguru/logout");
            delete $rootScope.currentUser;
        }
    }

})();