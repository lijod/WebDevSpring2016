(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileReviewController", ProfileReviewController);

    function ProfileReviewController($scope) {
        UserService.findUserByUserId(userId)
            .then(function (response) {
                vm.paramUser = response.data;
                console.log(vm.paramUser);
            },
            function (err) {
                console.log("ProfileController->findUserByUserId");
                console.log(err);
            });
    }
})();