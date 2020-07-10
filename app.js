(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate'])
        .config(config)
        .run(run)
        .controller("languageController" ,function($scope,$translate){
            $scope.selectLang = function(lang){
            $translate.use(lang); 
            }
          });

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider'];
    function config($routeProvider, $locationProvider, $translateProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });

        var en_translations = {
           "login" : "Login",
            "username" : "Username",
            "password" : "Password",
            "register" : "Register",
            "firstName" : "First name",
            "lastName" : "Last name",
            "eng" : "English",
            "geo" : "Georgian",
            "delete" : "Delete",
            "logout" : "Logout",
            "error" : "Username or password is incorrect",
            "allUsers" : "All users:",
            "hi" : "Hi"
        }
              
        var ka_translations = {
            "login" : "ავტორიზაცია",
            "username" : "მომხმარებლის სახელი",
            "password" : "პაროლი",
            "register" : "რეგისტრაცია",
            "firstName" : "სახელი",
            "lastName" : "გვარი",
            "eng" : "ინგლისური",
            "geo" : "ქართული",
            "delete" : "წაშლა",
            "logout" : "გასვლა",
            "error" : "სახელი ან პაროლი არასწორია",
            "allUsers" : "ყველა მომხმარებელი:",
            "hi" : "გამარჯობა"
        }
              
        $translateProvider.translations('en',en_translations);
              
        $translateProvider.translations('ka',ka_translations);
              
        $translateProvider.preferredLanguage('en');
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();;