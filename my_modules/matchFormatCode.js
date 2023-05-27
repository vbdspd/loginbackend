
function matchFormateCode(req,res,next){//判断验证码是否符合格式
    var {phone,code}=req.body

    if(Number(code)&&code.length==4){
        next()
    }
    else{
        res.status(300).json({
            msg:"验证码格式不合理"
        })
    }
}

module.exports=matchFormateCode