//const sensor = require('ds18b20');
const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD( 1, 0x27, 20, 4 );

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
lcd.beginSync();
lcd.clearSync()
let fecha = new Date()
let mes = fecha.getMonth()+1
if(parseInt(fecha.getSeconds())%2==0){
    lcd.printLineSync(1,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`);
} else {
    lcd.printLineSync(1,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${fecha.getHours()} ${fecha.getMinutes()}`);
}
lcd.printLineSync(`T = ${temperatura} C`,3);


//lcd.println(` `,2);

//



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

