'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../app').app;

describe('Test message api', function() {

	var url_message_list = '/api/message';
	var token_id = 'f2cb3e8d653f46008272113c6c72422843901ef3';
	
	describe('Test get a list of message: GET->' + url_message_list, function() {
		it('request should fail when visit /api/message without tokenid', function(done) {
			request(app)
			.get(url_message_list)
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
		
		it('request should fail when visit /api/message with invalid tokenid', function(done) {
			request(app)
			.get(url_message_list + '?tid=invalidid')
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
		
		it('should return 5 messages for url /api/message', function(done) {
			request(app)
			.get(url_message_list + '?tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect('Content-Length', '20')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(0);
				if (err) return done(err);
				done();
			});
		});
	});
});
