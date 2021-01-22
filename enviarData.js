const sensor = require('ds18b20')
//const spawn = require('child_process').spawn
sensor.sensors( (err,ids) => {
    console.log(ids)
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

