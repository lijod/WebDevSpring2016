"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {

        var vm = this;

        function init() {

            UserService.getCurrentUser()
                .then(function(response) {
                    var loggedInUser = response.data;
                    console.log(loggedInUser);
                    vm.user = loggedInUser;
                },
                function() {
                    console.log("error profile->init->getCurrentUser")
                });

            vm.update = update;
        }

        init();

        function update(user) {

            UserService.updateUser(user._id, user)
                .then(function (userListResponse) {
                        UserService.findUserByUserId(user._id)
                            .then(function(response) {
                                console.log(response.data);
                                UserService.setCurrentUser(response.data);
                                console.log("Updated:");
                                console.log(response.data);
                                alert("User updated!");
                            },
                            function() {
                                console.log("error error profile->updateUser->findUserByUsername")
                            })
                    },
                    function () {
                        console.log("error profile->updateUser")
                    });

        }
    }
})();
