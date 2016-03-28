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
            console.log("login-> " + username)
            UserService.findUserByCredentials(username, password)
                .then(redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(response) {
            var user = response.data;
            console.log("Redirecting user: ");
            console.log(user);
            if(user != null){
                UserService.setCurrentUser(user);
                $location.url("/profile");
            } else {
                alert("Username and password doesn't exist!")
            }
        }
    }
})();
