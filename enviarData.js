//const sensor = require('ds18b20');
const LCD = require('lcdi2c');
let lcd = new LCD(1,0x27,20,4);
lcd.clear();
let temperatura = 18.789
//const spawn = require('child_process').spawn
}1  |
sensor.sensors( (err,ids) => {
    if(err){

    } else{
        //console.log(ids)
    }
    
})
lcd.clear();
lcd.print(`T = ${temperatura} °C`,3);

/*
setInterval(()=>{
    
    sensor.temperature('28-011913ff6583', (err,temp)=>{
        if(err){
            console.log("Error: ",err)
        } else {
            console.log(`T = ${temp}°C`);
            lcd.print(`T = ${temp} °C`);
        }
    })
},5000)
*/


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

