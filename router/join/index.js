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
    res.render('join.ejs', {'message': msg});
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
passport.use('local-join', new LocalStrategy({      //localjoin 이라는 strategy 이용할거야 정의.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done){
        var query=connection.query('select * from user where email=?', [email], function(err, rows){
            if (err) return done(err);

            if (rows.length){
                console.log('existed user')
                return done(null,false, {message: 'your email is already used'}) //fail 하면 failureRedirect로 전달 
            } else{
                var sql={email: email, pw: password};
                var query=connection.query('insert into user set ?', sql, function(err, rows){
                    return done(null, {'email': email, 'id': rows.insertId});       //성공한 이후엔 serialize 처리..
                })
            }
        })
    })
);

router.post('/', passport.authenticate('local-join', { 
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true }
))

/* router.post('/', function(req, res){
    var body=req.body;
    var email=body.email;
    var name=body.name;
    var passwd=body.password;       //pw는 해쉬값으로 처리해주어야. 
    
    var sql={email: email, name: name, pw: passwd}    //escaping-query-value 참조 

    var query=connection.query('insert into user set?', sql, function(err, rows){
        if (err){throw err;}
        else 
            res.render('welcome.ejs', {'name': name, 'id': rows.insertId})  //client에게 ejs 파일 보내줌 
    })
}) */

module.exports=router;