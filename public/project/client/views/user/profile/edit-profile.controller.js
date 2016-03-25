(function() {

    angular
        .module("GadgetGuruApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($state, UserService) {
        console.log("EditProfileController")
        var vm = this;
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