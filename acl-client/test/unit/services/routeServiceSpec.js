'use strict';

describe('Test RouteService', function () {
	var routeService, rootScope, $httpBackend;
	
	beforeEach(function(){
		module('appModule');
		inject(function(RouteService,$injector) {
			rootScope = $injector.get('$rootScope');
			routeService = RouteService;
		}, function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
		});
	});
	
	it('should be able to get public route', function() {
		$httpBackend.expectGET('http://localhost:3000/public/routes')
		.respond(200, {routes: ['/','/login','/logout','/about']});

		expect(routeService.publicRoutes()).toBe(undefined);
		$httpBackend.flush();
		expect(routeService.publicRoutes()).toContain('/logout');
	});
});