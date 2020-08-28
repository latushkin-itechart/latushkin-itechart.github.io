const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const getSubscriptions = require('./src/getSubscriptions');
const send = require('./src/send');

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({key, cert}, app);

app.use(express.static('static'));
app.use(bodyParser.json())

const subscriptions = getSubscriptions();

app.post('/register-subscription/', (req, res) => {

    const auth = req.body.keys.auth;
    // Preventing from duplicate added clients
    if(!subscriptions.some(({keys}) => keys.auth === auth)) {
        subscriptions.push(req.body);
    }

    res.json({})
})

send(app);

const PORT = 800;
// const HOST = '192.168.8.207';
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
})