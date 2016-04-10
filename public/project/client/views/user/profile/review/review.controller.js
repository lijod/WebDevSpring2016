(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileReviewController", ProfileReviewController);

    function ProfileReviewController($stateParams, ReviewService, UserService) {
        var vm = this;

        var userId = $stateParams.userId;

        ReviewService.findAllReviewsForUser(userId)
            .then(function(response) {
                vm.reviews = response.data;
            },
            function(err) {
               console.log(err);
            });
    }
})();