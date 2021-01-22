const sensor = require('ds18b20')
let temperatura = 0
//const spawn = require('child_process').spawn
sensor.sensors( (err,ids) => {
    if(err){

    } else{
        //console.log(ids)
    }
    
})

sensor.temperature('28-011913ff6583', (err,temp)=>{
    if(err){
        console.log("Error: ",err)
    } else {
        setInterval(()=>{
            temperatura = temp
            console.log(`T = ${temperatura}°C`)
        },1200)
    }
})

//const express = require('express')
//const { spawn } = require('child_process')
//const app = express();
//const puerto = 3001

//let aplicacion = spawn('python',['./test.py'])
/*
while (true){
    aplicacion.stdout.on('data', data => {
        temp = data.toString()
        console.log(temp)
    })
}
*/

