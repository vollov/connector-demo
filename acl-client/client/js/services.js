'use strict';
//10.100.78.143
var resourceRoot = 'http://localhost\\:3000';
var httpRoot = 'http://localhost:3000';

demoApp.factory('User', function($resource, SessionService) {
	var tokenid = SessionService.get('tid');
	return $resource(resourceRoot + '/api/user/:id', {id: '@id', tid: tokenid}, {
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
	var cacheSession = function(value) {
		console.log('calling cacheSession with tid=' + value);
		SessionService.set('tid', value);
	};

	var uncacheSession = function() {
		SessionService.unset('tid');
	};

	var loginError = function(response) {
		FlashService.show(response.flash);
	};

	// these routes map to stubbed API endpoints in config/server.js
	return {
		login : function(credentials) {
			console.log('calling AuthenticationService.login! ');
			// var login = $http.post('/api/login', credentials);
			var login = $http({
				url : httpRoot + '/public/login',
				method : 'POST',
				data : credentials
			});
			login.success(cacheSession('xxx'));
			login.success(FlashService.clear);
			login.error(loginError);
			return login;
		},
		logout : function() {
			var logout = $http.get('/public/logout');
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn : function() {
			return !(SessionService.get('tid') == null);
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