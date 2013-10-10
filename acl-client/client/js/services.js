'use strict';

var resourceRoot = 'http://192.168.1.104\\:3000';
var httpRoot = 'http://192.168.1.104:3000';

demoApp.factory('User', function($resource) {
	return $resource(resourceRoot + '/api/user/:id', {id: '@id'}, {
        update: {method:'PUT'}
    });
});

demoApp.factory('SessionService', function(){
	return {
		get: function(key){
			return sessionStorage.getItem(key);
		},
		set: function(key,value){
			return sessionStorage.setItem(key, value);
		},
		unset: function(key){
			return sessionStorage.removeItem(key);
		}
	};
});

demoApp.factory('AuthenticationService', function($http, $location,
		SessionService, FlashService) {
	var cacheSession = function() {
		SessionService.set('authenticated', true);
	};

	var uncacheSession = function() {
		SessionService.unset('authenticated');
	};

	var loginError = function(response) {
		FlashService.show(response.flash);
	};

	// these routes map to stubbed API endpoints in config/server.js
	return {
		login : function(credentials) {
			// var login = $http.post('/api/login', credentials);
			var login = $http({
				url : httpRoot + '/api/login',
				method : 'POST',
				data : credentials
			});
			login.success(cacheSession);
			login.success(FlashService.clear);
			login.error(loginError);
			return login;
		},
		logout : function() {
			var logout = $http.get('/api/logout');
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn : function() {
			return SessionService.get('authenticated');
		}
	};
});

demoApp.factory("FlashService", function($rootScope) {
	  return {
	    show: function(message) {
	      $rootScope.flash = message;
	    },
	    clear: function() {
	      $rootScope.flash = "";
	    }
	  }
	});

//demoApp.run(function($rootScope, $location, $cookieStore, AuthenticationService) {
//	var routesThatRequireAuth = [ '/users','/settings' ];
//
//	$rootScope.$on('$routeChangeStart', function(event, next, current) {
//		
//		if (_(routesThatRequireAuth).contains($location.path())
//				&& !AuthenticationService.isLoggedIn()) {
//			$cookieStore.put('nextView', $location.path());
//			$location.path('/login');
//		}
//	});
//});