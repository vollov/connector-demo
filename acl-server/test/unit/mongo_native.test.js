'use strict';

var assert = require('assert')
  , should = require('should')
  , client = require('../../lib/mongo_native');

describe('Test native mongodb api', function() {
	
	/**
	 * sort as array: sort([['a', 1]])
	 */
	describe('Test find function', function() {
		
//		var collection_name = 'postcode', 
//			query = {}, 
//			sort_array = [[collection_name,1]], 
//			size = 100;
//		
//		it('should be able to get first page', function(done) {
//			console.log('call client.find()');
//			client.find(collection_name, query, sort_array, size,
//			function(err, items){
//				console.log('call client.find() callback');
//				if(!err){
//					console.log('[0]=%j', items);
//				} else {
//					console.log('getting err:' + err);
//				}
//			});
//			done();
//		});
	});
});