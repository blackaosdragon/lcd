const express = require('express')
const { spawn } = require('child_process')
const app = express();
const puerto = 3001

let aplicacion = spawn('python',['./test.py'])

aplicacion.stdout.on('data', data => {
    console.log(data.toString())
})
