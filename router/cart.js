const router=require("express").Router()
const path=require("path")//파일 경로를 조합 해주는 패케지 이다.  이것이 있어야 한다.
const redis=require("redis").createClient()
const redisKey="cart"

router.post("/increase",async(req,res)=>{
    const itemName=req.body.itemName
    const result={
        "success":false
    }
    try{
        await redis.connect()
        const value=await redis.hGet(redisKey,itemName)
        if(value == null){
            await redis.hSet(redisKey,itemName,1)
            await redis.expire(redisKey,2)//값을 조작하거나 추가 하거나 할때 expire시간을 해줘야 한다. 
        }else{
            await redis.hSet(redisKey,itemName,parseInt(value)+1)
            await redis.expire(redisKey,2)
        }

        await redis.disconnect()
        result.success=true
        res.send(result)

    }catch(err){
        console.log(err)
        res.send(result)
    }

})



router.post("/decrease",async(req,res)=>{
    const itemName=req.body.itemName
    const result={
        "success":false
    }
    try{
        await redis.connect()
        const value=await redis.hGet(redisKey,itemName)
        if(value == 1){
            await redis.hDel(redisKey,itemName)//삭제가 될 수 있는 것 생각 
        }else if(parseInt(value)>1){
            await redis.hSet(redisKey,itemName,parseInt(value)-1)
            await redis.expire(redisKey,2)//값을 조작하거나 추가 하거나 할때 expire시간을 해줘야 한다. 
        }
        await redis.disconnect()
        result.success=true
        res.send(result)
        
    }catch(err){
        console.log(err)
        res.send(result)
    }
})


router.get("/",async(req,res)=>{
    const result={
        "success":false,
        "value":null
    }
    try{
        await redis.connect()
        const value=await redis.hGetAll(redisKey)// redisKey 모든 값을 가져 오게 한다. 
        await redis.expire(redisKey,2)//값을 조작하거나 추가 하거나 할때 expire시간을 해줘야 한다. 
        
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
    
})



module.exports=router
