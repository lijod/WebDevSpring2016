(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, $rootScope, ReviewService) {
        console.log($rootScope.user);
        var productId = $stateParams.productId;
        console.log(productId);
        var reviews = ReviewService.findAllReviewsForGadget(productId);
        $scope.reviews = reviews;
    }

})();