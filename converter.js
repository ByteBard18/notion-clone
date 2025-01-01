const fs = require('fs');

const serviceKey = fs.readFileSync('./service_key.json', 'utf8');
console.log(serviceKey); // This will print the JSON string of the service key
