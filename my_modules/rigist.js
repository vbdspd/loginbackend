var  randPassWord=require("./randPassWord")

var excuteSql=require('./excuteSql')

function rigist(phone){ //将用户信息插入数据库
   var userName="user"+String(phone).slice(7,11)

   var params=[phone,userName,randPassWord()]

   var sql='insert into user values(?,?,?)'
  
  return excuteSql(sql,params).then(()=>{
     return Promise.resolve("注册成功")
   }).catch((err)=>{
     return Promise.reject("注册失败")
   })
}


module.exports=rigist