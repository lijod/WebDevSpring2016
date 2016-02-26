"use strict";
(function() {
    angular
        .module("GadgetGuruApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/user/profile/profile.view.html'
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
            .state('home', {
            url: '/home',
            template: 'I could sure use a drink right now.'
        })
    }
})();