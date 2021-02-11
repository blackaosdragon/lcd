const redes = require('node-wifi-scanner');
const sensor = require('ds18b20');
const LCD = require('raspberrypi-liquid-crystal');
const https = require('https');
const lcd = new LCD( 1, 0x27, 20, 4 );
const fetch = require('node-fetch');

let registro;
let valor;
//////////////Archivo de configuracion de cada sensor diferente/////////////////
let id = 6;
let lugar = 'Taller'
let ubicacion = 'Francisco Tamagno #32'
let piso = 'PB'
let equipo = 'Sensor DS18B20'
let serie ;
let capacidad;
let especial; 'Sensor de ambiente'

let registrar = 'https://instrumentacionline.ddns.net:5002/singin'

let payload;
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})
lcd.beginSync();
lcd.createCharSync( 0,[ 0x1B,0x15,0x0E,0x1B,0x15,0x1B,0x15,0x0E] ).createCharSync( 1,[ 0x0C,0x12,0x12,0x0C,0x00,0x00,0x00,0x00]).createCharSync( 2,[ 0x00,0x0a,0x0a,0x0a,0x1f,0x0e,0x04,0x04] ).createCharSync( 3,[ 0xa,0xa,0xa,0x1f,0xe,0x4,0x4,0x0] ).createCharSync( 4,[ 0x1,0x1,0x3,0x3,0x7,0x7,0xf,0x1f]).createCharSync( 5,[0x0,0xd,0x11,0x11,0xd,0x11,0x10,0xd]).createCharSync( 6,[	0x11,0x13,0x17,0x11,0x1d,0x19,0x11]).createCharSync( 7,[0x0,0x11,0xa,0x4,0xa,0x11,0x0]).createCharSync( 8,[	    ]);

lcd.clearSync();
let update = {
    id: id,
    ubicacion: ubicacion,
    piso: piso,
    lugar: lugar,
    equipo: equipo,
    serie: serie,
    capacidad: capacidad,
    especial: especial
}

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
            
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas} ${minutos}  ${LCD.getChar(signal)} ${LCD.getChar(2)}   `);
        } else {
            lcd.printLineSync(0,`${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${horas}:${minutos}  ${LCD.getChar(signal)} ${LCD.getChar(2)}   `);
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
                
                let signal = parseInt(red[0].rssi)
                
                if (signal>=-20){
                    compararHoras(3)
                } else if(signal<-20 && signal>=-70) {
                    compararHoras(4)
                } else if(signal<-70){
                    compararHoras(5)
                }
            }

        })
    }  
    wifisignal();
    sensor.temperature('28-011913ff6583',(err,temp)=>{
        if(err){
            console.log(err)
            //lcd.printLineSync(2, `T = Error`)
        } else {
            valor = temp;
            lcd.printLineSync(2,`T = ${temp}${LCD.getChar(1)}C `,);
            payload = {
                id: id,
                temp: temp
            }
        }
    })    
},1000);
console.log("Se enviara la data de registro");
lcd.setCursor(2,11);
lcd.printSync(`${LCD.getChar(8)} `)

function activar(){
    fetch(registrar,{
    method: 'POST',
    body: JSON.stringify(update),
    headers:{
        'Content-Type': 'application/json' 
    },
    agent: httpsAgent
}).then( respuesta => {
    return respuesta.json()
}).then( data => {
    if(data.ok==1){
        console.log(data)
        let senData = setInterval(() => {
            fetch('https://instrumentacionline.ddns.net:5002/recepcion',{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                    },
                agent: httpsAgent
            }).then(response=>{
                return response.json();
            }).then( data => {
                console.log(data)
                lcd.setCursor(2,11)
                lcd.printSync(`${LCD.getChar(6)} `)
            }).catch( err => {
                console.log("No se ha podido enviar la data")
                lcd.setCursor(2,11)
                lcd.printSync(`${LCD.getChar(7)} `)
            })
            console.log(valor)    
        }, 10000);
        clearInterval(registro)

    } else if(data.ok==2) {
        console.log("El sensor ya esta registrado")
        clearInterval(registro)
        lcd.setCursor(2,11)
        lcd.printSync(`${LCD.getChar(7)}`)
    } else {
        console.log("Error al registrar el sensor")
        lcd.setCursor(2,11)
        lcd.printSync(`${LCD.getChar(8)}`)
    }
    }).catch( err => {
        console.log("No se ha podido registrar el sensor")
        lcd.setCursor(2,11)
        lcd.printSync(`${LCD.getChar(8)}`)
        //console.log(err);
    })
}
registro = setInterval(activar,10000)
