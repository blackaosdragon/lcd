const axios = require('axios');
axios.post("https://instrumentacionline.ddns.net/tomardata").then( res => {
    console.log(res)
}).catch( error => {
    console.log(error);
})