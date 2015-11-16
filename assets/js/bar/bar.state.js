app.config(function ($stateProvider) {
    $stateProvider.state('bar', {
        url: '/bar',
        templateUrl: 'assets/js/bar/bar.html',
        controller: 'BarCtrl'
    });
});