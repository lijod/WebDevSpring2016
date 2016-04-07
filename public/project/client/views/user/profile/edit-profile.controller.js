(function() {

    angular
        .module("GadgetGuruApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($state, $stateParams, UserService) {
        var vm = this;
        function init() {
            vm.$state = $state;
            var userId = $stateParams.userId;
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.user = response.data;
                        if(userId !== vm.user._id) {
                            $state.go("profile" , {userId: userId});
                        }
                    },
                    function () {
                        console.log("EditProfileController->getCurrentUser");
                    });
            vm.updateUser = updateUser;
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