const myReadFile = require('./myReadFile')//引入文件读取模块

const myWriteFile = require('./myWriteFile')//引入文件写入模块

var path = "./loginInfo.json" //用于保存那些已经获取过验证码的用户

function deleteCode(phone) { //根据删除验证码
    return myReadFile(path).then(
        (value) => {
            var loginInfo = JSON.parse(value)
            for (var i = 0; i < loginInfo.length; i++) {
                if (loginInfo[i].phone == phone) {
                    loginInfo.splice(i, 1)
                }
            }
            return myWriteFile(path, JSON.stringify(loginInfo)).then((val) => {
                return Promise.resolve("写入成功")
            }).catch((err) => {
                return Promise.reject("写入失败")
            })
        }
    )
}


module.exports=deleteCode




