const myReadFile=require('./myReadFile')

var path="./loginInfo.json"

function haveSentCode(phone){ //判断验证码是否已经发送
   return myReadFile(path).then((val)=>{
        var loginInfo=JSON.parse(val)
        var haveSent=loginInfo.some((item)=>{
            return item.phone==phone
        })
        if(haveSent){
            return Promise.resolve("验证码已发送")
        }
        return Promise.reject("验证码未发送")
    })
}

module.exports=haveSentCode