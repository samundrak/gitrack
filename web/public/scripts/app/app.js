var io = io.connect(window.location.href);
var app = angular.module('gitrack', ['ui.router', 'angularMoment']);
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
            startApp: false,
            git: {
                current: {
                    branch: 'Not Available'
                }
            }
        }
    });

    angular.extend($scope, {
        startTimer: function () {
            io.emit('startTimer', {});
            toastr.info('Timer has been started again');
            $scope.dashboard.startApp = false;
        },
        getDashboard: function () {
            $http.get('/api/dashboard', {})
                .success(function (data) {
                    $scope.dashboard = data;
                    if (data.hasOwnProperty('break')) {
                        $scope.dashboard.startApp = true;
                        $scope.dashboard.breakStartedOn = data.break.on;
                    }
                });

            return this;
        },
        eventListener: function () {
            io.on('notification', function (data) {
                if (data.title === 'Break Time!') {
                    $scope.dashboard.startApp = true;
                    $scope.dashboard.breakStartedOn = data.on;
                }
                $scope.dashboard.logs.push(data);
                toastr[data.type](data.message);
                $scope.$apply();
            });
            return this;
        }
    });

    $scope.getDashboard().eventListener();
}]);

app.controller('settingsCtrl', ['$scope', '$http', function ($scope, $http) {

    angular.extend($scope, {
        config: {}
    });

    angular.extend($scope, {
        pingApp: function () {
            'use strict';
            io.emit('startTimer', {});
            toastr.info('Timer has been Toggled');
        },
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