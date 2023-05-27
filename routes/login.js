var express = require('express');
var router = express.Router();

var core = require('@alicloud/pop-core')

//引入连接好的数据库
var connection = require('../my_modules/connectDatabase');


//生成一个四位数的验证码

function randCode() {
    return Math.random().toString().slice().slice(2, 6).padEnd(4, 0)
}

var loginInfo = [{
  phone:18758156239,
  code:4567
}]//用于用户存储手机号+验证码

let client = new core({
    accessKeyId: 'LTAI5tQ4QTbnaAG4zMACp633', // 需要先申请
    accessKeySecret: 'aSlTKfqgEesZCv3hgqOkj4LeowOwVO', // 需要先申请
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});


//创建一个函数用于执行SQL语句
function excuteSql(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, function (err, data) {
            if (err) {
                reject(false)
            } else {
                resolve(data)
            }
        })
    })
}


//判断手机号是否已经注册
function isRigisted(phone, res) {
    var params = [phone]
    var sql = 'select * from user where phone=?'
    var promise = excuteSql(sql, params);
    return promise.then((val) => {
        if (val.length == 0) {
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        }
        else {
            return new Promise((resolve, reject) => {
                resolve(true)
            })
        }
    }).catch((err) => {
        res.status(401).json({
            status: 401,
            msg: "不合理的手机号"
        })
    })//如果查询出错则给客户端返回一个服务器出错的状态码
}

function haveSendCode(phone) {//判断验证码是否已经发送
    return loginInfo.some(function (item) {
        return item.phone == phone
    })
}


function clearCodeOnTime(phone) {//根据手机号及时清除缓存的验证码，让验证码失效
    setTimeout(function () {
        var myPhone=phone;
        for (var i = 0; i < loginInfo.length; i++) {
            if (loginInfo[i].phone == myPhone) {
                loginInfo.splice(i, 1);
            }
        }
    },5*1000*60)//五分钟后及时在缓存中清除该验证码
}


function clearCodeImediate(phone){
    var myPhone=phone;
    for (var i = 0; i < loginInfo.length; i++) {
        if (loginInfo[i].phone == myPhone) {
            loginInfo.splice(i, 1);
        }
    }
}//验证成功后在缓存中清除验证码


function isValidateCode(phone,code){
   return loginInfo.some((item)=>{
    return item.phone==phone&&item.code==code
   })
}



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

function randomNickName(){
    return Math.random().toString(36).slice(2,10).padEnd(8,0)
}



/* GET login listing. */
router.get('/', function (req, res, next) {//用户请求验证码
    var { phone } = req.query
    if (haveSendCode(phone)) {
        res.status(200).json({
            status: 200,
            msg: "验证码已经发送",
            isRigisted:true
        })
        return
    }
    isRigisted(Number(phone), res).then((val) => {
        if (val) {
            sendCode(Number(phone), res).then((val) => {
                    res.status(200).json({
                        staus: 200,
                        msg: '验证码发送成功',
                        haveSendCode: true,
                        isRigisted: true
                    }),
                    (reason)=>{
                        console.log('adsf')
                        console.log(reason)
                    }
            })
        }
        else {
            const sql=`insert into user value(?,?,?)`
            const params=[phone,'brave',randomNickName()+randCode()]
            excuteSql(sql,params).then(((val)=>{
                sendCode(Number(phone), res).then((val) => {
                    res.status(200).json({
                        staus: 200,
                        msg: '验证码发送成功',
                        haveSendCode: true,
                        isRigisted: true
                    }),
                    (reason)=>{
                        console.log('adsf')
                        console.log(reason)
                    }
            })
            })).catch((err)=>{
                res.status(404).send({
                    staus:404,
                    msg:'发生错误',
                })
            })
        }
    }
    ).catch((err)=>{})
});



router.post('/postCode',function(req,res){//验证用户提交的验证码
    console.log(loginInfo)
    const {phone,code}=req.body;
    if(isValidateCode(phone,code)){
        clearCodeImediate(phone)
        res.status(200).json({
            status:200,
            msg:'你已经成功登录或者注册',
            validCode:true,
            userInfo:{
                title:'一些关于用户的信息'
            }
        })
    }else{
        res.status(200).json({
            status:200,
            msg:'不合理的验证码请稍后重试',
            validCode:false
        })
    }
})




module.exports = router; 