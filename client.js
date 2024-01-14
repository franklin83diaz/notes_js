const fs = require('fs');
const https = require('https');


const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false,
};

const req = https.request(options, (res) => {
  res.on('data', (d) => {

    //certificate from server
    const fromServerCert = req.connection.getPeerCertificate();
    const fromServerCertPem = `-----BEGIN CERTIFICATE-----\n${fromServerCert.raw.toString('base64').match(/.{0,64}/g).join('\n')}-----END CERTIFICATE-----\n`;

    //certificate from local copy
    const localCopyCertPem = fs.readFileSync('certificado.crt').toString();


    
    //compare certificates
    if (fromServerCertPem == localCopyCertPem) {
        console.log('valid certificate');
        console.log('response from server:');
        process.stdout.write(d);
        } else {    
        console.log('not valid certificate, aborting connection, someone is impersonating the server!!!');
        }
   
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();