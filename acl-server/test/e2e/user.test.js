'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../app').app;

describe('Test user api', function() {
	
	var url_login = '/public/login';
	var url_user_list = '/api/user';
	
	describe('Test get a list of user: GET->' + url_user_list, function() {
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
			var credentials = {
				username: 'mary@demo.org',
				password: 'passwd'
			}
			
			var token_id;
			
			request(app)
			.post(url_login)
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				token_id = res.body['tokenid'];
				console.log('set tid in e2e test, tid=' + token_id);
				token_id.length.should.equal(40);
				var query = [token_id, 'username'];
				redisService.hget(query, function(err, reply){
					should.not.exist(err);
					reply.should.equal('mary@demo.org');
				});
			});
			
			request(app)
			.get(url_user_list + '?tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect('Content-Length', '20')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(5);
				
				redisService.remove(token_id, function(err, reply){
					should.not.exist(err);
				});
				
				if (err) return done(err);
				done();
			});
		});
	});
});