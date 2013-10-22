'use strict';

var assert = require('assert')
  , should = require('should')
  , security = require('../lib/security');

describe('Test encryption module', function() {
	
	describe('Test hash function', function() {
		it('should be able to hash password', function() {
			var result = security.hash('foobar');
			result.should.equal('8843d7f92416211de9ebb963ff4ce28125932878');
		});
		
		it('should be able to hash email + uuid', function() {
			var email = 'mary@demo.org';
			var uuid = '110ec58a-a0f2-4ac4-8393-c866d813b8d1';
			var result = security.hash(email + uuid);
			result.should.equal('f2cb3e8d653f46008272113c6c72422843902ef8');
		});
	});
});