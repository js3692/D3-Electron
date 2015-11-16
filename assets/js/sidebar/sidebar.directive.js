app.directive('sidebar', function ($state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'assets/js/sidebar/sidebar.html',
        link: function (scope) {
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Discover', state: 'discover' },
                { label: 'Bar', state: 'bar' },
                { label: 'Pie', state: 'pie' },
                { label: 'Scattered Plot', state: 'scattered' }
            ];

            scope.navigate = $state.go;

        }

    };

});