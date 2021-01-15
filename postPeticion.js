
const fetch = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

let data = {
    temperatura: 19.2,
    id: 3.0
}

setInterval(()=>{
    fetch('https://instrumentacionline.ddns.net:5002/tomardata',{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
        'Content-Type': 'application/json' 
    },
    agent: httpsAgent
}).then(response=>{
    return response.json();
}).then(data=>{
    console.log(data);
}).catch((err)=>{
    console.log("Error:");
    console.log(err);
})

},5000)
