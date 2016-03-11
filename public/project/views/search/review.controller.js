(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, $rootScope, ReviewService, UserService) {
        var vm = this;
        console.log($rootScope.user);
        var user = $rootScope.user;
        var productId = $stateParams.productId;
        console.log(productId);
        vm.reviews =  ReviewService.findAllReviewsForGadget(productId);
        vm.maxRating = 5;
        vm.allRating = [0, 0, 0, 0, 0];
        vm.avgRating = 4;
        vm.totalRating = 0;
        updateAllReview();


        vm.review = {
            review: "",
            title: "",
            rating: 0
        };

        vm.isUpdate = false;

        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.getUserById = getUserById;

        function addReview(review) {
            vm.reviews = ReviewService.addReviewForUser(user._id, productId, review);
            vm.review = {
                review: "",
                title: "",
                rating: 0
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
                "userId": vm.reviews[index].userId,
                "rating": vm.reviews[index].rating
            };
            vm.isUpdate = true;
        }

        function updateReview(review) {
            vm.reviews[selectedIndex] = ReviewService.updateReview(review._id, review);
            vm.review = {
                review: "",
                title: "",
                rating: 0
            };
            vm.isUpdate = false;
        }

        function deleteReview(index) {
            vm.reviews = ReviewService.deleteReview(vm.reviews[index]._id, vm.reviews[index], productId);
            vm.isUpdate = false;
        }

        function getUserById(userId) {
            return UserService.getUserById(userId);
        }

        function updateAllReview() {
            for(var reviewIndex in vm.reviews) {
                vm.allRating[vm.reviews[reviewIndex].rating - 1]++;
            }
        }
    }

})();