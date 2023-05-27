const fs=require("fs")
function myWriteFile(path,data){
    return new Promise((reslove,reject)=>{
        fs.writeFile(path,data,function(err){
            if(err){
                reject("写入失败")
                return
            }
            reslove("写入成功")
        })
    })
}

module.exports=myWriteFile//自定义文件写入模块