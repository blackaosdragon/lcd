//const sensor = require('ds18b20');
const LCD = require('lcdi2c');
let lcd = new LCD(1,0x27,20,4);
lcd.clear();
let temperatura = 18.789
//const spawn = require('child_process').spawn

/*
sensor.sensors( (err,ids) => {
    if(err){

    } else{
        //console.log(ids)
    }
    
})
*/
lcd.clear();
setInterval(()=>{
    let fecha = new Date()
    if(parseInt(fecha.getSeconds)%2==0){
        lcd.println(`${fecha.getDate()} / ${fecha.getMonth()} / ${fecha.getFullYear()} ${fecha.getHours()} : ${fecha.getMinutes()}`,1);
    } else {
        lcd.println(`${fecha.getDate()} / ${fecha.getMonth()} / ${fecha.getFullYear()} ${fecha.getHours()}   ${fecha.getMinutes()}`,1);
    }

},1000)

lcd.println(`T = ${temperatura} °C`,3);


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

