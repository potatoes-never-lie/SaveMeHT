var express=require('express')
var app=express()
var bodyParser=require('body-parser')
var cors = require('cors')
var router=require('./router/index')
var passport=require('passport')
var localStrategy=require('passport-local').Strategy;
var session=require('express-session')
var flash=require('connect-flash')

app.listen(3000, function(){
	console.log("start! express server on port 3000");
});

app.use(express.static('public'))
app.use(bodyParser.json())	//client에서 오는 요청이 json 일 때
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.set('view engine', 'ejs')

app.use(session({
	secret: 'keyboard cat',
	resave: false,		//세션에 대한 세밀한 설정할때 이것들 건들면 됨.
	saveUninitialized: true
  }))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())	//flash는 메시지 쉽게 전달해줌. 

app.use(router) //router에 대한 처리는 여기서 






