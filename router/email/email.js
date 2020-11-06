var express=require('express')
var app=express()
var router=express.Router()
var path=require('path')    //상대경로 이동 위해서.
var mysql=require('mysql')

//DB Setting!
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'cyrhee',
	password: 'codus9601',
	database: 'testdb'
  })
  
connection.connect()



router.post('/form', function(req,res){
	console.log(req.body.email)
	//res.send("<h1>welcome! "+req.body.email+"</h1>")
	res.render('email.ejs', {'email': req.body.email}) 
	//data 결합된 상태로 Html 파일 줌. //template engine ejs
});

router.post('/ajax', function(req,res){
	//console.log(req.body.email)
	//check validation about input value => select ..(DB 조회해서 확인)
	//var responseData={'result': 'ok', 'email': req.body.email}
	var email=req.body.email;
	var responseData={};
	var query=connection.query('select name from user where email="'+email+'"', function(err,rows){
		if (err) throw err;
		if (rows[0]){
			responseData.result="ok";
			responseData.name=rows[0].name;
		} else{
			responseData.result="none";
			responseData.name="";
		}
		res.json(responseData)
	})
	//res.json(responseData)	//서버에서 보내주기 
	//console.log('hihi')
});

module.exports=router;