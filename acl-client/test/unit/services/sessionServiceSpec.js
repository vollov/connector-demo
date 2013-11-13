'use strict';

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