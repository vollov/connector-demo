var crypto = require('crypto');
var uuid = require('node-uuid');

module.exports = {
	hash : function(value){
		var hash = crypto.createHash('sha1');
		return hash.update(value).digest('hex');
	},
	
	uuid : function() {
		return uuid.v4();
	}
}
//var hashes = crypto.getHashes();
//console.log(hashes);

//var shasum1 = crypto.createHash('sha1');
//var shasum2 = crypto.createHash('sha1');
//var shasum3 = crypto.createHash('sha1');
//
//var res1 = shasum1.update('foobar').digest('hex');
//var res2 = shasum2.update('blah').digest('hex');
//var res3 = shasum3.update('passwd').digest('hex');
//console.log(res1);
//console.log(res2);
//console.log(res3);
//8843d7f92416211de9ebb963ff4ce28125932878
//5bf1fd927dfb8679496a2e6cf00cbe50c1c87145
//30274c47903bd1bac7633bbf09743149ebab805f

