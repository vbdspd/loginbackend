var express = require('express');//账号密码登录
const excuteSql = require('../my_modules/excuteSql');

var router = express.Router();

var haveRigisted=require("../my_modules/haveRigisted")


var getData=require("../my_modules/getData")



router.post("/",function(req,res){
    const {phone,password}=req.body
    console.log(phone,password)

    haveRigisted(phone).then((val)=>{
        if(val){
            var sql='select password from user where phone=(?)'
            var params=[phone]
            excuteSql(sql,params).then((val)=>{
                if(val[0].password==password){
                   getData(phone).then((data)=>{
                    res.cookie("userdata",JSON.stringify(data),{maxAge:1000*60*2020})//返回cookie并且设置有效时间
                    res.json({
                        staus: 200,
                        msg: "验证成功",
                        successLogin: true   
                    })
                   })
                }
                else{
                    res.json({
                        staus: 200,
                        msg: "验证失败",
                        successLogin: false   
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            res.json({
                staus: 200,
                msg: "验证失败",
                successLogin: false   
            })
        }
    })
})


module.exports=router


