var db = require('../lib/db.js')
	, mongojs = require('mongojs')
	, security = require('../lib/security')
	, redisService = require('../lib/redis');

module.exports = function(app) {
	
	/**
	 * sample request: e.g. page size = 500 
	 * Sort direction can be 1 (ascending) or -1 (descending)
	 * 
	 * first page: /api/postcode?s=500&f=postcode&d=-1
	 * page 5: /api/postcode?s=500&f=postcode&d=-1$c=N2E4G6
	 */
	app.get('/api/postcode', function(req, res) {
		var size = 500, field = 'postcode', direction = 1, lastValue;
		
		if('s' in req.query){
			size = parseInt(req.query.s);
		}
		
		if('f' in req.query){
			field = req.query.f;
		}
		
		if('d' in req.query){
			direction = parseInt(req.query.d);
		}
		
		var sort = [[field, direction]];
		
		if('c' in req.query) {
			// not first page
			lastValue = req.query.c;
			
			var query = {};
			if(direction == 1){
				query[field] = { '$gt' : lastValue };
			} else {
				query[field] = { '$lt' : lastValue };
			}

			db.find('postcode',query ,{}, sort, size, function(err, results){
				if (!err) {
					return res.send(results);
				} else {
					return console.log(err);
				}
			});
			
		} else {
			//first page
			
			db.find('postcode',{} ,{}, sort, size, function(err, results){
				if (!err) {
					//console.log('ok for 1st page');
					return res.send(results);
				} else {
					//console.log('not ok for 1st page');
					return console.log(err);
				}
			});
		}
	});

//	app.get('/api/user/:id', function(req, res){
//		var id = req.params.id;
//		db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
//			if (!err) {
//				//console.log('look up user.email = %j',user.email);
//				return res.send(user);
//			} else {
//				return console.log(err);
//			}
//		});
//	});
//	
//	app.post('/api/user', function(req, res){
//		db.save('user', req.body)
//		res.send(req.body);
//	});
//	
//	app.put('/api/user', function(req, res){
//		var id = req.body._id;
//		console.log('editing user id =' + id);
//		delete req.body['_id']
//		db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
//			function(){
//				res.send(req.body);
//		});
//	});
//	
//	app.delete('/api/user/:id', function(req, res){
//		var id = req.params.id;
//		
//		db.remove('user', {'_id': mongojs.ObjectId(id)}, function(err, user){
//			if (!err) {
//				res.json(true);
//			} else {
//				console.log(err);
//				res.json(false);
//			}
//		});
//	});
};