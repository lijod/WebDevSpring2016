"use strict";
(function () {
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
            if (user.password != user.password2 || !user.password || !user.password2) {
                console.log("Your passwords don't match");
            }
            else {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user != null) {
                                UserService.setCurrentUser(user);
                                $location.url("/profile");
                            } else {
                                console.log("Username already present!");
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            }
        }

        //function register(user) {
        //    //var emails = [];
        //    //emails.push(user.email);
        //    //user.emails = emails;
        //    UserService.findUserByUsername(user.username)
        //        .then(function(response){
        //            doRegister(user, response);
        //        },
        //        function() {
        //            console.log("error, User->register->findUserByUsername");
        //        });
        //}
        //
        //function doRegister(currUser, response) {
        //    var user = response.data;
        //    console.log(user);
        //    if (user) {
        //        console.log("User Already Exists");
        //        alert("User Already Exists");
        //    } else {
        //        UserService.createUser(currUser)
        //            .then(function(respose){
        //                UserService.findUserByUsername(currUser.username)
        //                    .then(redirectUserToProfileIfValid,
        //                    function() {
        //                        console.log("error, User->register->findUserByUsername");
        //                    });
        //            },
        //            function() {
        //                console.log("error, User->register->doRegister->createUser");
        //            });
        //    }
        //}
        //
        //function redirectUserToProfileIfValid(response) {
        //    console.log(response)
        //    var user = response.data;
        //    console.log("Redirecting user: ");
        //    console.log(user);
        //    if(user != null){
        //        UserService.setCurrentUser(user);
        //        $location.url("/profile")
        //    }
        //}

    }
})();