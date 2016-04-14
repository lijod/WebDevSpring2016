(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileReviewController", ProfileReviewController);

    function ProfileReviewController($stateParams, ReviewService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;
            vm.loading = true;
            ReviewService.findAllReviewsForUser(userId)
                .then(function (response) {
                        vm.reviews = response.data;
                        vm.loading = false;
                    },
                    function (err) {
                        console.log(err);
                        vm.loading = false;
                    });
        }

        init();
    }
})();