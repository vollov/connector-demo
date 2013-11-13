'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../app').app;

describe('Test postcode api', function() {
	
	var url_postcode_list = '/public/postcode';
	var token_id = 'f2cb3e8d653f46008272113c6c72422843901ef3';
	
	describe('Test get postcode list by pages: GET->' + url_postcode_list, function() {
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
		/**
		 * [0] = A0A0A0, [last] = G6E1J3
		 * [0] = A0A0A0, [99] = A0B2B0
		 * [100] = A0B2C0, [199] = A0E2J0
		 * Sort direction can be 1 (ascending) or -1 (descending)
		 * mongo query string:
		 * db.postcode.find().sort({postcode:1}).limit(100)
		 * db.postcode.find().limit(100).sort({postcode:1})
		 */
		it('request should return 100 results with first page', function(done) {
			request(app)
			.get(url_postcode_list + '?s=100&f=postcode&d=1&tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(100);
				res.body[0].postcode.should.equal('A0A0A0');
				res.body[99].postcode.should.equal('A0B2B0');
				if (err) return done(err);
				done();
			});
		});
		
		it('request should return 100 results with 2nd page', function(done) {
			request(app)
			.get(url_postcode_list + '?s=100&f=postcode&d=1&c=A0B2B0&tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(100);
				res.body[0].postcode.should.equal('A0B2C0');
				res.body[99].postcode.should.equal('A0E2J0');
				if (err) return done(err);
				done();
			});
		});
		
		it('request should return 100 results with 1st page in reverse direction', function(done) {
			request(app)
			.get(url_postcode_list + '?s=100&f=postcode&d=-1&tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(100);
				res.body[0].postcode.should.equal('G6E1J3');
				if (err) return done(err);
				done();
			});
		});
	});
});