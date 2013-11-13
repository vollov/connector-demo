'use strict';

///////////////// User Start///////////////////////
demoApp.controller('PostCodeCtrl', function ($scope, $http, $filter, PostCode, PageService) {
//	$scope.page = 0;
	$scope.size = 20;
	 
	
	PostCode.query().success(function(response,status){
		$scope.segments = response;
		$scope.postcodes = $filter('paginate')($scope.segments,0,$scope.size);
		$scope.pageCount = PageService.pageCount($scope.segments.length, $scope.size)
	});
	
	$scope.setPage = function(page){
		//debugger;
		console.log('got page=' + page);
		$scope.postcodes = $filter('paginate')($scope.segments,page,$scope.size);
	};
});

demoApp.controller('UserCtrl', function ($scope, $http, User) {
	$scope.users = User.query();

/*
	$http.jsonp('http://localhost:3000/api/user?callback=JSON_CALLBACK').
		success(function(data) {
			$scope.users = data.response.users;
			console.log('users ='+$scope.users.length);
    	});

	$http.jsonp('http://localhost:3000/api/user?callback=JSON_CALLBACK').
		then(function(res) {
			$scope.users = res.data;
			console.log('users ='+$scope.users.length);
    	});
    	
*/

	$scope.selectUser = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deleteUser = function(user, index) {
		user.$delete({id:user.id});
		$scope.users.splice(index, 1);
	};
});

demoApp.controller('AddUserCtrl', function($scope, $location, User) {
	
	$scope.saveUser = function() {
		User.save($scope.user, function() {
			$location.path('/users');
		});
	};
});

demoApp.controller('EditUserCtrl', function($scope, $location, $routeParams, User ) {

	$scope.user = User.get({
		id : $routeParams.id
	});
	
	$scope.saveUser = function() {
		$scope.user.$update();
		$location.path('/users');
	};
});

///////////////// Other Start///////////////////////

demoApp.controller("NavCtrl", function($scope, $location, AuthenticationService) {
	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/');
		});
	};
});

demoApp.controller('LoginCtrl', function ($scope, $location, $cookieStore, AuthenticationService) {
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			$location.path('/settings');
//			var nextView = $cookieStore.get('nextView');
//			$cookieStore.remove('nextView');
//			if (nextView != null) {
//				console.log('login good, get nextView=' + nextView);
//				$location.path(nextView);
//			} else {
//				$location.path('/settings');
//			}
		});
//		$http({url:'/api/users', 
//			method:'POST',
//			data: $scope.credentials	
//		}).success(function(data, status, headers, config) {
//		    $scope.data = data;
//		}).error(function(data, status, headers, config) {
//		    $scope.status = status;
//		});
//		
//		if($scope.credentials.username === "dustin") {
//			$location.path('/home');
//		}
		//console.log($scope.credentials.username);
	};
	
});
