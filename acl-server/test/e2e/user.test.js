'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../app').app;

describe('Test user api', function() {

	var url_user_list = '/api/user';
	var token_id = 'f2cb3e8d653f46008272113c6c72422843901ef3';
	
	describe('Test get a list of user: GET->' + url_user_list, function() {
		
		var email = 'mary@demo.org';
		
		beforeEach(function(done) {
			var record = [token_id, 'email', email, 'role', 1];
			redisService.save(token_id, record, function(err, reply){
				console.log(reply.toString());
				done();
			});
		});
		
		afterEach(function(done){
			redisService.remove(token_id, function(err, reply){
				console.log(reply.toString());
				done();
			});
		});
		
		it('request should fail when visit /api/user without tokenid', function(done) {
			request(app)
			.get(url_user_list)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect('Content-Length', '20')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				//console.log('====>' + res.body['message']);
				res.body.should.have.property('message', 'please login');
				done();
			});
		});
		
		it('request should fail when visit /api/user with invalid tokenid', function(done) {
			request(app)
			.get(url_user_list + '?tid=invalidid')
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect('Content-Length', '20')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.property('message', 'invalid tid');
				done();
			});
		});
		
		it('should return 5 users for url /api/user', function(done) {
			request(app)
			.get(url_user_list + '?tid=' + token_id)
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
});