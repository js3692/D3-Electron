app.config(function ($stateProvider) {
    $stateProvider.state('pie', {
        url: '/pie',
        templateUrl: 'assets/js/pie/pie.html',
        controller: 'PieCtrl'
    });
});