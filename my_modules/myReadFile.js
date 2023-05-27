//自己定义封装fs模块

const fs=require('fs')

function myReadFile(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,function(err,data){
            if(err){
                reject("读取失败")
            }
            else{
                resolve(data.toString())
            }
        })
    })
}

module.exports=myReadFile

