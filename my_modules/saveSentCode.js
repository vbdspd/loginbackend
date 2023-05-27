const myReadFile = require('./myReadFile')//引入文件读取模块

const myWriteFile = require('./myWriteFile')//引入文件写入模块

var path = "./loginInfo.json" //文件的路径-用于保存那些已经获取过验证码的用户


function saveSentCode(phone,code) { //向文件中写入已经获取过验证码的用户
    return myReadFile(path).then(
        (value) => {
            var phone_Code={phone:phone,code:code}
            var loginInfo = JSON.parse(value)
            loginInfo.push(phone_Code)
            return myWriteFile(path, JSON.stringify(loginInfo)).then((val) => {
                return Promise.resolve("写入成功")
            }).catch((err) => {
                return Promise.reject("写入失败")
            })
        }
    )
}

module.exports=saveSentCode




