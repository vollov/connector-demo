var mongojs = require('mongojs');
var db = mongojs('localhost/rental');

module.exports = {
    find : function(collection, query, projection, sort, limit, callback) {
//    	projection = (typeof projection === "undefined") ? {} : projection;
    	db.collection(collection).find(query, projection).sort(sort).limit(limit).toArray(callback);
        //console.log('find db=> ' + db + ' , coll=> ' + collection);
    },
    // callback:function(err, doc) {...};
    findOne : function(collection, query, projection, callback) {
    	var cursor = db.collection(collection).findOne(query, projection, callback);
    },
    //db.mycollection.save({created:'just now'})
    save : function(collection, body, callback) {
    	//console.log('save into => ' + collection + ' with: ' +body);
    	db.collection(collection).save(body, callback);
        //console.log('save db=> ' + db + ' , coll=> ' + collection);
    },
    //db.mycollection.update({name:'mathias'}, {$inc:{level:1}}, {multi:true}, function() {});
    update : function(collection, query, body, options, callback) {
    	db.collection(collection).update(query, body, options, callback);
    },
    
    /**
     * collection.findAndModify(criteria, sort, update[, options, callback])
     * options:
     * remove - if set to true (default is false), removes the record from the collection. Callback function still gets the object but it doesn�t exist in the collection any more.
     * new - if set to true, callback function returns the modified record. Default is false (original record is returned)
     * upsert - if set to true and no record matched to the query, replacement object is inserted as a new record
     */
    findAndModify : function(collection, query, update, callback) {
    	db.collection(collection).findAndModify({
    		query: query,
    		update: update,
    		new: true,
    	}, callback);
//    	db.collection(collection).findAndModify(query, {}, update, options, callback);
    },
    
    remove : function(collection, query, callback) {
    	db.collection(collection).remove(query, callback);
    }
}
