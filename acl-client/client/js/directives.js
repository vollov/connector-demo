'use strict';

demoApp.directive('fdPaginator', function factory() {
	return {
		restrict : 'E',
		controller : function($scope, PaginationService) {
			$scope.paginationService = PaginationService;
		},
		templateUrl : 'views/templates/paginationControl.html'
	};
});

demoApp.directive('demoHello', function() {
	return {
		restrict : 'E',
		transclude: true,
		replace: true,
		template : '<div><span>Hello World</span>' +
			'<div class="pagination">' +
				'<ul><li ng-repeat="i in [] | forLoop:0:9"><a>{{i+1}}</a></li></ul>' +
			'</div></div>'
	};
});

demoApp.directive('ehSimple', function() {
	return function(scope,element){
		element.addClass('plain');
//		restrict : 'E',
//		templateUrl : 'views/templates/demoHello.html'
	};
});