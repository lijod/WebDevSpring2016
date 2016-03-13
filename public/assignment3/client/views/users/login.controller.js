"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;

        function init() {
            vm.login = login;
        }

        init();

        function login(username, password) {
            console.log("login... " + username)
            UserService.findUserByCredentials(username, password, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            console.log("Redirecting user: ");
            console.log(user);
            if(user != null){
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
