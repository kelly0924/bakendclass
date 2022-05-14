const express=require("express")

const app=express()//app은 experss를 객체로 만든것이 저장 된다. 실제로 사용할 것 
const port =8000
app.use(express.json()) // 해줘야 json을 읽고 보낼 수 있다. 

const fs=require("fs")//file import 할 때 사용한다. 
const https=require("https")//기본 지원이 아니여서 패키지로 불러 와야 한다.
const sslProt=3443//프로토콜 마다 port가 정해 져 있다. https 443이다. 근데 이렇게 하면 관리자 권한으로 해야 하므로 우회 하겠다.
//port 1204밑으로 하면 시스템 포트들이며 관리자 권한으로 접근 해야 한다. 

// const option={
//     "key":fs.readFileSync(__dirname + "/ssl/key.pem"),
//     "cert":fs.readFileSync(__dirname + "/ssl/cert.pem"),
//     "passphrase":"1234"//CA대신 한다. 
// }

// app.get("*",(req, res,next)=>{

//     const protocol=req.protocol
//     if(protocol =="https"){
//         next()//문제 없으면 밑으로 내겨 간다.
//     }else{
//         const destination="https://" + req.hostname + ":3443" + req.url//새로운 주소 만들어 주기
//         res.redirect(destination)//http로 바꿔 준다.  https와 :3443로 바꿔 준다. 
//         //기본이 http도 https 로 접속이 가능해 진다. 
//     }
// })

const pagesApi = require("./router/pages")//import 해준다.  외부로 분리 시킨 애를 import 한다.
app.use("/",pagesApi)//등록 (api 이름,내가 사용할 것)
//api 이름은 깊이를 가질 수 잇다.

const accountApi=require("./router/account")//import 하고 
app.use("/account",accountApi)//Import 한 api 를 등록 해줘야 한다. 

const tokenApi=require("./router/token")
app.use("/token",tokenApi)


app.listen(port,()=>{
    console.log(port + "번 포트에서 http통신을 시작 할 것이다.")
})//http 통신을 시작 하겠다.(app.listen) port에서 듣겠다.  뒤에서 그래서 내가 http 통신을 시작 할 때 수행할 함수를 쓰겠다. 

//https 통신 열어 주기 
// https.createServer(option,app).listen(sslProt,()=>{
//     console.log(sslProt + "번 포트에서 http통신을 시작 할 것이다.")
// })

