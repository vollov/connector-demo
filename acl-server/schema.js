db.user.drop();
db.role.drop();
db.route.drop();

users = [{'password': 'passwd', 'is_active': false, 'email': 'mary@demo.org', 'role':1}, 
         {'password': 'foobar', 'is_active': true, 'email': 'wendy@abc.com', 'role':2}, 
         {'password': 'passwd', 'is_active': false, 'email': 'dustin@demo.org', 'role':2}, 
         {'password': 'passwd', 'is_active': true, 'email': 'jenny@demo.org','role':2}, 
         {'password': 'blah', 'is_active': true, 'email': 'fred@gmail.ca','role':2}];
roles = [{'name':'admin', 'id':1}, {'name':'member', 'id':2}, {'name':'guest', 'id':3}];
routes = [{'path':'/home', 'roles': [3]}, {'path':'/about', 'roles': [3]}, {'path':'/users', 'roles': [1]}];

db.user.insert(users);
db.role.insert(roles);
db.route.insert(routes);

db.user.ensureIndex({email: 1}, {unique: true});
db.role.ensureIndex({email: 1}, {unique: true});
db.route.ensureIndex({path: 1}, {unique: true});