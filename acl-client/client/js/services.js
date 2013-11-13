'use strict';
//10.100.78.143

var resourceRoot = 'http://192.168.1.106\\:3000';
var httpRoot = 'http://192.168.1.106:3000';

//var resourceRoot = 'http://localhost\\:3000';
//var httpRoot = 'http://localhost:3000';

demoApp.factory('AuthenticationService', function($http, $location,
		SessionService, FlashService) {
	var cacheSession = function(value) {
		SessionService.set('tid', value);
	};

	var uncacheSession = function() {
		SessionService.unset('tid');
	};

	var loginError = function(response) {
		//console.log('calling AuthenticationService.loginError!');
		FlashService.set(response.message);
	};

	return {
		login : function(credentials) {
			return $http.post(httpRoot + '/public/login', credentials).
			success(function(response,status){
				if(status == 200){
					cacheSession(response.tokenid);
					FlashService.clear();
				}else{
					loginError(response);
				}
			}).
			error(function(response,status){
				loginError(response);
			});
		},
		logout : function() {
			var tokenid = SessionService.get('tid');
			var logout = $http.get(httpRoot + '/api/logout',
					{params: {tid: tokenid}});
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn : function() {
			return !(SessionService.get('tid') == null);
		}
	};
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

demoApp.factory("FlashService", ['$rootScope', function($rootScope) {
	return {
		set: function(message) {
			$rootScope.flash = message;
		},
		clear: function() {
			$rootScope.flash = "";
		},
		get: function(){
			return $rootScope.flash;
		}
	}
}]);

demoApp.factory("RouteService", function($rootScope, $http) {
	return {
		publicRoutes : function() {
			if($rootScope.publicRoutes == undefined) {
				$http.get(httpRoot + '/public/routes').
				success(function(response,status){
					$rootScope.publicRoutes = response.routes;
				}).
				error(function(response,status){
					$location.path('/500');
				});
			}
			return $rootScope.publicRoutes;
		}
	}
});

demoApp.factory('User', function($resource, SessionService) {
	var tokenid = SessionService.get('tid');
	return $resource(resourceRoot + '/api/user/:id', {id: '@id', tid: tokenid}, {
		update: {method:'PUT'}
	});
});

/**
 * ?s=100&f=postcode&d=1&c=A0B2B0&tid=
 */
//demoApp.factory('PostCode', function($resource, SessionService){
//	var tokenid = SessionService.get('tid');
//	return $resource(resourceRoot + '/api/postcode/:id', {id: '@id', 
//		tid: tokenid, s:300, f:'postcode', d:1}, {
//		update: {method:'PUT'}
//	});
//});

demoApp.factory('PostCode', function($http, SessionService){
	var tokenid = SessionService.get('tid');
	return {
//		getById: function(id){
//			return $http.get(httpRoot + '/api/message/:id', {params: {tid: tokenid}});
//		},
		query: function(){
			return $http.get(httpRoot + '/public/postcode', {params: 
			{tid: tokenid,s:200, f:'postcode', d:1}});
		}
//		save: function(message){
//			return $http.post(httpRoot + '/public/login', message).
//			success(function(response,status){
//				if(status == 200){
//					console.log('message saved: %j', response);
//				}else{
//					console.log('save error: %j', response);
//				}
//			}).
//			error(function(response,status){
//				console.log('save error: %j', response);
//			});
//		}
	}
});

demoApp.factory('PageService', function(){
	return {
		pageCount : function(itemCount, pageSize) {
			return Math.ceil(parseInt(itemCount) / parseInt(pageSize));
		},
		pageList : function(segment, pageCount) {
			var result = new Array(pageCount);
			for ( var i = 0; i < pageCount; i++) {
				result[i] = segment*10 + i;
			}
			return result;
		}
	};
});

/**
 * page are set from 0 to pageCount()-1
 */
demoApp.factory('PaginationService', function() {
	this.page = 0, this.rowsPerPage = 20, this.itemCount = 0;
	
	return {
		setPage : function(page){
			if(page > this.pageCount() - 1) {
				return;
			}
			this.page = page;
		},
		nextPage : function(){
			if(this.isLastPage()) return;
			this.page++;
		},
		previousPage : function(){
			if(this.isFirstPage()) return;
			this.page--;
		},
		firstPage : function(){
			this.page = 0;
		},
		lastPage : function(){
			this.page = this.pageCount()-1;
		},
		isFirstPage : function(){
			//console.log('page='+ this.page+',items=' + this.itemCount + ',size=' + this.rowsPerPage);
			return this.page == 0;
		},
		isLastPage : function(){
			return this.page == this.pageCount()-1;
		},
		pageCount : function(){
			//console.log('items=' + this.itemCount + ',size=' + this.rowsPerPage);
			return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
			//return 8;
		}
	}
});



demoApp.run(function($rootScope, $location, $http, AuthenticationService){
	var routesRequiresNoAuth = [];
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		$http.get(httpRoot + '/public/routes').
		success(function(response,status){
			routesRequiresNoAuth = response.routes;
			//dump(response.routes);
			if (_(routesRequiresNoAuth).contains($location.path())) {
				console.log('$rootScope.$on() in exampty list!' + routesRequiresNoAuth);
			}
			
			if (!_(routesRequiresNoAuth).contains($location.path())
					&& !AuthenticationService.isLoggedIn()) {
				console.log('$rootScope.$on()->need auth');
				$location.path('/login');
			} else {
				console.log('$rootScope.$on()->passed');
			}
		}).
		error(function(response,status){
			console.log('$rootScope.$on()->error()!');
			$location.path('/500');
		});
	});
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