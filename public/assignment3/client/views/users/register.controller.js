"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var vm = this;

        vm.register = register;

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
                $rootScope.user = user;
                $location.url("/profile")
            }
        }

    }
})();