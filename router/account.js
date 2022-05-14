const router=require("express").Router()
const path=require("path")// 파일 경로를 조합 해주는 패케지 이다.  이것이 있어야 
const {Client}=require("pg")//pg 는 Client 로 이름 고정 여러개 하기 위해 

router.post("/login",(req,res)=>{
    //프론트엔드로 부터 받아온 값
    const idValue= req.body.id
    const pwValue= req.body.pw
    //프론트 엔드로 보내 줄값 json으로 받았으니까 json으로 보내 줄것이다. 

    const result ={
        "sucess":false
    }
    //로그인 체크 알고리즘

    const pgInit=new Client({
        user:"ubuntu",
        password:"1234",
        host:"localhost",
        database:"first",
        prot:5432
    })
    pgInit.connect((err) => {
        if(err) {
            console.log(err)
        }
    })
    const sql="SELECT * FROM backend.account WHERE id=$1 and pw=$2"
    const values=[idValue,pwValue]
    console.log(values)

    pgInit.query(sql,values,(err,data) =>{
        if(!err){
            const row=data.rows;
            if(row.length == 0){
            }else {
                result.sucess=true
            }
        }
        else {
            console.log(err)
        }
        res.send(result)// 값만 보내 줄것이다. 값을 보내  때는 send로 보내 준다.
    })
    //프론드에게 값을 반환
})
module.exports=router//

// module.exports=router,{router}//무조건 router로 해달라 여러개 해달라 