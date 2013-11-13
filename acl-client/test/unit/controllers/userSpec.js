'use strict';

describe('User related controllers', function() {
	var resourceRoot = 'http://localhost:3000';
	var users = [ {
		"_id" : "524ae33f2e75106200ade071",
		"password" : "passwd",
		"is_active" : false,
		"email" : "mary@demo.org",
		"role" : 1
	}, {
		"_id" : "524ae33f2e75106200ade072",
		"password" : "foobar",
		"is_active" : true,
		"email" : "wendy@abc.com",
		"role" : 2
	} ];
	
	describe('UserCtrl', function() {
		var scope, ctrl, $httpBackend;
		beforeEach(module('appModule'));

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(resourceRoot + '/api/user?').respond(users);
			scope = $rootScope.$new();
			ctrl = $controller('UserCtrl', {
				$scope : scope
			});
		}));

		it('users model should have 2 users', function() {
			expect(scope.phones).toBeUndefined();
			$httpBackend.flush();
			expect(scope.users.length).toBe(2);
			expect(scope.users[0].email).toBe('mary@demo.org');
		});
	});
});