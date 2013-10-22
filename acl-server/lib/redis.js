var redis = require("redis"),
	client = redis.createClient();

module.exports = {
	/** 
	 * save or overwrite key-value pairs
	 * 
	 * values : 	a list like ['key', 'subkey1', 'v1', 'subkey2', 737]
	 * call back:	function like:
	 * function (err, reply) {console.log(reply.toString());}
	 */
	save : function(values, callback){
		client.hmset(values, callback);
	},

	/** 
	 * get key-value pairs
	 * 
	 * key : 	key
	 * call back:	function like:
	 * function (err, replies) {
	 * 	replies.forEach(function (reply, i) {
	 * 		console.log("    " + i + ": " + reply);
	 * 	});
	 * }
	 */
	subkeys : function(key, callback){
		client.hkeys(key, callback);
	},
	
	/** 
	 * delete a sub key key-value pairs
	 * 
	 * values : 	a list like ['key', 'subkey1']
	 * call back:	function like:
	 * function (err, reply) {console.log(reply.toString());}
	 */
	removesubkey: function(values, callback){
		client.hdel(values, callback);
	},
	
	/** 
	 * check if a sub key key-value pair is set
	 * 
	 * values : 	a list like ['key', 'subkey1']
	 * call back:	function like:
	 * function (err, reply) {console.log(reply.toString());}
	 */
	exists: function(values, callback){
		client.hexists(values, callback);
	}
}

//client.hset("hash key", "hashtest 1", "some value", redis.print);
//client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//client.hmset(["dustin", "hashtest 3", "xs value"], redis.print);
//client.hdel(['goku','race'], redis.print);
//client.hexists(['goku','race'], redis.print);
//client.hexists(["dustin", "hashtest 3"], redis.print);
//client.quit();