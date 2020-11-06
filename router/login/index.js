var express=require('express')
var app=express()
var router=express.Router()
var path=require('path')    //상대경로 이동 위해서.
var mysql=require('mysql')
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy;

//DB Setting!
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'cyrhee',
	password: 'codus9601',
	database: 'testdb'
  })
  
connection.connect()

router.get('/', function(req, res){
    var msg;
    var errMsg=req.flash('error')
    if(errMsg) msg=errMsg
    res.render('login.ejs', {'message': msg});
})

//passport.serialize
passport.serializeUser(function(user, done) {   //done 에서 전달된 값 사용.
    console.log('passport session save: ', user.id)
    done(null, user.id);
  });

passport.deserializeUser(function(id, done){   //session에서 id값 뽑아서 처리
    console.log('passport session get id:  ', id);
    done(null,id);
})

//실제 인증,처리는 localstrategy 메소드 안에서 처리가 됨.
passport.use('local-login', new LocalStrategy({      //localjoin 이라는 strategy 이용할거야 정의.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done){
        var query=connection.query('select * from user where email=? and pw=?', [email, password], function(err, rows){
            if (err) return done(err);
            if (rows.length){
                return done(null,{'email': email, 'id':rows[0].id}) 
            } else{
                return done(null, false, {'message': 'your login info is not found >.<'})
            }
        })
    })
);

/* router.post('/', passport.authenticate('local-join', { 
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true }
)) */

router.post('/', function(req,res,next){
    passport.authenticate('local-login', function(err,user,info){
        if(err) res.status(500).json(err);
        if (!user) {return res.status(401).json(info.message);}

        req.logIn(user, function(err){
            if (err) {return next(err);}
            return res.json(user);
        });
    })(req,res,next);
})

module.exports=router;