'use strict';

describe('Test all services in the acl-client', function() {

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
	
	describe('Test AuthenticationService', function() {
		
		var authenticationService;
		
		beforeEach(function(){
			module('appModule');
			inject(function(AuthenticationService) {
				authenticationService = AuthenticationService;
			});
		});
		
		it('should be able to check if logged in', function() {
//			expect(sessionService.get('tokenid')).toBeNull();
//			sessionService.set('tid', 'f2cb3e8d653f46008272113c6c72422843902ef8');
//			//console.log('get tokenid = ' + sessionService.get('tokenid'));
//			expect(sessionService.get('tid')).toBe('f2cb3e8d653f46008272113c6c72422843902ef8');
//			sessionService.unset('tid');
//			expect(sessionService.get('tid')).toBeNull();
		});
		
		it('should be able to login success with good credentials', function() {
			
		});
		
		it('should be able to login fail with bad credentials', function() {
			
		});
		
		it('should be able to logout in any condition', function() {
			
		});
	});
});
