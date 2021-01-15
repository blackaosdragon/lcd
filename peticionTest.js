const https = require('https')
let url_prueba = 'instrumentacionline.ddns.net'
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

const options = {
    hostname: url_prueba,
    port: 5002,
    path: "/tomardata",
    method: 'GET',
    agent: httpsAgent
}

const req = https.request(options, res => {
    console.log(`Status code: ${res.statusCode}`)
    res.on('data', data => {
        process.stdout.write(data)
    });
});
req.on('error',e=>{
    console.log(e)
})
req.end()
/*
const axios = require('axios');
axios.post("https://instrumentacionline.ddns.net/tomardata").then( res => {
    console.log(res)
}).catch( error => {
    console.log(error);
})
*/