const excuteSql = require("./excuteSql")

function getData(phone){
    var sql='select phone,nickName from user where phone = (?)'
    var params=[phone]

   return excuteSql(sql,params).then((val)=>{
        return Promise.resolve(val)
    }).catch((err)=>{
        return Promise.reject("获取失败")
    })
}

// getData(18758156239).then((val)=>{
//     console.log(val)
// })

module.exports=getData