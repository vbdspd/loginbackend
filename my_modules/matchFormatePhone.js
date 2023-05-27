//验证是否是合理的手机号

function matchFormatPhone(req,res,next){
    var { phone } = req.query
    phone = String(phone).trim()//去除请求信息的空格
    if(/^1[3-9][0-9]{9}$/.test(phone)){
        next()
    }
    else{
        res.status(303).send({
            msg:"手机号格式不正确"
        })
    }
}
module.exports=matchFormatPhone