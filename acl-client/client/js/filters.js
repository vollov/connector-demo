'use strict';

demoApp.filter('paginate', function(PaginationService) {
	return function(input, page, rowsPerPage) {
		if (!input) {
			return input;
		}

		PaginationService.page = page;
		
		if (rowsPerPage) {
			PaginationService.rowsPerPage = rowsPerPage;
		}

		PaginationService.itemCount = input.length;
		console.log('filter getting items=' + input.length + ', rowsPP=' + PaginationService.page);

		return input.slice(parseInt(PaginationService.page
				* PaginationService.rowsPerPage),
				parseInt((PaginationService.page + 1)
						* PaginationService.rowsPerPage));
	}
});

demoApp.filter('forLoop', function() {
	return function(input, start, end) {
		console.log('start=%j, end=%j',start,end);
		input = new Array(end - start);
		for ( var i = 0; start < end; start++, i++) {
			input[i] = start;
		}
		return input;
	}
});