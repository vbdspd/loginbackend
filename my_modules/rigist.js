var  randPassWord=require("./randPassWord")

var excuteSql=require('./excuteSql')

let Base64 = require('js-base64').Base64

function rigist(phone){ //将用户信息插入数据库
   var userName="user"+String(phone).slice(7,11)

   var params=[phone,userName,Base64.encode(randPassWord())]

   var sql='insert into user values(?,?,?)'
  
  return excuteSql(sql,params).then(()=>{
     return Promise.resolve("注册成功")
   }).catch((err)=>{
     return Promise.reject("注册失败")
   })
}


module.exports=rigist