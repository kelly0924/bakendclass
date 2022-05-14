const router=require("express").Router()
const path=require("path")// 파일 경로를 조합 해주는 패케지 이다.  이것이 있어야 
const jwt=require("jsonwebtoken")

const secretKey="DFJLAJDLAJDFLKDFLDKJFLAFJDK"

router.post("/login",(req,res)=>{
    const idValue=req.body.id
    const pwValue=req.body.pw
    console.log(idValue,pwValue)
    
    const result={
        "success":false,
        "message":"",
        "token":null
    }

    //등록
    try{
        if(idValue == "stageus" && pwValue== "1234"){
            //session & cookie를 쓴다고 가정하면 세션을 만드는 코드와, 쿠키를 만드는 코드가 저정

            //token 생성 내용이 들어 간다. 
            
            const jswToken=jwt.sign(
                {
                    //token의 저장 하고 싶은 데이터, 기존에 세션에 넣던 데이터 
                    "id":idValue,
                    "name":"스테이지 어스",
                    "email": "conldfjkdf"
                    //토큰이 유효 하다는 것만으로 신로성 100% 이므로 비밀번호는 써주지 않아도 된다.
                },
                secretKey,
                {
                    //토큰의 설정 하고 싶은 값이 들어 간다. 
                    "issuer": "cono",// 발급자 메모용
                    "expiresIn":"1m" //토큰 완료 시간
                }
            )
            result.success=true
            result.token=jswToken
            res.send(result)
                
        }
        else{
            throw "아이디 비밀 번호가 틀립니다."
        }
    }catch(e){
        result.message=e
        res.send(result)
    }
})

//토큰 검증

router.post("/verify",(req,res)=>{
    const token=req.headers.auth
    const result={
        "success":false,
        "message":null
    }
    try{
        jwt.verify(token,secretKey)
        result.success=true
        res.send(result)
    }catch(e){
        result.message="토큰이 잘못 됬음"
        res.send(result)
    }
})

module.exports=router