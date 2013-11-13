'use strict';

describe('Test AuthenticationService', function() {
	
	var authenticationService, sessionService,flashService,
		$httpBackend, rootScope;
	var credentials = {
			username: 'mary@demo.org',
			password: 'passwd'
	};
	
	beforeEach(function(){
		module('appModule');
		inject(function(AuthenticationService, SessionService, 
				FlashService,$injector) {
			authenticationService = AuthenticationService;
			sessionService = SessionService;
			
			rootScope = $injector.get('$rootScope');
			flashService = FlashService;
		}, function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
		});
	});
	
	it('logged in should be false if cookie tid is null', function() {
		//console.log('login when cookie tid is null');
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(401, { message : 'please login' });
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeFalsy();
	});
	
	it('logged in should be true if cookie tid is not null', function() {
		sessionService.set('tid', 'f2cb3e8d653f46008272113c6c72422843902ef8');
		expect(authenticationService.isLoggedIn()).toBeTruthy();
		sessionService.unset('tid');
		expect(authenticationService.isLoggedIn()).toBeFalsy();
	});
	
	it('should be able to login success when http return 200', function() {
		//$httpBackend.flush();
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(200, 
				{ tokenid : 'f2cb3e8d653f46008272113c6c72422843902ef8'});
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeTruthy();
		
		sessionService.unset('tid');
		expect(authenticationService.isLoggedIn()).toBeFalsy();
	});
	
	it('login should be able to handle respons for non existing username', function() {
		//console.log('login with a non existing username');
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(401, { message : 'user name is not existing' });
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeFalsy();
		expect(flashService.get()).toBe('user name is not existing');
	});
	
	it('login should be able to handle respons for bad password', function() {
		//console.log('login with bad password');
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(401, { message : 'incorrect password' });
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeFalsy();
		expect(flashService.get()).toBe('incorrect password');
	});
	
	it('login should be able to handle respons for DB error', function() {
		//console.log('login with DB error');
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(500, { message : 'Error when querying database' });
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeFalsy();
		expect(flashService.get()).toBe('Error when querying database');
	});

	it('should be able to logout when loggedin', function() {
		$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
		.respond(200, 
				{ tokenid : 'f2cb3e8d653f46008272113c6c72422843902ef8'});
		authenticationService.login(credentials);
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeTruthy();
		
		$httpBackend.expectGET('http://localhost:3000/api/logout?tid=f2cb3e8d653f46008272113c6c72422843902ef8')
		.respond(200, { message : 'logged out' });
		authenticationService.logout();
		$httpBackend.flush();
		expect(authenticationService.isLoggedIn()).toBeFalsy();
	});
});