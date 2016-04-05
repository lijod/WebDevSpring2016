(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, $rootScope, $q, ReviewService, UserService) {
        var vm = this;
        vm.Math = window.Math;
        vm.isNaN = isNaN;
        console.log($rootScope.user);
        var user = $rootScope.currentUser;
        var productId = $stateParams.productId;
        console.log(productId);
        ReviewService.findAllReviewsForGadget(productId)
            .then(function (response) {
                    console.log(response.data);
                    vm.reviews = response.data;
                    findUserByReviewUserId(vm.reviews);
                    vm.maxRating = 5;
                    vm.allRating = [0, 0, 0, 0, 0];
                    vm.avgPerRating = [0, 0, 0, 0, 0];
                    vm.avgRating = 0;
                    vm.totalRating = 0;
                    updateAllRatings();
                    $scope.searchDetailModel.avgRating=vm.avgRating;
                    $scope.searchDetailModel.maxRating=vm.maxRating;
                },
                function () {
                    console.log("error ReviewController->findAllReviewsForGadget");
                    console.log(err);
                });

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
        //vm.getUserById = getUserById;

        function addReview(review) {
            ReviewService.addReviewForUser(user._id, productId, review)
                .then(function (response) {
                        if (response.data) {
                            vm.reviews.push(response.data);
                            vm.review = {
                                review: "",
                                title: "",
                                rating: 0
                            };
                            findUserByReviewUserId(vm.reviews);
                            updateAllRatings();
                        } else {
                            alert("Error occurred while adding review");
                        }
                    },
                    function (err) {
                        console.log("error ReviewController->addReview->addReviewForUser");
                        console.log(err);
                    });
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
            ReviewService.updateReview(review._id, review)
                .then(function(response) {
                    response = response.data;
                    if(response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                        vm.reviews[selectedIndex] = review;
                        vm.review = {
                            review: "",
                            title: "",
                            rating: 0
                        };
                        vm.isUpdate = false;
                        updateAllRatings();
                    } else {
                        alert("Error occurred while updating review");
                    }

                }, function(err) {
                    console.log("error ReviewController->updateReview->updateReview");
                    console.log(err);
                });
        }

        function deleteReview(index) {
            ReviewService.deleteReview(vm.reviews[index]._id)
                .then(function (response) {
                        response = response.data;
                        if(response.n && response.n === 1 && response.ok && response.ok ===1) {
                            vm.reviews.splice(index, 1);
                            findUserByReviewUserId(vm.reviews);
                            updateAllRatings();
                            vm.isUpdate = false;
                        } else {
                            alert("Error occurred while deleting review");
                        }
                    },
                    function (err) {
                        console.log("error ReviewController->deleteReview->deleteReview");
                        console.log(err);
                    });
        }

        function updateAllRatings() {
            if(!vm.reviews) {
                return;
            }
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
            if(vm.reviews.length === 0) {
                vm.avgRating = 0;
            } else {
                vm.avgRating = vm.totalRating / vm.reviews.length;
            }
        }

        function findUserByReviewUserId(reviews) {
            var promiseArray = [];
            var result = [];
            for (var i = 0; i < reviews.length; i++) {
                promiseArray
                    .push(
                        UserService.findUserByUserId(reviews[i].userId)
                            .then(function (response) {
                                if (response.data) {
                                    result.push(response.data);
                                }
                            }));
            }

            $q.all(promiseArray)
                .then(function () {
                    for (var i = 0; i < result.length; i++) {
                        reviews[i].username = result[i].username;
                    }
                });
        }
    }

})();