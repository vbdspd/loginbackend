//用于随机生成验证码
function randCode() {
    return Math.random().toString().slice().slice(2, 6).padEnd(4, 0)
}

module.exports=randCode
