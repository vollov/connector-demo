'use strict';

var request = require('supertest')
	, should = require('should')
	, app = require('../../app').app;

describe('Test user api', function() {
	
	describe('Test /api/user', function() {
		it('should return 5 users for url /api/user', function(done) {
			request(app)
			.get('/api/user')
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect('Content-Length', '20')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(5);
				if (err) return done(err);
				done();
			});
		});
	});
	
	describe('Test /api/login', function() {
		it('should return HTTP 200 if authentication success', function(done) {
			
			var credentials = {
				username: 'mary@demo.org',
				password: 'passwd'
			}
			request(app)
			.post('/api/login')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				//user.should.have.property('role', 1);
//				if (err) return done(err);
				done();
			});
		});
		
		it('should return HTTP 401 if user is not in db', function(done) {
			
			var credentials = {
				username: 'mary.li@demo.org',
				password: 'passwd'
			}
			request(app)
			.post('/api/login')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.property('message', 'user name is not existing');
//				if (err) return done(err);
				done();
			});
		});
		
		it('should return HTTP 401 if password is not correct', function(done) {
			
			var credentials = {
				username: 'mary@demo.org',
				password: 'wrongpasswd'
			}
			request(app)
			.post('/api/login')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.property('message', 'incorrect password');
//				if (err) return done(err);
				done();
			});
		});
	});
});