'use strict';

demoApp.directive('fdPaginator', function factory() {
	return {
		restrict : 'E',
		scope : {
			setPage : '&'
		},
		controller : function($scope, PaginationService) {
			$scope.paginationService = PaginationService;
		},
		templateUrl : 'views/templates/paginationControl.html'
	};
});

demoApp.directive('demoCaller', function factory() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			dial : '&',
			pc: '='
		},
//		link : function(scope, element, attrs) {
//			var pcx = scope.$eval(attrs.pc);
//			console.log('pageCount=' + scope.pageCount);
//			scope.pageCount = attrs.pageCount;
//		},
		controller : function($scope, PageService) {
			$scope.pageService = PageService;
		},
		template : '<div><span>Hello World {{pc}}</span>' + 
			'<div class="pagination">' +
			'<ul><li ng-click="dial({page:i})" ng-repeat="i in pageService.pageList(0, pc)"><a>{{i+1}}</a></li></ul>' +
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