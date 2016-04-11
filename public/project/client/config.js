"use strict";
(function() {
    angular
        .module("GadgetGuruApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('/home/category');
        $urlRouterProvider.when('/home', '/home/category    ');
        $urlRouterProvider.when('/profile/{userId}', '/profile/{userId}/review');
        $urlRouterProvider.when('/search-detail/{gadgetId}', '/search-detail/{gadgetId}/review');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/search/search.view.html',
                controller: "SearchController",
                controllerAs: "searchModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state('home.category', {
                url: '/category',
                templateUrl: 'views/search/category-list.view.html'
            })
            .state('home.result', {
                url: '/result/:keyword?isCategory',
                templateUrl: 'views/search/search-result/search-result.view.html',
                controller: 'SearchResultController',
                controllerAs: 'model'
            })
            .state('search-detail', {
                url: '/search-detail/:gadgetId',
                templateUrl: 'views/search-detail/search-detail.view.html',
                controller: "SearchDetailController",
                controllerAs: "searchDetailModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state('search-detail.feature', {
                url: '/feature',
                templateUrl: 'views/search-detail/feature/features.view.html'
            })
            .state('search-detail.review', {
                url: '/review',
                templateUrl: 'views/search-detail/review/review.view.html',
                controller: "ReviewController",
                controllerAs: "model"
            })
            .state('search-detail.spec', {
                url: '/spec',
                templateUrl: 'views/search-detail/spec/spec.view.html'
            })
            .state('profile', {
                url: '/profile/:userId',
                templateUrl: 'views/user/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileModel',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
           .state('profile.edit', {
                url: '/edit',
                templateUrl: 'views/user/profile/edit-profile.view.html',
                controller: 'EditProfileController',
                controllerAs: 'model'
            })
            .state('profile.review', {
                url: '/review',
                templateUrl: 'views/user/profile/review/review.view.html',
                controller: 'ProfileReviewController',
                controllerAs: 'model'
            })
            .state('profile.like', {
                url: '/like',
                templateUrl: 'views/user/profile/like/like.view.html',
                controller: 'ProfileLikeController',
                controllerAs: 'model'
            })
            .state('profile.follow-main', {
                url: '/follow-main',
                templateUrl: 'views/user/profile/follower/follow.main.view.html'
            })
            .state('profile.follow-main.follower', {
                url: '/follower',
                templateUrl: 'views/user/profile/follower/follower.view.html',
                controller: "FollowerController",
                controllerAs: 'model'
            })
            .state('profile.follow-main.following', {
                url: '/following',
                templateUrl: 'views/user/profile/follower/following.view.html',
                controller: "FollowingController",
                controllerAs: 'model'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/user/login/login.view.html',
                controller: "LoginController"
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/user/register/register.view.html',
                controller: "RegisterController",
                controllerAs: "model"
            })
            .state('admin-user', {
                url: '/admin-user',
                templateUrl: 'views/admin/user.view.html',
                controller: "UserController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            });

        function getLoggedIn(UserService, $q) {
            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response){
                    var currentUser = response.data;
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                });

            return deferred.promise;
        }

        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });

            return deferred.promise;
        }
    }
})();