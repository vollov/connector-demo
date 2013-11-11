'use strict';

describe('\nTest all directives in the acl-client\n', function() {

	describe('Test demo directive demoHello', function() {
		var elementx, $scope;
		
		beforeEach(function(){
			module('appModule');
			//do not use the tempalte url, hard to test,  load the templates
			//module('views/templates/demoHello.html');
			inject(function($compile, $rootScope) {
				$scope = $rootScope;
				elementx = angular.element("<demo-hello></demo-hello>");
				$compile(elementx)($rootScope);
				$scope.$digest();
			});
		});
		
		it('should print a Hello World', function(){
			//expect(element('div span').text()).toMatch(/Hello World/);
		});
	});
	
	describe('Test sample directive ehSimple', function() {
		
		var element;
		var $scope;
		beforeEach(function(){
			module('appModule');
			inject(function($compile, $rootScope) {
				$scope = $rootScope;
				element = angular.element('<div eh-simple>{{2 + 2}}</div>');
				$compile(element)($rootScope);
				$scope.$digest();
			});
		});
		
		it('should equal 4', function(){
			expect(element.html()).toBe('4');
		});
		
		it('should add a class of plain', function(){
			expect(element.hasClass('plain')).toBe(true);
		});
		
//		it('should respond to a click', function(){
//			browserT
//		});
	});
});