(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.user = $rootScope.user;

        $scope.update = update;

        function update(user) {

            UserService.updateUser(user._id, user, function(updatedUser) {
                $rootScope.user = updatedUser;
                console.log("Updated:");
                console.log(updatedUser);
            });

        }
    }
})();
