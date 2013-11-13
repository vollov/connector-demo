'use strict';

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