const excuteSql = require("./excuteSql")

function haveRigisted(phone) { //判断用户是否已经注册
    var params = [phone]
    var sql = 'select phone from user where phone = (?)'
    return excuteSql(sql, params).then((data) => {
       
        if (data.length == 0) {
            return Promise.resolve(false)
        } else {
            return Promise.resolve(true) 
        }
    }
    )
}

module.exports = haveRigisted