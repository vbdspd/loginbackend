new Promise((resolve,reject)=>{
 reject('adf')
}).then((val)=>{
    console.log(val)
},
(reason)=>{
    console.log(reason)
}
)