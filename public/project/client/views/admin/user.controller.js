(function() {

    angular
        .module("GadgetGuruApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService) {

        updateUsers();

        $scope.roles = [
            {name: "user", value: "user"},
            {name: "admin", value: "admin"}
        ];

        //$scope.user = {role : $scope.roles[0].value};

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.selected = -1;


        function addUser(user) {
            if(!isUserValid(user)) {
                return;
            }
            console.log(user);
            UserService.createUser(user, function(newUser) {
                console.log("User added:");
                console.log(newUser);
                $scope.selected = -1;
                $scope.user = {};
                updateUsers();
            });
        }

        function updateUser(user) {
            if(!isUserValid(user)) {
                return;
            }
            UserService.updateUserById(user._id, user, function(newUser) {
                console.log("User Updated:");
                console.log(user);
                $scope.users[$scope.selected] = newUser;
                $scope.selected = -1;
                $scope.user = {};
            });
        }

        function deleteUser(userId) {
            UserService.deleteUserById(
                userId,
                function(udpatedUsers) {
                    console.log("User Deleted:");
                    console.log(user);
                    $scope.selected = -1;
                    $scope.user = {};
                    updateUsers();
                });
        }

        function selectUser(index) {
            var editUser = {
                "_id" : $scope.users[index]._id,
                "firstName" : $scope.users[index].firstName,
                "lastName" : $scope.users[index].lastName,
                "username" : $scope.users[index].username,
                "password" : $scope.users[index].password,
                "role" : $scope.users[index].role,
                "email" : $scope.users[index].email
            };
            $scope.user = editUser;
            $scope.selected = index;
        }

        function updateUsers() {
            UserService.findAllUsers(function (userList) {
                $scope.users = userList;
            });
        }

        function isUserValid(user) {
            return user != undefined && user.username.trim() !== "" && user.password.trim() !== "" &&
                user.firstName.trim() !== "" && user.lastName.trim() !== "" && user.email && user.email.trim() !== "" &&
                user.role.trim() !== "";
        }
    }

})();