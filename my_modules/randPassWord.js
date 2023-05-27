function randPassWord(){
    return Math.random().toString(36).slice(2,10).padEnd(8,'p')
}

module.exports=randPassWord


