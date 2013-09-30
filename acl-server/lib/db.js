var mongojs = require('mongojs');
var db = mongojs('localhost/rental');

module.exports = {
    find : function(collection, query, projection, limit, callback) {
//    	projection = (typeof projection === "undefined") ? {} : projection;
    	db.collection(collection).find(query, projection).limit(limit).toArray(callback);
        //console.log('find db=> ' + db + ' , coll=> ' + collection);
    },
    // callback:function(err, doc) {...};
    findOne : function(collection, query, projection, callback) {
    	var cursor = db.collection(collection).findOne(query, projection, callback);
    },
    //db.mycollection.save({created:'just now'})
    save : function(collection, body) {
    	//console.log('save into => ' + collection + ' with: ' +body);
    	db.collection(collection).save(body);
        //console.log('save db=> ' + db + ' , coll=> ' + collection);
    },
    //db.mycollection.update({name:'mathias'}, {$inc:{level:1}}, {multi:true}, function() {});
    update : function(collection, query, body, options, callback) {
    	db.collection(collection).update(query, body, options, callback);
    },
    findAndModify : function(collection, query, body, callback) {
    	db.collection(collection).findAndModify({
    		query: query,
    		update: body,
    		new: true,
    	}, callback);
    },
    remove : function(collection, query, callback) {
    	db.collection(collection).remove(query, callback);
    }
}
