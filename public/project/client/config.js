"use strict";
(function() {
    angular
        .module("GadgetGuruApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.when('/profile', '/profile/review');
        $urlRouterProvider.when('/search-detail/{productId}', '/search-detail/{productId}/review');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/search/search.view.html',
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state('search-detail', {
                url: '/search-detail/:productId',
                templateUrl: 'views/search-detail/search-detail.view.html',
                controller: "SearchResultController",
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
                url: '/profile',
                templateUrl: 'views/user/profile/profile.view.html',
                controller: 'ProfileController',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
           .state('profile.edit', {
                url: '/edit',
                templateUrl: 'views/user/profile/edit-profile.view.html',
                controller: 'EditProfileController'
            })
            .state('profile.review', {
                url: '/review',
                templateUrl: 'views/user/profile/review/review.view.html'
            })
            .state('profile.like-main', {
                url: '/like-main',
                templateUrl: 'views/user/profile/like/like.main.view.html'
            })
            .state('profile.like-main.like', {
                url: '/like',
                templateUrl: 'views/user/profile/like/like.view.html'
            })
            .state('profile.like-main.dislike', {
                url: '/dislike',
                templateUrl: 'views/user/profile/like/dislike.view.html'
            })
            .state('profile.follow-main', {
                url: '/follow-main',
                templateUrl: 'views/user/profile/follower/follow.main.view.html'
            })
            .state('profile.follow-main.follower', {
                url: '/follower',
                templateUrl: 'views/user/profile/follower/follower.view.html'
            })
            .state('profile.follow-main.following', {
                url: '/following',
                templateUrl: 'views/user/profile/follower/following.view.html'
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