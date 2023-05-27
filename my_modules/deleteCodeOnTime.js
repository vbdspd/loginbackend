const deleteCode=require("./deleteCode")

function deleteCodeOnTime(phone, time) {  //在设定时间内删除验证码让验证码失效
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
           deleteCode(phone).then(()=>{
              resolve("删除成功")
           })
        },time)
    })
}

// deleteCodeOnTime(18758156239,1000).then((val)=>{
//     console.log(val)
// })

module.exports=deleteCodeOnTime
