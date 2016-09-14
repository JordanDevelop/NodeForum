var app = angular.module('nodeforum', ['ui.router']);

app.factory('posts', [function () {
    var o = {
        posts: []
    };

    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',

    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            });

        $stateProvider
            .state('posts', {
                url: '/posts/{id:int}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
    var nextPostIndex = 0;
    $scope.posts = posts.posts;

    $scope.addPost = function () {
        if (!$scope.title || $scope.title === '') {
            return;
        }

        $scope.posts.push({
            id: nextPostIndex++,
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
                {
                    author: 'Joe',
                    body: 'Cool Post!',
                    upvotes: 0
                },
                {
                    author: 'Bob',
                    body: 'Great idea but no!',
                    upvotes: 0
                }
            ]
        });

        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
        post.upvotes += 1;
    }

}]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function ($scope, $stateParams, posts) {
        console.log('post controller');
        console.log(posts.posts);
        console.log($stateParams.id);

        $scope.post = posts.posts[$stateParams.id];
}]);