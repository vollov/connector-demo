'use strict';

var assert = require('assert')
  , should = require('should')
  , db = require('../../lib/db');

describe('Test mongojs wrapper -- db module', function() {
	
	var email = 'insert@gmail.ca';

	afterEach(function(done) {
		db.remove('user', {'email': email}, function(err, numberOfRemovedDocs) {
			should.not.exist(err);
			// console.log('delete %j user', numberOfRemovedDocs);
			done();
		});
	});
	
	describe('Test find function', function() {
		// console.log('Start test find function...');
		it('should find 5 users in test db', function(done) {
			db.find('user', {}, {'email' : 1,  'role':1}, 10, function(err, users) {
				should.not.exist(err);
				// console.log('return ' + users.length + ' users.');
				users.should.have.lengthOf(5);
				done();
			});
		});
	});

	describe('Test save function', function() {
		it('should be able to insert a user', function(done) {
			var user = {'password': 'blah', 'is_active': true, 'email': email,'role':2};
			db.save('user', user, function(err, user){
				should.not.exist(err);
				db.find('user', {},{'email' : 1,  'role':1}, 10, function(err, users) {
					should.not.exist(err);
					users.should.have.lengthOf(6);
					done();
				});
			});
		});
	});

	describe('Test update function', function() {
		it('should be able to update a none existing user', function(done) {
			db.update('user',  {'email': 'insert@gmail.ca'}, 
				{$set: {"email": email,"password":"adf","is_active":false,"role":1}}, 
				{multi:true, upsert: true, safe: true},
					function(err, doc){
				should.not.exist(err);
				//console.log('updated user = %j', doc);
				
				db.findOne('user', {'email': 'insert@gmail.ca'}, {'is_active': 1, 'password':1, 'email': 1, 'role':1}, function(err, user) {
					should.not.exist(err);
					should.exist(user);
					//console.log('findOne function with projects: return user %j',user);
					user.should.have.property('is_active', false);
					user.should.have.property('role', 1);
					done();
				});
			});
		});
	});
	
	describe('Test findAndModify function', function() {
		it('should be able to find and update user by email', function(done) {
			var user = {'password': 'blah', 'is_active': true, 'email': email,'role':2};
			db.save('user', user, function(err, user){
				should.not.exist(err);
			});
			
			db.findAndModify('user',  {'email': email}, 
				{$set: { is_active: false }},
				function(err, doc){
					should.not.exist(err);
					//console.log('findAndModify user = %j', doc);
					
					db.findOne('user', {'email': email}, {'is_active': 1, 'email': 1}, function(err, user) {
						should.not.exist(err);
						//console.log('return user ' + user.email);
						user.should.have.property('is_active', false);
						done();
					});
			});
		});
	});
});
