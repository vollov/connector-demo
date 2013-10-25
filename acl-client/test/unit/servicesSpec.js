'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	var basicSvc;
	beforeEach(function(){
		module('appModule');
	    inject(function(MyService) {
	        basicSvc = MyService;
	    });
	});
	
	it('should return a message', function(){
		expect(basicSvc.message).toBe("I'm data from a service");
	});

});
