(function () {

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
            if (!isUserValid(user)) {
                alert("Please provide all details");
                return;
            }
            console.log(user);
            UserService.createUserAdmin(user)
                .then(function (newUser) {
                    console.log("User added:");
                    $scope.selected = -1;
                    $scope.user = {};
                    updateUsers();
                });
        }

        function updateUser(user) {
            if (!isUserValid(user)) {
                alert("Please provide all details");
                return;
            }
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    console.log("User Updated:");
                    $scope.users[$scope.selected] = response.data;
                    $scope.selected = -1;
                    $scope.user = {};
                });
        }

        function deleteUser(userId) {
            UserService.deleteUserById(userId)
                .then(function (response) {
                        console.log("User Deleted:");
                        $scope.selected = -1;
                        $scope.user = {};
                        updateUsers();
                    },
                    function (err) {
                        console.log("Error deleting user");
                    });
        }

        function selectUser(index) {
            var editUser = {
                "_id": $scope.users[index]._id,
                "firstName": $scope.users[index].firstName,
                "lastName": $scope.users[index].lastName,
                "username": $scope.users[index].username,
                "password": $scope.users[index].password,
                "role": $scope.users[index].role,
                "email": $scope.users[index].email
            };
            $scope.user = editUser;
            $scope.selected = index;
        }

        function updateUsers() {
            UserService.findAllUsers()
                .then(function (response) {
                        $scope.users = response.data;
                    },
                    function (err) {
                        console.log("Error getting all users");
                    });
        }

        function isUserValid(user) {
            return user != undefined && user.username.trim() !== "" && user.password.trim() !== "" &&
                user.firstName.trim() !== "" && user.lastName.trim() !== "" && user.email && user.email.trim() !== "" &&
                user.role && user.role.trim() !== "";
        }
    }

})();