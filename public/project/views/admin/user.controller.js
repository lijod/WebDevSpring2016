(function() {

    angular
        .module("GadgetGuruApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService) {

        updateUsers();

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.selected = -1;


        function addUser(user) {
            //if(user == undefined || user.username.trim() === "") {
            //    return;
            //}
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
            //if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
            //    $scope.selected = -1;
            //    $scope.form = {};
            //    return;
            //}
            UserService.updateUserById(user._id, user, function(newUser) {
                console.log("User Updated:");
                console.log(user);
                $scope.user[$scope.selected] = newUser;
                $scope.selected = -1;
                $scope.user = {};
            });
        }

        function deleteUser(user) {
            UserService.deleteUserById(
                user._id,
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
    }

})();