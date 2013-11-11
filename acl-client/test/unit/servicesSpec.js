'use strict';

describe('\nTest all services in the acl-client\n', function() {

	describe('Test SessionService', function() {
		var sessionService;
		
		beforeEach(function(){
			module('appModule');
			inject(function(SessionService) {
				sessionService = SessionService;
			});
		});
		
		it('should be able to set/get/unset a key-value pair, backed by session cookies', function() {
			expect(sessionService.get('tokenid')).toBeNull();
			sessionService.set('tid', 'f2cb3e8d653f46008272113c6c72422843902ef8');
			//console.log('get tokenid = ' + sessionService.get('tokenid'));
			expect(sessionService.get('tid')).toBe('f2cb3e8d653f46008272113c6c72422843902ef8');
			sessionService.unset('tid');
			expect(sessionService.get('tid')).toBeNull();
		});
	});
	
//	describe('Test module run()', function () {
//		var appModule, $httpBackend, rootScope;
//		
//		beforeEach(function(){
//			module('appModule');
//			//runBlock = appModule._runBlocks[0];
//			inject(function($injector) {
//				rootScope = $injector.get('$rootScope');
//			}, function(_$httpBackend_){
//				$httpBackend = _$httpBackend_;
//			});
//		});
//		
//		it('should be able to request the /pulbic/routes', function() {
//			$httpBackend.expectGET('http://localhost:3000/public/routes')
//			.respond(200, {routes: ['/logout','/about']});
//			//dump(appModule);
//			//$httpBackend.flush();
//			
////			expect(flashService.get()).toBe(undefined);
////			flashService.set('user name is not existing');
////			//rootScope.$digest();
////			expect(flashService.get()).toBe('user name is not existing');
////			flashService.clear();
////			expect(flashService.get()).toBe('');
//		});
//	});
	
	describe('Test FlashService', function () {
		var flashService, rootScope;
		
		beforeEach(function(){
			module('appModule');
			inject(function(FlashService,$injector) {
				rootScope = $injector.get('$rootScope');
//				flashService = $injector.get('FlashService');
				flashService = FlashService;
			});
		});
		
		it('should be able to set/get/clear $rootScope.flash', function() {
			expect(flashService.get()).toBe(undefined);
			flashService.set('user name is not existing');
			//rootScope.$digest();
			expect(flashService.get()).toBe('user name is not existing');
			flashService.clear();
			expect(flashService.get()).toBe('');
		});
	});
	
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
			$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
			.respond(401, { message : 'user name is not existing' });
			authenticationService.login(credentials);
			$httpBackend.flush();
			expect(authenticationService.isLoggedIn()).toBeFalsy();
			expect(flashService.get()).toBe('user name is not existing');
		});
		
		it('login should be able to handle respons for bad password', function() {
			$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
			.respond(401, { message : 'incorrect password' });
			authenticationService.login(credentials);
			$httpBackend.flush();
			expect(authenticationService.isLoggedIn()).toBeFalsy();
			expect(flashService.get()).toBe('incorrect password');
		});
		
		it('login should be able to handle respons for DB error', function() {
			$httpBackend.expectPOST('http://localhost:3000/public/login', credentials)
			.respond(500, { message : 'Error when querying database' });
			authenticationService.login(credentials);
			$httpBackend.flush();
			expect(authenticationService.isLoggedIn()).toBeFalsy();
			expect(flashService.get()).toBe('Error when querying database');
		});
//		
//		it('should be able to logout in any condition', function() {
//			
//		});
	});
	
	describe('Test PaginationService', function() {
		var paginationService;
		
		beforeEach(function(){
			module('appModule');
			inject(function(PaginationService) {
				paginationService = PaginationService;
				paginationService.itemCount = 186;
				paginationService.rowsPerPage = 30;
				paginationService.page = 0;
			});
		});
		
		/**
		 * Test case: 186 items, 30 items per page = 30*6+6
		 */
		it('should be able to count, result = 7 pages', function() {
			expect(paginationService.pageCount()).toBe(7);
		});
		
		it('default should be 1st page', function() {
			//console.log('page=' + paginationService.page);
			expect(paginationService.isFirstPage()).toBeTruthy();
			expect(paginationService.isLastPage()).toBeFalsy();
		});
		
		it('should be able to set page to 6', function() {
			paginationService.setPage(6);
			expect(paginationService.isFirstPage()).toBeFalsy();
			expect(paginationService.isLastPage()).toBeTruthy();
			paginationService.setPage(0);
			expect(paginationService.isFirstPage()).toBeTruthy();
			expect(paginationService.isLastPage()).toBeFalsy();
		});
		
		it('should not be able to set page to 7', function() {
			paginationService.setPage(7);
			expect(paginationService.isFirstPage()).toBeTruthy();
		});
		
		it('should be able to get next page', function() {
			paginationService.nextPage();
			expect(paginationService.page).toBe(1);
			paginationService.nextPage();
			expect(paginationService.page).toBe(2);
			paginationService.previousPage();
			expect(paginationService.page).toBe(1);
		});
	});
});
