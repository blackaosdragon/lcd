const express = require('express')
const { spawn } = require('child_process')
const app = express();
const puerto = 3001

let aplicacion = spawn('python',['./mylcd.py'])
process.stdout.on('data',()=>{
    console.log(data.toString())
})
