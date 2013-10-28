'use strict';

describe('End to end test Suit for login ', function() {

	describe('Test /login view', function() {
		beforeEach(function() {
			browser().navigateTo('/login');
		});
	
		it('should render about page when user navigates to /about', function() {
			//dump(element('[ng-view] p:first'));
			expect(element('[ng-view] div').text()).toMatch(/This is About Page/);
		});
	});
});
