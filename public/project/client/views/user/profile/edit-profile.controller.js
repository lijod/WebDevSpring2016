(function() {

    angular
        .module("GadgetGuruApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($scope, $state, UserService) {
        var vm = this;
        if($scope.profileModel.paramUser._id !== $scope.profileModel.loggedInUser._id) {
            return;
        }
        vm.updateUser = updateUser;
        function init() {
            vm.$state = $state;
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.user = response.data;
                    },
                    function () {
                        console.log("EditProfileController->getCurrentUser");
                    });
        }

        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user)
                .then(function(response) {
                    alert("User updated!");
                    },
                function() {
                    console.log("EditProfileController->updateUser->updateUser");
                });
        }
    }

})();