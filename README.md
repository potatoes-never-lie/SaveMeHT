

## 사전 준비 사항:

```
npm install passport-facebook --save
npm install passport-naver --save
npm install ejs --save
```

## 주요 코드 내용:
  - routes/index.js : 소셜 로그인 처리 코드
  - commons/secret.js: 소셜 로그인 client id, secret id
  - views/view.ejs: 테스트 화면 구현을 위한 코드
  
## 테스트 방법:

```
1. nodemon app.js 
2. http://localhost:3000/login 으로 접속
````

## 주의 사항:
  1. Naver: 앱 배포 전에는 개발자가 등록한 네이버 아이디만 로그인이 가능합니다. 테스트 위해서 네이버 아이디 등록하시려면 
  카카오톡 메시지로 네이버 아이디 보내주시면 등록해드리겠습니다.
  
  2.Facebook: 앱 배포 전에는 테스트 계정으로만 로그인이 가능합니다. 
  테스트 계정 목록은 다음과 같습니다.
  비밀번호는 tmt2020 으로 모두 동일합니다.
  
|이름|이메일|
|------|------|
|David Alehhfbgfefja Sharpestein|nyrjzhumol_1606892243@tfbnw.net|
|Mike Alehegihafeda Okelolaberg|rnnwpxvlcd_1606892241@tfbnw.net|
|Ava Alehegifffgaa Putnamson|jifycaqatr_1606892245@tfbnw.net|
|David Alehgedeeeici Dingleman|suqixenzka_1606741157@tfbnw.net|
|	Rick Alehebgafeehc Bushaksen|brolxkxorn_1606740307@tfbnw.net|


