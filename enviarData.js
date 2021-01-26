const sensor = require('ds18b20');
const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD( 1, 0x27, 20, 4 );

let temperatura = 18.789
lcd.beginSync();
lcd.createCharSync( 0,[ 0x1B,0x15,0x0E,0x1B,0x15,0x1B,0x15,0x0E] ).createCharSync( 1,[ 0x0C,0x12,0x12,0x0C,0x00,0x00,0x00,0x00] );
//lcd.createCharSync( 0,[ 0x00,0x0A,0x0A,0x1F,0x0E,0x04,0x04,0x04] )
//const spawn = require('child_process').spawn

/*
sensor.sensors( (err,ids) => {
    if(err){

    } else{
        //console.log(ids)
    }
    
})
*/

lcd.clearSync();
setInterval( ()=>{
    let fecha = new Date();
    let mes = fecha.getMonth() + 1;
    if (fecha.getHours()<10){
        compararMinutos(`0${fecha.getHours()}`);
    } else {
        compararMinutos(`${fecha.getHours()}`);
    }
    compararMinutos = (horas) => {
        if(fecha.getMinutes()<10){
            compararSegundos(horas,`0${fecha.getMinutes()}`);
        } else {
            compararSegundos(horas,`${fecha.getMinutes()}`);
        }
    }
    compararSegundos = (horas,minutos) => {
        if(fecha.getSeconds()%2==0){
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas} ${minutos} `);
        } else {
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas}:${minutos} `);
        }
    }
    sensor.temperature('28-011913ff6583',(err,temp)=>{
        if(err){
            console.log(err)
            lcd.printLineSync(2, `T = Error`)
        } else {
            lcd.printLineSync(2,`T = ${temp}${LCD.getChar(1)}C  `,);
        }

    })
},1000);
//////////////////////////////////////
/*
setInterval(()=>{
    let fecha = new Date();
    let mes = fecha.getMonth()+1;
    if(parseInt(fecha.getSeconds())%2==0){
        lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`);
    } else {
        lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${fecha.getHours()} ${fecha.getMinutes()}`);
    }
    sensor.temperature('28-011913ff6583',(err,temp)=>{
        if(err){
            console.log(err)
            lcd.printLineSync(2, `T = Error`)
        } else {
            lcd.printLineSync(2,`T = ${temp}${LCD.getChar(1)}C  `,);
        }

    })
},1000)
///////////////////////////////////////////////
*/



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


