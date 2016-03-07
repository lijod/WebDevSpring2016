"use strict";
(function() {
    angular
        .module("GadgetGuruApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.when('/profile', '/profile/review');
        $urlRouterProvider.when('/search-result/{productId}', '/search-result/{productId}/feature');
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/search/search.view.html',
                controller: "SearchController",
                controllerAs: "model"
            })
            .state('search-result', {
                url: '/search-result/:productId',
                templateUrl: 'views/search/search-detail.view.html',
                controller: "SearchResultController",
                controllerAs: "model"
            })
            .state('search-result.feature', {
                url: '/feature',
                templateUrl: 'views/search/features.view.html'
            })
            .state('search-result.review', {
                url: '/review',
                templateUrl: 'views/search/review.view.html',
                controller: "ReviewController"
            })
            .state('search-result.spec', {
                url: '/spec',
                templateUrl: 'views/search/spec.view.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/user/profile/profile.view.html',
                controller: 'ProfileController'
            })
           .state('profile.edit', {
                url: '/edit',
                templateUrl: 'views/user/profile/edit-profile.view.html',
                controller: 'EditProfileController'
            })
            .state('profile.review', {
                url: '/review',
                templateUrl: 'views/user/profile/review.view.html'
            })
            .state('profile.like-main', {
                url: '/like-main',
                templateUrl: 'views/user/profile/like.main.view.html'
            })
            .state('profile.like-main.like', {
                url: '/like',
                templateUrl: 'views/user/profile/like.view.html'
            })
            .state('profile.like-main.dislike', {
                url: '/dislike',
                templateUrl: 'views/user/profile/dislike.view.html'
            })
            .state('profile.follow-main', {
                url: '/follow-main',
                templateUrl: 'views/user/profile/follow.main.view.html'
            })
            .state('profile.follow-main.follower', {
                url: '/follower',
                templateUrl: 'views/user/profile/follower.view.html'
            })
            .state('profile.follow-main.following', {
                url: '/following',
                templateUrl: 'views/user/profile/following.view.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/user/login.view.html',
                controller: "LoginController"
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/user/register.view.html',
                controller: "RegisterController"
            })
            .state('admin-user', {
                url: '/admin-user',
                templateUrl: 'views/admin/user.view.html',
                controller: "UserController"
            });

    }
})();