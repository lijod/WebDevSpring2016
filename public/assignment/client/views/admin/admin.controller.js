"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService) {
        var vm = this;

        function init() {
            vm.users = [];
            vm.user = {};
            vm.selected = -1;

            vm.addUser = addUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.updateUser = updateUser;

            loadAllUsers();

            vm.predicate = 'username';
            vm.reverse = true;
            vm.order = function (predicate) {
                vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
                vm.predicate = predicate;
            };
        }

        init();

        function loadAllUsers() {
            UserService.findAllUsers()
                .then(function (response) {
                        console.log(response);
                        if (response.data) {
                            vm.users = response.data;
                        }
                    },
                    function (err) {
                        console.log("AdminController->loadAllUsers->findAllUsers");
                    });
        }

        function addUser(user) {
            if (!isUserValid(user)) {
                return;
            }
            UserService.createUser(user)
                .then(function (response) {
                        var users = response.data;
                        vm.selected = -1;
                        vm.user = {};
                        if (users) {
                            vm.users = users;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function deleteUser(userId) {
            UserService.deleteUserById(userId)
                .then(function (response) {
                        console.log(response.data);
                        if (response.data) {
                            vm.users = response.data;
                            console.log("User Deleted:");
                            vm.selected = -1;
                            vm.user = {};
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function selectUser(index) {
            var editUser = JSON.parse(JSON.stringify(vm.users[index]));
            vm.user = editUser;
            vm.selected = index;
        }

        function updateUser(user) {
            user.roles = user.roles.toString();
            if (!isUserValid(user)) {
                return;
            }
            UserService.updateUserAdmin(user._id, user)
                .then(function (response) {
                        if (response.data) {
                            console.log("User Updated:");
                            vm.users = response.data;
                            vm.selected = -1;
                            vm.user = {};
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function isUserValid(user) {
            return user && user.username && user.username.trim() !== "" && user.password && user.password.trim() !== "" &&
                user.firstName && user.firstName.trim() !== "" && user.lastName && user.lastName.trim() !== "" && user.roles &&
                user.roles.trim() !== "";
        }
    }

})();
