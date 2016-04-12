(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $stateParams, ReviewService, UserService, GadgetService) {
        var vm = this;
        function init() {
            vm.Math = window.Math;
            vm.isNaN = isNaN;
            vm.selectedIndex = -1;
            vm.maxRating = 5;
            vm.gadgetId = $stateParams.gadgetId;

            UserService.getCurrentUser()
                .then(function (user) {
                        vm.user = user.data;
                    },
                    function (err) {
                        console.log("error ReviewController->getCurrentUser");
                        console.log(err);
                    });

            ReviewService.findAllReviewsForGadget(vm.gadgetId)
                .then(function (response) {
                        console.log(response.data);
                        vm.reviews = response.data;
                        findUserByReviewUserId(vm.reviews);
                        updateAllRatings();
                        $scope.searchDetailModel.avgRating = vm.avgRating;
                        $scope.searchDetailModel.maxRating = vm.maxRating;
                    },
                    function (err) {
                        console.log("error ReviewController->findAllReviewsForGadget");
                        console.log(err);
                    });
            
            vm.review = {
                review: "",
                title: "",
                rating: 0
            };


            vm.addReview = addReview;
            vm.selectReview = selectReview;
            vm.updateReview = updateReview;
            vm.deleteReview = deleteReview;
            vm.cancelUpdate = cancelUpdate;
        }

        init();
        function addReview(review) {
            var gadgetToAdd = {
                _id: $scope.searchDetailModel.gadget.productId + "",
                title: $scope.searchDetailModel.gadget.name,
                imgUrl: $scope.searchDetailModel.gadget.image
            };
            ReviewService.addReviewForUser(vm.user._id, vm.gadgetId, review)
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
                            return GadgetService.addGadget(gadgetToAdd);
                        } else {
                            alert("Error occurred while adding review");
                        }
                    },
                    function (err) {
                        console.log("error ReviewController->addReview->addReviewForUser");
                        console.log(err);
                    })
                .then(function(response) {
                    //console.log(response.data)
                },
                function(err) {
                    console.log("addReview->addReviewForUser->addGadget")
                    console.log(err);
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
        }

        function updateReview(review) {
            ReviewService.updateReview(review._id, review)
                .then(function(response) {
                    response = response.data;
                    if(response.ok && response.ok === 1 && response.n && response.n === 1) {
                        vm.reviews[vm.selectedIndex] = review;
                        vm.review = {
                            review: "",
                            title: "",
                            rating: 0
                        };
                        vm.selectedIndex = -1;
                        updateAllRatings();
                    } else {
                        alert("Error occurred while updating review");
                    }

                }, function(err) {
                    console.log("error ReviewController->updateReview->updateReview");
                    console.log(err);
                });
        }

        function cancelUpdate() {
            vm.selectedIndex = -1;
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
            reviews.forEach(function (element, index, arr) {
                UserService.findUserByUserId(reviews[index].userId)
                                .then(function (response) {
                                    if (response.data) {
                                        reviews[index].username = response.data.username;
                                        reviews[index].userImgUrl = response.data.imgUrl;
                                    }
                                });
            });
        }
    }

})();