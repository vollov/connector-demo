http://briantford.com/blog/angular-express.html
https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

step-01 - api server with test framework
step-02 - basic role auth module 

[1] To setup test environment in a fresh workspace:
$mongo localhost:27017/rental schema.js
$redis-cli
>hmset f2cb3e8d653f46008272113c6c72422843901ef3 username wendy@abc.com role 2

f2cb3e8d653f46008272113c6c72422843901ef3

session related codes
//		if (req.session.isValid) {
//			console.log("There is an existing session.");
//		} else {
//			req.session.isValid = true;
//			console.log("New session.");
//			console.log('Old session ID: ' + req.header('Cookie'));
//			console.log('New session ID: ' + req.session.id);
//		}
//		
//		if(req.session.email) {
//			console.log('Last user looked up was: %j ',req.session.email);
//		};

//				req.session.email = user.email;

