const router=require("express").Router()
const path=require("path")// 파일 경로를 조합 해주는 패케지 이다.  이것이 있어야 
const jwt=require("jsonwebtoken")

const secretKey="DFJLAJDLAJDFLKDFLDKJFLAFJDK"//아무거나 해도 된다. 의미가 없는 랜더 문자 생성

router.post("/login",(req,res)=>{//로그인 아이피가 호출 되면 토큰 생서 해서  FE에게 보내 준다. 
    const idValue=req.body.id
    const pwValue=req.body.pw
    console.log(idValue,pwValue)
    
    const result={
        "success":false,
        "message":"",//FE에게 알려 주는 메시지 에로가 날 시 이 메시지로 오류를 발견 할 수 있다.
        "token":null
    }

    //토큰을 등록 한다.
    try{
        //디비 가 있다고 가정, 디비 조회 한 후 
        if(idValue == "stageus" && pwValue== "1234"){
            //session & cookie를 쓴다고 가정하면 세션을 만드는 코드와, 쿠키를 만드는 코드가 저정
            //token 생성 내용이 들어 간다. 
            
            //토큰 생성 
            const jswToken=jwt.sign(
                {
                    //token의 저장 하고 싶은 데이터, 기존에 세션에 넣던 데이터  즉 여기에는 디비로 부터 조회 받은 값들을 넣어 줄 수가 있다. 
                    "id":idValue,
                    "name":"스테이지 어스",
                    "email": "conldfjkdf"
                    //토큰이 유효 하다는 것만으로 신로성 100% 이므로 비밀번호는 써주지 않아도 된다.
                },
                secretKey,//내가 정한 비밀 키 
                {
                    //토큰의 설정 하고 싶은 값이 들어 간다. 
                    "issuer": "cono",// 발급자 메모용
                    "expiresIn":"1m" //토큰 완료 시간
                }
            )
            result.success=true
            result.token=jswToken

            res.send(result)//FE에게 토큰을 보내 준다. 
                
        }
        else{
            throw "아이디 비밀 번호가 틀립니다."
        }
    }catch(e){
        result.message=e//메시지로 오류 발견 가능
        res.send(result)
    }
})

//서버에서 토큰의 유효성을 검증 해주는 API 이다. 

router.post("/verify",(req,res)=>{
    const token=req.headers.auth//프론트엔드에서 보내준 token
    const result={
        "success":false,
        "message":null
    }
    try{
        jwt.verify(token,secretKey)//서버가 가지고 있는 secretKey로 검증한다.
        result.success=true
        res.send(result)
    }catch(e){
        result.message="토큰이 잘못 됬음"
        res.send(result)
    }
})

module.exports=router