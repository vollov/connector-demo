'use strict';

var assert = require('assert')
  , should = require('should')
  , midware = require('../../lib/midware');

describe('Test midware services', function() {
	
//	var email = 'insert@gmail.ca';
//
//	afterEach(function(done) {
//		db.remove('user', {'email': email}, function(err, numberOfRemovedDocs) {
//			should.not.exist(err);
//			// console.log('delete %j user', numberOfRemovedDocs);
//			done();
//		});
//	});
	
	var request = {};
	
	var response = {
		viewName: ""
		, data : {}
		, render: function(view, viewData) {
			this.viewName = view;
			this.data = viewData;
		}
	};
	
//	var next = function(){
//		
//	};
	describe('Test head function', function() {
		it('head function should be able to update header', function(done) {
			midware.head(request, response);
			dump(response);
			done();
		})
//		it('should find 5 users in test db', function(done) {
//			db.find('user', {}, {'email' : 1,  'role':1}, 10, function(err, users) {
//				should.not.exist(err);
//				// console.log('return ' + users.length + ' users.');
//				users.should.have.lengthOf(5);
//				done();
//			});
//		});
	});
});