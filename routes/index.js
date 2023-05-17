var express = require('express');
var router = express.Router();
var register = require('../models/register')
var session = require('express-session')
var cookieParser = require('cookie-parser')

/* GET home page. */
router.use(cookieParser());
router.use(session({
  secret: 'ravi',
  saveUninitialized: true,
  resave: true
}));

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  if(req.session.user == undefined)
  {
    res.render('login')
  }
  else
  {
    res.render('dashboard', { title: 'Express' });
  }
});




router.post('/', async function (req, res, next) {
  try {
    data = await register.create(req.body)
    res.redirect('login')
  }
  catch (error) {
    console.log(error);
    res.redirect('/')
  }
});


router.post('/login', async function (req, res, next) {

  console.log(req.session.user);

  
   var email = req.body.email
    password = req.body.password
    data = await register.find({ email: email })
    var [data] = data
    
    if (email == data || password == data.password) {
      req.session.user = email
      req.session.save()
      res.redirect('dashboard');
      // return res.send("Your are logged in");
    }
    else {
      res.redirect('login')
    }

});

router.post('/logout', async function (req, res, next) {
  try {
    req.session.destroy()
    res.redirect('login')
  }
  catch (error) {
    res.redirect('dashboard')
  }
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.user == undefined) {
    res.redirect('login')
  }
  else {
    console.log(req.session.user);
    res.render('dashboard', { title: 'Express' });
    // res.send(req.session.user)
  }
});




module.exports = router;
