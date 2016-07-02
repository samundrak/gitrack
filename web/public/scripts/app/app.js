var io = io.connect(window.location.href);
var app = angular.module('gitrack', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
            url: '/',
            templateUrl: '/views/app/partials/dashboard',
            controller: 'dashboardCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: '/views/app/partials/settings',
            controller: 'settingsCtrl'
        });
});

app.controller('dashboardCtrl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    angular.extend($scope, {
        dashboard: {
            git: {
                current: {
                    branch: 'Not Available'
                }
            }
        }
    });

    angular.extend($scope, {
        getDashboard: function () {
            $http.get('/api/dashboard', {})
                .success(function (data) {
                    $scope.dashboard = data;
                    $scope.dashboard.timer = {
                        started: moment(data.timer.started).fromNow(),
                        updated: moment(data.timer.updated).fromNow(),

                    };
                    console.log($scope.dashboard)
                });
        },

    });

    $scope.getDashboard();
}]);

app.controller('settingsCtrl', ['$scope', '$http', function ($scope, $http) {

    angular.extend($scope, {
        config: {}
    });

    angular.extend($scope, {
        stopApp: function () {
            var exitConfirm = confirm('Are your sure?' +
                '\nBy exiting app you can\'t browse this anymore');
            if (!exitConfirm) return;
            io.emit('stopApp', {});
            toastr.info('App has been terminated');
            setTimeout(function () {
                'use strict';
                window.location.reload();
            }, 5000);
        },
        getConfiguration: function () {
            'use strict';
            $http.get('/api/settings')
                .success(function (data) {
                    $scope.config = data;
                });
        },
        saveConfiguration: function () {
            'use strict';
            if (!$scope.config) return;
            $http.post('/api/settings', $scope.config)
                .success(function (data) {
                    if (!data.success) {
                        return toastr.error(data.message);
                    }

                    return toastr.info(data.message);
                });
        }
    });

    $scope.getConfiguration();
}]);