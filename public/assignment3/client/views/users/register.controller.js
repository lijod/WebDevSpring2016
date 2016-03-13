"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        function init() {
            vm.register = register;
        }

        init();

        function register(user) {
            console.log(user);
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                console.log(user);
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                console.log("User Already Exists");
                alert("User Already Exists");
            }
        }

        function redirectUserToProfileIfValid(user) {
            console.log("Redirecting user: ");
            console.log(user);
            if(user != null){
                UserService.setCurrentUser(user);
                $location.url("/profile")
            }
        }

    }
})();