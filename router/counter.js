const router=require("express").Router()
const path=require("path")//파일 경로를 조합 해주는 패케지 이다.  이것이 있어야 한다.
const redis=require("redis").createClient()
const redisKey="counter_number"

router.post("/",async(req,res)=>{

    const result = {
        "success": false
    }
     
    try{
       await redis.connect()//비동기 함수의 await 붙히고 

       const value= await redis.get(redisKey)// 고유한 값으로 해줘야 한다. 회원아이디, 시리얼 번호를 붙혀가지고 한다. 
       // get(key) 가 들어 간다.  string 을 가져 온다. 

       if(value == null){
           await redis.set(redisKey,1)// 새로운 redis를 만들어 준다. set은 없으면 만들어 주고 있으면 업데이트 해준다. 
       }else{
           await redis.set(redisKey,parseInt(value)+1)
       }

       await redis.disconnect()
       console.log(value)

       result.success=true

       res.send(result)
    }catch(err){
        console.log(err)
        res.send(result)
    }
   
})

router.get("/", async(req,res)=>{

    const result={
        "success":false,
        "value":0
    }
    try{
        await redis.connect()//비동기 함수의 await 붙히고 
        const value= await redis.get(redisKey)
        await redis.disconnect()

        result.success=true
        result.value=value
        res.send(result)

    }catch(err){
        console.log(err)
        res.send(result)
    }
    
})

router.delete("/",async(req,res)=>{
    const result={
        "success":false
    }
    try{
        await redis.connect()//비동기 함수의 await 붙히고 
        await redis.del(redisKey)// 아예 메모리에서 삭제 된다. 이 컬렉션을 아예 삭제 null이 된다. 다 삭제 해야 한다. 
        await redis.disconnect()
        
        result.success=true
        res.send(result)

    }catch(err){
        console.log(err)
        res.send(result)
    }
})


module.exports=router