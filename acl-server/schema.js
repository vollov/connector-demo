db.user.drop();
db.role.drop();
db.route.drop();
db.message.drop();

users = [{'password': '30274c47903bd1bac7633bbf09743149ebab805f', 'is_active': false, 'email': 'mary@demo.org', 'role':1}, 
         {'password': '8843d7f92416211de9ebb963ff4ce28125932878', 'is_active': true, 'email': 'wendy@abc.com', 'role':2}, 
         {'password': '30274c47903bd1bac7633bbf09743149ebab805f', 'is_active': false, 'email': 'dustin@demo.org', 'role':2}, 
         {'password': '30274c47903bd1bac7633bbf09743149ebab805f', 'is_active': true, 'email': 'jenny@demo.org','role':2}, 
         {'password': '5bf1fd927dfb8679496a2e6cf00cbe50c1c87145', 'is_active': true, 'email': 'fred@gmail.ca','role':2}];
roles = [{'name':'admin', 'id':1}, {'name':'member', 'id':2}, {'name':'guest', 'id':3}];
routes = [{'path':'/home', 'roles': [3]}, {'path':'/about', 'roles': [3]}, {'path':'/users', 'roles': [1]}];
messages = [{name:'alan', phone:'519-776-3344', email:'alan@gmail.com', city:'ajax', content:'I need a quote.', status: 'read'},
            {name:'luke', phone:'519-616-6324', email:'luke@gmail.com', city:'waterloo', content:'need 2nd quote.', status: 'unread'}];

db.user.insert(users);
db.role.insert(roles);
db.route.insert(routes);
db.message.insert(messages);

db.user.ensureIndex({email: 1}, {unique: true});
db.role.ensureIndex({name: 1}, {unique: true});
db.route.ensureIndex({path: 1}, {unique: true});