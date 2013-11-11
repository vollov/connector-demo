var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/rental';

module.exports = {
	/**
	 * sort as array: sort([['a', 1]])
	 */
	find : function(collection_name, query, sort_array, size, callback){
		console.log('call db.connect()');
		client.connect(url, function(err, db){
			console.log('call db.connect() callback');
			if(err){
				return console.dir(err);
			}
			
			var collection = db.collection(collection_name);
			collection.find(query).sort(sort_array).
				limit(size).toArray(callback);
			console.log('call db.close()');
			db.close();
		});
	}
}