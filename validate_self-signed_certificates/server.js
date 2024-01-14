const https = require('https');
const fs = require('fs');

const options = {
  // key: fs.readFileSync('./spy_privada.key'),
  // cert: fs.readFileSync('./spy_certificado.crt')
  key: fs.readFileSync('./privada.key'),
  cert: fs.readFileSync('./certificado.crt')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('¡Hola, mundo!');
}).listen(8000);