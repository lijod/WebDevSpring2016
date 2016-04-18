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
            addLikedGadget: addLikedGadget,
            undoLikedGadget: undoLikedGadget,
            isLikedGadget: isLikedGadget,
            follow: follow,
            unfollow: unfollow,
            isFollowing: isFollowing,
            findFollowingUsers: findFollowingUsers,
            findFollowerUsers: findFollowerUsers,
            findLikedGadgets: findLikedGadgets,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            invalidateCurrentSession : invalidateCurrentSession
        };

        return api;

        //function findUserByCredentials (username, password) {
        //    return $http.get("/api/gadgetguru/user?username=" + username + "&password=" + password);
        //}

        function findUserByCredentials (username, password) {
            return $http.post("/api/gadgetguru/user/login", {username: username, password: password});
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

        function addLikedGadget(userId, gadgetId) {
            return $http.put("/api/gadgetguru/user/" + userId + "/gadget/" + gadgetId + "/like");
        }

        function undoLikedGadget(userId, gadgetId) {
            return $http.put("/api/gadgetguru/user/" + userId + "/gadget/" + gadgetId + "/undolike");
        }

        function isLikedGadget(userId, gadgetId) {
            return $http.put("/api/gadgetguru/user/" + userId + "/gadget/" + gadgetId + "/isliked");
        }

        function follow(follower, following) {
            return $http.put("/api/gadgetguru/user/" + follower + "/user/" + following + "/follow");
        }

        function unfollow(follower, following) {
            return $http.put("/api/gadgetguru/user/" + follower + "/user/" + following + "/unfollow");
        }

        function isFollowing(follower, following) {
            return $http.get("/api/gadgetguru/user/" + follower + "/user/" + following + "/isfollowing");
        }

        function findFollowingUsers(userId) {
            return $http.get("/api/gadgetguru/user/" + userId + "/following");
        }

        function findFollowerUsers(userId) {
            return $http.get("/api/gadgetguru/user/" + userId + "/follower");
        }

        function findLikedGadgets(userId) {
            return $http.get("/api/gadgetguru/user/" + userId + "/likedgadgets");
        }

        function getCurrentUser() {
            return $http.get("/api/gadgetguru/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function invalidateCurrentSession() {
            return $http.get("/api/gadgetguru/logout");
        }
    }

})();