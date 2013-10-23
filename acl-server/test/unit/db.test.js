'use strict';

var assert = require('assert')
  , should = require('should')
  , db = require('../../lib/db');

describe('Test mongojs wrapper -- db module', function() {
	beforeEach(function runBeforeEach() {
		var user = {'password': 'blah', 'is_active': true, 'email': 'insert@gmail.ca','role':2};
		db.save('user', user);
		//console.log('save user ' + user.email);
	});
	
	afterEach(function runAfterEach() {
		db.remove('user', {'email': 'insert@gmail.ca'}, function(err, numberOfRemovedDocs) {
			should.not.exist(err);
			console.log('delete %j user', numberOfRemovedDocs);
		});
	});
	
	describe('Test find and save function', function() {
		console.log('Start test find function...');
		it('should find 5 users in test db', function() {
			db.find('user', {}, {'email' : 1,  'role':1}, 10, function(err, users) {
				should.not.exist(err);
				console.log('return ' + users.length + ' users.');
				
				users.should.have.lengthOf(6);
			});
		});
	});

	describe('Test save function', function() {
		it('should be able to insert a user', function() {
			db.find('user', {},{'email' : 1,  'role':1}, 10, function(err, users) {
				should.not.exist(err);
				users.should.have.lengthOf(6);
			});
		});
	});
	
	describe('Test update function', function() {
		it('should be able to update user', function() {
			db.update('user',  {'email': 'insert@gmail.ca'}, {$set: {"email":"insert@gmail.ca","password":"adf","is_active":false,"role":1}}, {multi:true},
					function(err, doc){
				should.not.exist(err);
				console.log('updated user = %j', doc);
			});
			db.findOne('user', {'email': 'insert@gmail.ca'}, {'is_active': 1, 'password':1, 'email': 1, 'role':1}, function(err, user) {
				should.not.exist(err);
				console.log('findOne function with projects: return user %j',user);
				user.should.have.property('is_active', false);
				user.should.have.property('role', 1);
			});
		});
	});
	
	describe('Test findAndModify function', function() {
		it('should be able to find and update user by email', function() {
			db.findAndModify('user',  {'email': 'insert@gmail.ca'}, {$set: { is_active: false }}, 
					function(err, doc){
				should.not.exist(err);
				console.log('findAndModify user = %j', doc);
			});
			db.findOne('user', {'email': 'insert@gmail.ca'}, {'is_active': 1, 'email': 1}, function(err, user) {
				should.not.exist(err);
				console.log('return user ' + user.email);
				user.should.have.property('is_active', false);
			});
		});
	});
});
