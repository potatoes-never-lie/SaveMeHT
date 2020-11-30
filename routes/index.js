var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var mysql_dbc = require('../commons/db_con.js')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

var secret_config=require('../commons/secret.js');
var NaverStrategy = require('passport-naver').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user)
  });
  
  /*인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.*/
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  

function loginByThirdparty(info, done) {
    console.log('process : ' + info.auth_type);
    var stmt_duplicated = 'select * from `users` where `id` = ?';
  
    connection.query(stmt_duplicated, info.auth_id, function (err, result) {
      if (err) {
        return done(err);
      } else {
        if (result.length === 0) {
          //신규 유저 가입 시켜야됨
          var stmt_thridparty_signup = 'insert into `users` set `id`= ?, `name`= ?, `email`=?, `pw`="", `phone_number`="", `age`=0, `height`=0, `weight`=0, `public`=1';
          //console.log("id:"+info.auth_id);
          //console.log("name:"+info.auth_name);
          connection.query(stmt_thridparty_signup, [info.auth_id, info.auth_name, info.auth_email], function (err, result) {
            if(err){
              return done(err);
            }else{
              done(null, {
                'id': info.auth_id,
                'name': info.auth_name
              });
            }
          });
        } else {
          //기존유저 로그인 처리
          console.log('Old User');
          done(null, {
            'id': result[0].id,
            'name': result[0].name
          });
        }
      }
    });
  }

passport.use(new NaverStrategy({
    clientID: secret_config.federation.naver.client_id,
    clientSecret: secret_config.federation.naver.secret_id,
    callbackURL: secret_config.federation.naver.callback_url
  },
  function (accessToken, refreshToken, profile, done) {
    var _profile = profile._json;

    console.log(_profile.name); //for debugging

    loginByThirdparty({
      'auth_type': 'naver',
      'auth_id': _profile.id, 
      'auth_name': _profile.nickname,
      'auth_email': _profile.email
    }, done);
  }
));

passport.use(new FacebookStrategy({
    clientID: secret_config.federation.facebook.client_id,
    clientSecret: secret_config.federation.facebook.secret_id,
    callbackURL: secret_config.federation.facebook.callback_url,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone',
      'updated_time', 'verified', 'displayName']
  }, function (accessToken, refreshToken, profile, done) {
    var _profile = profile._json;
    //console.log(_profile);
    loginByThirdparty({
      'auth_type': 'facebook',
      'auth_id': _profile.id,
      'auth_name': _profile.name,
      'auth_email': _profile.email
    }, done);
  }
));


// naver 로그인
router.get('/auth/login/naver',
  passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/auth/login/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/login',  //홈 화면으로 수정필요
    failureRedirect: '/login'
  })
);

// facebook 로그인
router.get('/auth/login/facebook',
  passport.authenticate('facebook')
);
// facebook 로그인 연동 콜백
router.get('/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/login',      //홈 화면으로 수정필요
    failureRedirect: '/login'
  })
);


router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증실패시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    res.redirect('/');
  });



  router.get('/login', function (req, res) {

    if (req.user !== undefined) {
      res.redirect('/')
    } else {
      res.render('view', {
        title: 'login'
      })
    }
  
  });
  
  
router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증실패시 401 리턴, {} -> 인증 스트레티지
    function (req, res) {
    res.redirect('/');
  });


module.exports = router;