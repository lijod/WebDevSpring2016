(function () {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $stateParams, $q, UserService) {
        var vm = this;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.user = response.data;
                        console.log("test");
                    },
                    function () {
                        console.log("ProfileController->getCurrentUser");
                    });


        }

        init();

    }
})();