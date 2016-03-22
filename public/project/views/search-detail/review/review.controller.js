(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, $rootScope, ReviewService, UserService) {
        var vm = this;
        vm.Math = window.Math;
        console.log($rootScope.user);
        var user = $rootScope.user;
        var productId = $stateParams.productId;
        console.log(productId);
        vm.reviews =  ReviewService.findAllReviewsForGadget(productId);
        vm.maxRating = 5;
        vm.allRating = [0, 1, 1, 0, 0];
        vm.avgPerRating = [0, 0, 0, 0, 0];
        vm.avgRating = 0;
        vm.totalRating = 0;
        updateAllRatings();
        $scope.searchDetailModel.avgRating=vm.avgRating;
        $scope.searchDetailModel.maxRating=vm.maxRating;

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
            updateAllRatings();
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
            updateAllRatings();
        }

        function deleteReview(index) {
            vm.reviews = ReviewService.deleteReview(vm.reviews[index]._id, vm.reviews[index], productId);
            vm.isUpdate = false;
            updateAllRatings();
        }

        function getUserById(userId) {
            return UserService.getUserById(userId);
        }

        function updateAllRatings() {
            vm.allRating = [0, 0, 0, 0, 0];
            vm.avgPerRating = [0, 0, 0, 0, 0];
            vm.totalRating = 0;
            vm.avgRating = 0;
            for(var reviewIndex in vm.reviews) {
                var ratingIndex = vm.reviews[reviewIndex].rating - 1;
                vm.totalRating += vm.reviews[reviewIndex].rating;
                vm.allRating[ratingIndex]++;
                vm.avgPerRating[ratingIndex] =
                    vm.allRating[ratingIndex] / vm.reviews.length * 100;
            }
            vm.avgRating = vm.totalRating / vm.reviews.length;
        }
    }

})();