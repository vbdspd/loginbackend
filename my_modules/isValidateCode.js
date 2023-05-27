const myReadFile=require('./myReadFile')

var path="./loginInfo.json"

function isValidateCode(phone,code){ //验证码用户发送的验证码是否合理
   return myReadFile(path).then((val)=>{
        var loginInfo=JSON.parse(val)
        var isValid=loginInfo.some((item)=>{
            return item.phone==phone&&item.code==code
        })
        if(isValid){
            return Promise.resolve("验证码成功")
        }
        return Promise.reject("验证失败")
    })
}


module.exports=isValidateCode