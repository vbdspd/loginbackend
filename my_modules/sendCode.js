//发送验证码

var core = require('@alicloud/pop-core')


let client = new core({
    accessKeyId: 'LTAI5tQ4QTbnaAG4zMACp633', // 需要先申请
    accessKeySecret: 'aSlTKfqgEesZCv3hgqOkj4LeowOwVO', // 需要先申请
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

function sendCode(phone, res) {//向用户发送验证码
    var myRandCode = randCode()
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone, // 客户端手机号
        "SignName": "红炉点雪", //签名
        "TemplateCode": "SMS_460771273", //模板，用于发送文字信息
        "TemplateParam": JSON.stringify({ 'code': myRandCode }) //指定要发送的验证码（此处以rander 函数为例）
    }

    let requestOption = {
        method: 'POST'
    };
    return new Promise((resolve, reject) => {
        client.request('SendSms', params, requestOption).then((result) => {
            if (result.Code == 'OK') {
                loginInfo.push({
                    phone: String(phone).trim(),
                    code: myRandCode
                });
                clearCodeOnTime(phone)
                resolve(true)
            } else {
                reject(false)
            }
        }).catch((err)=>{
            console.log(err)
            res.send({
                staus:401,
                msg:'请求失败'
            })
       })
    })

}