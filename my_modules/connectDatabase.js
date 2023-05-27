//用于连接数据库
const mysql=require('mysql')//引入mysql模块

const connection=mysql.createConnection({
    host: '47.97.22.215',
    user: 'root',
    password: '123456',
    database: 'my_db_02'
})

module.exports=connection;
    
