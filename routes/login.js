var express = require('express');

var router = express.Router();

var haveSendCode = require("../my_modules/haveSentCode")

var sendCode = require('../my_modules/sendCode')

var templateCode = "SMS_460771273"

var matchFormatPhone = require("../my_modules/matchFormatePhone")//引入中间件判断手机号是否是合理的


var matchFormateCode = require("../my_modules/matchFormatCode")


var haveRigisted = require("../my_modules/haveRigisted")


var isValidateCode = require("../my_modules/isValidateCode");


var deleteCode = require("../my_modules/deleteCode")


var rigist = require("../my_modules/rigist")


var getData = require("../my_modules/getData")//根据手机号获取用户数据


/* GET login listing. */
// router.get('/', function (req, res, next) {//用户请求验证码
//     var { phone } = req.query
//     if (haveSendCode(phone)) {
//         res.status(200).json({
//             status: 200,
//             msg: "验证码已经发送",
//             isRigisted:true
//         })
//         return
//     }
//     isRigisted(Number(phone), res).then((val) => {
//         if (val) {
//             sendCode(Number(phone), res).then((val) => {
//                     res.status(200).json({
//                         staus: 200,
//                         msg: '验证码发送成功',
//                         haveSendCode: true,
//                         isRigisted: true
//                     }),
//                     (reason)=>{
//                         console.log('adsf')
//                         console.log(reason)
//                     }
//             })
//         }
//         else {
//             const sql=`insert into user value(?,?,?)`
//             const params=[phone,'brave',randomNickName()+randCode()]
//             excuteSql(sql,params).then(((val)=>{
//                 sendCode(Number(phone), res).then((val) => {
//                     res.status(200).json({
//                         staus: 200,
//                         msg: '验证码发送成功',
//                         haveSendCode: true,
//                         isRigisted: true
//                     }),
//                     (reason)=>{
//                         console.log('adsf')
//                         console.log(reason)
//                     }
//             })
//             })).catch((err)=>{
//                 res.status(404).send({
//                     staus:404,
//                     msg:'发生错误',
//                 })
//             })
//         }
//     }
//     ).catch((err)=>{})
// });


router.get('/', matchFormatPhone, function (req, res, next) {
    var { phone } = req.query
    phone = String(phone).trim()//去除请求信息的空格
    haveSendCode(phone).then((val) => {
        res.status(200).send({
            staus: "200",
            msg: "验证码已发送",
            haveSendCode: true
        })
    }).catch((err) => {
        sendCode(phone, templateCode).then((val) => {
            res.status(200).send({
                staus: "200",
                msg: "验证码已发送",
                haveSendCode: true
            })
        }).catch((err) => {
            res.status(200).send({
                staus: "200",
                msg: "验证码发送失败",
                haveSendCode: false
            })
        })
    })

})


router.post('/postCode', matchFormateCode, function (req, res, next) {//验证用户提交的验证码
    const { phone, code } = req.body;
    isValidateCode(phone, code).then((val) => {//校验验证码是否正确
        haveRigisted(phone).then((val) => {
            if (val) {//如果是已注册的用户
                deleteCode(phone)//验证成功后清除数据
                getData(phone).then((data) => {
                    res.json({
                        staus: 200,
                        msg: "验证成功",
                        successLogin: true,
                        userData: data
                    })
                })
            } else {
                rigist(phone).then((val) => {
                    getData(phone).then((data) => {
                        res.json({
                            staus: 200,
                            msg: "验证成功",
                            successLogin: true,
                            userData: data
                        })
                    })
                }).catch((err) => {
                    res.json({
                        staus: 200,
                        msg: "验证失败用户注册失败",
                        successLogin: false
                    })
                })
            }
        })
    }).catch((reason) => {
        res.json({
            staus: 200,
            msg: "验证失败",
            successLogin: false
        })
    })

})




module.exports = router; 