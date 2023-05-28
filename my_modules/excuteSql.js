var connection = require('./connectDatabase');

function excuteSql(sql, params) {   //用于执行sql语句
    return new Promise((resolve, reject) => {
        connection.query(sql, params, function (err, data) {
            if (err) {
                reject("sql语句执行失败")
               
            } else {
                resolve(data)
            }
        })
    })
}

module.exports=excuteSql

