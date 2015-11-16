app.config(function ($stateProvider) {
    $stateProvider.state('scattered', {
        url: '/scattered',
        templateUrl: 'assets/js/scattered/scattered.html',
        controller: 'ScatteredCtrl'
    });
});