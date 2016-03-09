(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, $rootScope, ReviewService) {
        var vm = this;
        console.log($rootScope.user);
        var user = $rootScope.user;
        var productId = $stateParams.productId;
        console.log(productId);
        var reviews = ReviewService.findAllReviewsForGadget(productId);
        vm.reviews = reviews;

        vm.addReview = addReview;

        function addReview(review) {
            vm.reviews = ReviewService.addReviewForUser(user.userId, productId, review);
            vm.review = {};
        }

    }

})();