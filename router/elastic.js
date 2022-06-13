const router=require("express").Router()
const elastic=require("elasticsearch")


router.post("/",async(req,res)=>{

    const value=req.body.value

    const result={
        "success":false
    }
    //elasticsearch init 부분 이부분에서 node 어떻게 사용 할지 설정 할 수 있음 
    const esConnect=new elastic.Client({
        node:"http://localhost:9200/" // 별다른 설정이 없이 이렇게 적으면 싱클 로드에 해준다. 
    })

    // try{
    //     //es가 제대로 연결이 되어 있는지 체크
    //     esConnect.ping({requestTimeout:1000},(err)=>{//ping 연결 상태 체크 앞에는 시간 1초동안 여결 기다리겠다., 함수
    //         if(err) throw err
    //     })

    //     esConnect.index({
    //         index: "member",//index이기 때문에 group에 이름 index body는 명령어 
    //         body:{
    //             name: value//type: doucmen 의 json 형태
    //         }
    //     },(err)=>{
    //         if(err) throw err
    //     })

    //     result.success=true
    //     res.send(result)

    // }catch(err){
    //     console.log(err)
    //     res.send(result)
    // }

    try {

        await esConnect.ping({requestTimeout: 1000})   // es가 제대로 연결이 되어 있는지 체크
        await esConnect.index({   // es에 값 삽입
            index: "member",   // index이기 때문에 group 이름이라 보면 됨
            body: {
                name: value   // type: document 의 json 형태
            }
        })

        result.success = true
        res.send(result)

    } catch(err) {
        console.log(err)
        res.send(result)
    }



})

router.delete("/", async(req,res)=>{
    const value=req.body.value//get은 query로 한다.

    const result={
        "success":false
    }
    //elasticsearch init 부분 이부분에서 node 어떻게 사용 할지 설정 할 수 있음 
    const esConnect=new elastic.Client({
        node:"http://localhost:9200/" // 별다른 설정이 없이 이렇게 적으면 싱클 로드에 해준다. 
    })

    try {

        await esConnect.ping({requestTimeout: 1000})   // es가 제대로 연결이 되어 있는지 체크
        await esConnect.deleteByQuery({
            index: "member",
            body: {
                query: {
                    match: {
                        name: value
                    }
                }
            }
        })
        result.success = true
        res.send(result)

    } catch(err) {
        console.log(err)
        res.send(result)
    }
    
})


router.get("/",async(req,res)=>{

    const value=req.query.value//get은 query로 한다.
    const result={
        "success":false,
        "date":null
    }
    //elasticsearch init 부분 이부분에서 node 어떻게 사용 할지 설정 할 수 있음 
    const esConnect=new elastic.Client({
        node:"http://localhost:9200/" // 별다른 설정이 없이 이렇게 적으면 싱클 로드에 해준다. 
    })

    // try{
    //     //es가 제대로 연결이 되어 있는지 체크
    //     esConnect.ping({requestTimeout:1000},(err)=>{//ping 연결 상태 체크 앞에는 시간 1초동안 여결 기다리겠다., 함수
    //         if(err) throw err
    //     })

    //     esConnect.search({
    //         index:"member",
    //         body:{
    //             query:{ //query안에 있는 조건을 검색 하겠다. 
    //                 match:{//일치 하는 것
    //                     name:value //우리가 받아온 value와 같은 것을 찾겠다. type: document
    //                     //name 이 value 인 것을 찾아 달라. 
    //                 }
    //             }
    //         }
    //     },(err,recvresult)=>{
    //         if(err) throw err
    //         else{
    //             result.data=recvresult
    //         }
    //     })

    //     result.success=true
    //     res.send(result)

    // }catch(err){
    //     console.log(err)
    //     res.send(result)
    // }

    try {

        await esConnect.ping({requestTimeout: 1000})   // es가 제대로 연결이 되어 있는지 체크
        const recvResult = await esConnect.search({
            index: "member",
            body: {
                query: {
                    match: {
                        name: value
                    }
                }
            }
        })
        
        result.data = recvResult
        result.success = true
        res.send(result)

    } catch(err) {
        console.log(err)
        res.send(result)
    }

})

module.exports=router