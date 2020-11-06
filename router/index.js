var express=require('express')
var app=express()
var router=express.Router()
var path=require('path')    //상대경로 이동 위해서.
var main=require('./main/main')	//모듈 불러오고
var email=require('./email/email')
var join=require('./join/index')
var login=require('./login/index')

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, "../public/main.html"))
});

router.use('/main', main)		//main으로 들어올 경우에는 여기로 보내
router.use('/email', email)
router.use('/join', join)
router.use('/login',login)

module.exports=router;