app.config(function ($stateProvider) {
    $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'assets/js/discover/discover.html',
        controller: 'ExternalCtrl'
    });
});