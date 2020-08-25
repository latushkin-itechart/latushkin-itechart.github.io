const express = require('express');
const bodyParser = require('body-parser');
const getSubscriptions = require('./src/getSubscriptions');
const send = require('./src/send');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json())

const subscriptions = getSubscriptions();

app.post('/register-subscription/', (req, res) => {
    subscriptions.push(req.body);
    res.json({})
})

send(app);

app.listen(800, 'localhost', () => {
    console.log('Listening at http://localhost:800')
})