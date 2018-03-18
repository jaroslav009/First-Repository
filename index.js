var express 		= require('express');
var cookieParser 	= require('cookie-parser');
var expressSession  = require('express-session');
var ejs 			= require('ejs');
var bodyParser 		= require('body-parser');
var mongoose	 	= require("mongoose");
var passport		= require('passport');
var LocalStrategy	= require('passport-local');

var User 			= require('./models/user.js');

var app = express();

app.use(express.static(__dirname));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'secret'}));

app.use(passport.initialize());
app.use(passport.session());


const url = 'mongodb://slavic:ddsdfg23@ds155218.mlab.com:55218/tes';
mongoose.connect(url);
var validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, {id: id, name: id});
});

app.get('/', function(req, res) {
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user 
	});
});

app.get('/login', function(req,res){
	res.render('login');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}), function(req ,res) {
	console.log('hello world');
	res.redirect('/');
});

app.get('/register', function(req, res) {
	res.render('register');
});

app.listen(3000, function() {
	console.log('port 3000');
});