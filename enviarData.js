const redes = require('node-wifi-scanner');
const sensor = require('ds18b20');
const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD( 1, 0x27, 20, 4 );

let temperatura = 18.789
lcd.beginSync();
lcd.createCharSync( 0,[ 0x1B,0x15,0x0E,0x1B,0x15,0x1B,0x15,0x0E] ).createCharSync( 1,[ 0x0C,0x12,0x12,0x0C,0x00,0x00,0x00,0x00]).createCharSync( 2,[ 0x00,0x0a,0x0a,0x0a,0x1f,0x0e,0x04,0x04] ).createCharSync( 3,[ 0xa,0xa,0xa,0x1f,0xe,0x4,0x4,0x0] ).createCharSync( 4,[ 0x1,0x1,0x3,0x3,0x7,0x7,0xf,0x1f]).createCharSync( 5,[0x0,0xd,0x11,0x11,0xd,0x11,0x10,0xd]);
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

    compararMinutos = (horas,id) => {
        if(fecha.getMinutes()<10){
            compararSegundos(horas,`0${fecha.getMinutes()}`,id);
        } else {
            compararSegundos(horas,`${fecha.getMinutes()}`,id);
        }
    }

    compararSegundos = (horas,minutos,signal) => {
        if(fecha.getSeconds()%2==0){
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas} ${minutos}  ${LCD.getChar(signal)} ${LCD.getChar(2)}`);
        } else {
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas}:${minutos} ${LCD.getChar(signal)} ${LCD.getChar(2)}`);
        }
    }
    compararHoras = id =>{
        if (fecha.getHours()<10){
            compararMinutos(`0${fecha.getHours()}`,id);
        } else {
            compararMinutos(`${fecha.getHours()}`,id);
        }
    }
    wifisignal = () => {
        redes.scan( (err,red)=> {
            if(err){
                console.log(err)
            } else {
                console.log(red[0].rssid)
                let signal = parseInt(red[0].rssid)
                if (signal>=-20){
                    compararMinutos(3)
                } else if(signal<-20 && signal>=-70) {
                    compararMinutos(4)
                } else if(signal<-70){
                    compararMinutos(5)
                }
            }

        })
    }
    
    
    wifisignal();
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


