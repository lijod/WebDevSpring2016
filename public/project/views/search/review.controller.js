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
        vm.reviews =  ReviewService.findAllReviewsForGadget(productId);

        vm.review = {
            review: "",
            title: ""
        };

        vm.isUpdate = false;

        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;

        function addReview(review) {
            vm.reviews = ReviewService.addReviewForUser(user._id, productId, review);
            vm.review = {
                review: "",
                title: ""
            };
        }

        var selectedIndex = -1;
        function selectReview(index) {
            selectedIndex = index;
            vm.review = {
                "_id": vm.reviews[index]._id,
                "title": vm.reviews[index].title,
                "review": vm.reviews[index].review,
                "gadgetId": vm.reviews[index].gadgetId,
                "userId": vm.reviews[index].userId
            };
            vm.isUpdate = true;
        }

        function updateReview(review) {
            vm.reviews[selectedIndex] = ReviewService.updateReview(review._id, review);
            vm.review = {
                review: "",
                title: ""
            };
            vm.isUpdate = false;
        }

        function deleteReview(index) {
            vm.reviews = ReviewService.deleteReview(vm.reviews[index]._id, vm.reviews[index], productId);
            vm.isUpdate = false;
        }

    }

})();