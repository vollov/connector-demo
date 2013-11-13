'use strict';

describe('Test PageService', function() {
	var pageService;
	
	beforeEach(function(){
		module('appModule');
		inject(function(PageService) {
			pageService = PageService;
		});
	});
	
	/**
	 * Test case: 186 items, 30 items per page = 30*6+6
	 */
	it('should be able to count, result = 7 pages', function() {
		expect(pageService.pageCount(186,30)).toBe(7);
	});
});