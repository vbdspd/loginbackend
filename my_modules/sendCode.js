//发送验证码
var core = require('@alicloud/pop-core')

var randCode = require("./randCode")//随机生成验证码

var saveSentCode = require("./saveSentCode")//引入验证码手机号保存模块

var deleteCodeOnTime = require("./deleteCodeOnTime");////引入按时清除验证码模块



var time =60*1000*5  //@time验证码的有效时间


let client = new core({
    accessKeyId: 'LTAI5tQ4QTbnaAG4zMACp633', // 需要先申请
    accessKeySecret: 'aSlTKfqgEesZCv3hgqOkj4LeowOwVO', // 需要先申请
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});



function sendCode(phone, templateCode) {//向用户发送验证码 @templateCode使用 短信模板的编号
    var myRandCode = randCode()
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone, // 客户端手机号
        "SignName": "红炉点雪", //签名
        "TemplateCode": templateCode, //模板，用于发送文字信息
        "TemplateParam": JSON.stringify({ 'code': myRandCode }) //指定要发送的验证码（此处以rander 函数为例）
    }

    let requestOption = {
        method: 'POST'
    };

    return new Promise((resolve, reject) => {
        client.request('SendSms', params, requestOption).then((result) => {
            if (result.Code == 'OK') {
                saveSentCode(phone,myRandCode).then((val)=>{  //向文件中写入验证码以及对应的手机号
                    resolve("验证码发送成功")                  //写入成功则验证码发送成功
                    deleteCodeOnTime(phone,time)             //写入成功后开启定时器按时清除
                }).catch((err)=>{
                    reject("验证码发送失败")                  //未成功写入验证码发送失败
                })
            }
        }).catch((err)=>{
            console.log(err)
            reject("验证码发送失败")                         //阿里云服务器报错发送失败
        })
    })
}

module.exports=sendCode
